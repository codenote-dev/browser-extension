import { useNavigate } from 'react-router-dom';

import { useCodeService } from '~data/services/CodeService';
import { useNotesService } from '~data/services/NotesService';
import type { LanguageAlias } from '~lib/utils';
import { EditableNote } from '~ui/components/note/EditableNote';

export function CreateNote() {
    const [code, setCode] = useCodeService();
    const navigate = useNavigate();
    const { create } = useNotesService();

    if (!code) {
        return null;
    }

    return (
        <div className="new-comment">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-base font-semibold leading-6 text-white">
                    Leave a note
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                    <p>Help yourself to remember the code</p>
                </div>
                <EditableNote
                    code={code.code}
                    language={code.file.ext as LanguageAlias}
                    save={(note) => {
                        create(code, note);
                        setCode();
                        navigate('/');
                    }}
                    discard={() => {
                        setCode();
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
}
