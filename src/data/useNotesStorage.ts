import { StorageKey } from '~constants';
import { Notes } from '~routes/Notes';
import type { Code, NoteOutput } from '~schemas/schema';

import { createLink, getCommitId } from './githubApi';
import { useStorage } from './storage';

type Notes = { [key: number]: NoteOutput };

export function useNotesStorage() {
    const [notes, setNotes] = useStorage<Notes>(StorageKey.NOTES);

    return {
        async create(
            { repository, branchName, file, code, provider }: Code,
            comment: string,
        ) {
            const commitId = await getCommitId(repository, branchName);
            const startLine = code[0].lineNumber;
            const endLine = code[code.length - 1].lineNumber;
            const link = createLink(
                repository,
                commitId,
                file,
                startLine,
                endLine,
            );
            const note: NoteOutput = {
                id: Date.now(),
                provider,
                repository,
                commitId,
                link,
                comment,
                code,
                startLine,
                // End line is always 1 larger then actual to handle the case of single line code
                endLine: endLine + 1,
                file,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };

            if (!notes) {
                setNotes({
                    [note.id]: note,
                });
            } else {
                setNotes({
                    ...notes,
                    [note.id]: note,
                });
            }
        },

        getOne(id: number): NoteOutput {
            return notes[id];
        },

        getAll(): NoteOutput[] {
            if (!notes) {
                return [];
            }
            return Object.values(notes);
        },

        update(id: number, comment: string) {
            const note = notes[id];

            note.comment = comment;
            note.updatedAt = Date.now();

            return setNotes({
                ...notes,
                [id]: { ...note },
            });
        },

        async delete(id: number) {
            delete notes[id];

            return setNotes({ ...notes });
        },

        getGroupedNotesByProviderRepositoryFilename() {
            const groupedNotes = Object.values(notes || []).reduce(
                (acc, note) => {
                    const { repository, file, provider } = note;

                    if (!acc[provider]) {
                        acc[provider] = {};
                    }

                    if (!acc[provider][repository]) {
                        acc[provider][repository] = {};
                    }

                    if (!acc[provider][repository][file.path]) {
                        acc[provider][repository][file.path] = [];
                    }

                    // Compare notes by updatedAt and insert the new note in the right position
                    const index = acc[provider][repository][
                        file.path
                    ].findIndex((n) => n.updatedAt < note.updatedAt);
                    if (index === -1) {
                        acc[provider][repository][file.path].push(note);
                    } else {
                        acc[provider][repository][file.path].splice(
                            index,
                            0,
                            note,
                        );
                    }

                    return acc;
                },
                {} as Record<
                    NoteOutput['provider'],
                    Record<string, Record<string, NoteOutput[]>>
                >,
            );

            return groupedNotes;
        },
    };
}
