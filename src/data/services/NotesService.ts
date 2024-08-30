import { StorageKey } from '~constants';
import type { TCodeModel } from '~data/models/CodeModel';
import { NoteModel, type TNoteModel } from '~data/models/NoteModel';
import { storage, useStorage } from '~data/storage';

import { SearchService } from './SearchService';

type TNotes = { [key: number]: TNoteModel };
type TGroupedNotes = Record<
    TNoteModel['code']['provider'],
    Record<string, Record<string, TNoteModel[]>>
>;
type TNoteIndexModel = {
    id: TNoteModel['id'];
    note: TNoteModel['note'];
};

const searchService = new SearchService<TNoteIndexModel>();
const NOTE_INDEX_KEYS = ['note', 'code'];

const groupingReducer = (acc: TGroupedNotes, noteModel: TNoteModel) => {
    const { repository, file, provider } = noteModel.code;

    if (!acc[provider]) {
        acc[provider] = {};
    }

    if (!acc[provider][repository]) {
        acc[provider][repository] = {};
    }

    if (!acc[provider][repository][file?.path]) {
        acc[provider][repository][file.path] = [];
    }

    // Compare notes by updatedAt and insert the new note in the right position
    const index = acc[provider][repository][file.path].findIndex(
        (n) => n.updatedAt < noteModel.updatedAt,
    );

    if (index === -1) {
        acc[provider][repository][file.path].push(noteModel);
    } else {
        acc[provider][repository][file.path].splice(index, 0, noteModel);
    }

    return acc;
};

const mapNoteToIndex = (noteModel: TNoteModel): TNoteIndexModel => {
    const { id, note } = noteModel;

    return {
        id,
        note,
    };
};

const indexNotes = async () => {
    const notes = (await storage.get<TNotes>(StorageKey.NOTES)) || {};
    const notesToIndex = Object.values(notes).map(mapNoteToIndex);

    searchService.createIndex(NOTE_INDEX_KEYS, notesToIndex);
};

indexNotes();

export const pruneNotes = async (): Promise<void> => {
    await storage.remove(StorageKey.NOTES);
};

export function useNotesService() {
    const [notes, setNotes] = useStorage<TNotes>(StorageKey.NOTES);

    return {
        async create(code: TCodeModel, note: string) {
            const noteModel = await NoteModel.parseAsync({
                code,
                note,
            });
            const notesCopy = Object.assign({}, notes, {
                [noteModel.id]: noteModel,
            });

            searchService.add(mapNoteToIndex(noteModel));

            setNotes(notesCopy);
        },
        search(term: string) {
            const notesList = Object.values(notes || {});
            const foundIds = searchService.search(term).map((n) => n.id);

            // filter out notes that are not found in the search results
            return notesList.filter((note) => foundIds.includes(note.id));
        },
        hasAny() {
            return Boolean(Object.keys(notes || {}).length);
        },
        getOne(id: number): TNoteModel | null {
            return notes ? notes[id] : null;
        },
        getAll(): TNoteModel[] {
            return Object.values(notes || {});
        },
        update(id: number, note: string) {
            if (!notes) {
                return;
            }
            const noteModel = notes[id];

            noteModel.note = note;
            noteModel.updatedAt = Date.now();

            searchService.remove((note) => note.id === id);
            searchService.add(mapNoteToIndex(noteModel));

            setNotes({
                ...notes,
                [id]: { ...noteModel },
            });
        },
        remove(id: number) {
            const notesCopy = Object.assign({}, notes);

            delete notesCopy[id];
            searchService.remove((note) => note.id === id);
            setNotes(notesCopy);
        },
        group(notes: TNoteModel[]): TGroupedNotes {
            return notes.reduce(groupingReducer, {} as TGroupedNotes);
        },
    };
}
