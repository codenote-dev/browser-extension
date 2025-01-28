import { useNavigate, useParams } from 'react-router-dom';

import { sendAnalyticsEvent } from '~data/services/AnalyticsService';
import { useNotesService } from '~data/services/NotesService';
import type { LanguageAlias } from '~lib/utils';
import { EditableNote } from '~ui/components/note/EditableNote';
import { Page } from '~ui/shared/Page';

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
        <Page title="Edit note" subtitle="Help yourself to remember the code">
            <EditableNote
                code={noteModel.code.code}
                note={noteModel.note}
                language={noteModel.code.file.ext as LanguageAlias}
                save={(note) => {
                    sendAnalyticsEvent('note_edit_success', {
                        provider: noteModel.code.provider,
                    });
                    update(Number(id), note);
                    navigate('/');
                }}
                discard={() => {
                    sendAnalyticsEvent('note_edit_abort', {
                        provider: noteModel.code.provider,
                    });
                    navigate('/');
                }}
            />
        </Page>
    );
}
