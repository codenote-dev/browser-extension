import { useNavigate, useParams } from 'react-router-dom';

import { useNotesService } from '~data/services/NotesService';
import type { LanguageAlias } from '~lib/utils';
import { EditableNote } from '~ui/components/note/EditableNote';

export function EditNote() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { hasAny, getOne, update } = useNotesService();

    if (!hasAny()) {
        return <div>Loading...</div>;
    }

    const noteModel = getOne(Number(id));

    if (!noteModel) {
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
                    code={noteModel.code.code}
                    note={noteModel.note}
                    language={noteModel.code.file.ext as LanguageAlias}
                    save={(note) => {
                        update(Number(id), note);
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
