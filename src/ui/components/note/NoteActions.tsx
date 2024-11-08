import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { TNoteModel } from '~data/models/NoteModel';
import { useNotesService } from '~data/services/NotesService';
import { useSidePanelService } from '~data/services/SidePanelService';
import { Button } from '~ui/shared/components/Button';

export type NoteActionsProps = {
    noteModel: TNoteModel;
};

export function NoteActions({ noteModel }: NoteActionsProps) {
    const navigate = useNavigate();
    const { remove } = useNotesService();
    const [_sidePanelState, setSidePanelState] = useSidePanelService();

    return (
        <>
            <Button
                variant="link"
                size="icon"
                className="hover:codenote__bg-white/10"
                onClick={() => {
                    window.open(noteModel.code.link);
                    setSidePanelState(false);
                }}>
                <Eye size={14} />
            </Button>
            <Button
                variant="link"
                size="icon"
                className="hover:codenote__bg-white/10"
                onClick={() => navigate(`/edit/${noteModel.id}`)}>
                <Pencil size={14} />
            </Button>
            <Button
                variant="link"
                size="icon"
                className="hover:codenote__bg-white/10"
                onClick={() => remove(noteModel.id)}>
                <Trash2 size={14} />
            </Button>
        </>
    );
}
