import { useNavigate } from 'react-router-dom';

import { useCodeService } from '~data/services/CodeService';
import { useNotesService } from '~data/services/NotesService';
import type { LanguageAlias } from '~lib/utils';
import { EditableNote } from '~ui/components/note/EditableNote';
import { Page } from '~ui/shared/Page';

export function CreateNote() {
    const [code, setCode] = useCodeService();
    const navigate = useNavigate();
    const { create } = useNotesService();

    if (!code) {
        return null;
    }

    return (
        <Page
            title="Leave a note"
            subtitle="Help yourself to remember the code.">
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
        </Page>
    );
}
