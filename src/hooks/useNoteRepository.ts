import { StorageKey } from '~constants';
import { useStorage } from '~core/storage';
import {
    noteOutputSchema,
    type Code,
    type File,
    type Note,
    type NoteOutput,
} from '~schemas/schema';

type Notes = { [key: number]: NoteOutput };

export function useNoteRepository() {
    const [notes, setNotes] = useStorage<Notes>(StorageKey.NOTES);

    return {
        async create(
            { repository, branchName, file, code }: Code,
            comment: string,
        ) {
            const commitId = await getCommitId(repository, branchName);
            const link = createLink(repository, commitId, file);
            const note: NoteOutput = {
                id: Date.now(),
                repository,
                commitId,
                link,
                comment,
                code,
                startLine: code[0].lineNumber,
                // End line is always 1 larger then actual to hadle the case of single line code
                endLine: code[code.length - 1].lineNumber + 1,
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

        // getOne(id: number): NoteOutput {},

        getAll(): NoteOutput[] {
            if (!notes) {
                return [];
            }
            return Object.values(notes);
        },

        // update(id: number, comment: string) {},

        // delete(id: number) {},
    };
}

async function getCommitId(repo: string, branch: string): Promise<string> {
    const res = await fetch(
        `https://api.github.com/repos/${repo}/commits/${branch}`,
    );
    const { sha } = await res.json();

    return sha;
}

function createLink(repo: string, commitId: string, file: File) {
    return `https://github.com/${repo}/blob/${commitId}${file.path}`;
}
