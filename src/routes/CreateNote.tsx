import { useNavigate } from 'react-router-dom';

import { StorageKey } from '~constants';
import { useStorage } from '~data/storage';
import { useNotesStorage } from '~data/useNotesStorage';
import type { Code } from '~schemas/schema';
import type { LanguageAlias } from '~utils';

import { EditableNote } from '../components/note/EditableNote';

export function CreateNote() {
    const [codeToComment, setCodeToComment, { remove }] = useStorage<Code>(
        StorageKey.CODE_TO_COMMENT,
    );
    const navigate = useNavigate();
    const notesStorage = useNotesStorage();

    if (!codeToComment) {
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
                    code={codeToComment.code}
                    language={codeToComment.file.ext as LanguageAlias}
                    save={(note) => {
                        notesStorage.create(codeToComment, note);
                        remove();
                        navigate('/');
                    }}
                    discard={() => {
                        remove();
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
}
