import { useNavigate, useParams } from 'react-router-dom';

import { EditableNote } from '~components/note/EditableNote';
import { useNotesStorage } from '~data/useNotesStorage';
import type { LanguageAlias } from '~utils';

export function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const notesStorage = useNotesStorage();
    const hasNotes = notesStorage.hasAny();

    if (!hasNotes) {
        return <div>Loading...</div>;
    }

    const note = notesStorage.getOne(Number(id));

    if (!note) {
        return <div>Note not found</div>;
    }

    return (
        <div className="new-comment">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-white">
                    Edit note
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Help yourself to remember the code</p>
                </div>
                <EditableNote
                    code={note.code}
                    note={note.comment}
                    language={note.file.ext as LanguageAlias}
                    save={(comment) => {
                        notesStorage.update(Number(id), comment);
                        navigate('/');
                    }}
                    discard={() => {
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
}
