import { EditPencil, Link, Trash } from 'iconoir-react';
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
    const [sidePanelState, setSidePanelState] = useSidePanelService();

    return (
        <>
            <Button
                variant="link"
                size="icon"
                onClick={() => {
                    window.open(noteModel.code.link);
                    setSidePanelState(false);
                }}>
                <Link />
            </Button>
            <Button
                variant="link"
                size="icon"
                onClick={() => navigate(`/edit/${noteModel.id}`)}>
                <EditPencil />
            </Button>
            <Button
                variant="link"
                size="icon"
                onClick={() => remove(noteModel.id)}>
                <Trash />
            </Button>
        </>
    );
}
