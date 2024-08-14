import { StorageKey } from '~constants';
import type { TCodeModel } from '~data/models/CodeModel';
import {
    NoteModel,
    NoteSearchSchema,
    type TNoteModel,
} from '~data/models/NoteModel';
import { storage, useStorage } from '~data/storage';

import { SearchService } from './SearchService';

type TNotes = { [key: number]: TNoteModel };
type TGroupedNotes = Record<
    TNoteModel['code']['provider'],
    Record<string, Record<string, TNoteModel[]>>
>;

function groupingReducer(acc: TGroupedNotes, noteModel: TNoteModel) {
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
}

const searchService = new SearchService(NoteSearchSchema);

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

            searchService.index({
                id: noteModel.id,
                note: noteModel.note,
            });

            setNotes(notesCopy);
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

            searchService.update(noteModel.id, {
                id: noteModel.id,
                note: noteModel.note,
            });

            setNotes({
                ...notes,
                [id]: { ...noteModel },
            });
        },
        remove(id: number) {
            const notesCopy = Object.assign({}, notes);

            delete notesCopy[id];
            searchService.remove(id);
            setNotes(notesCopy);
        },
        getGrouped(): TGroupedNotes {
            return Object.values(notes || {}).reduce(
                groupingReducer,
                {} as TGroupedNotes,
            );
        },
        async index() {
            console.log('Indexing notes...', notes);
            const notesToIndex = Object.values(notes || []).map((note) => ({
                id: `${note.id}`,
                note: note.note,
            }));

            console.log('Notes to index:', notesToIndex);

            if (notesToIndex.length) {
                await searchService.populate(notesToIndex);
            }
        },
    };
}
