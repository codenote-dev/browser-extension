import { EditPencil, Link, Trash } from 'iconoir-react';
import { useNavigate } from 'react-router-dom';

import type { TNoteModel } from '~data/models/NoteModel';
import { useNotesService } from '~data/services/NotesService';
import { Button } from '~ui/shared/components/Button';

export type NoteActionsProps = {
    noteModel: TNoteModel;
};

export function NoteActions({ noteModel }: NoteActionsProps) {
    const navigate = useNavigate();
    const { remove } = useNotesService();

    return (
        <>
            <Button
                icon={Link}
                size="xs"
                variant="link"
                action={() => window.open(noteModel.code.link)}
            />
            <Button
                icon={EditPencil}
                size="xs"
                variant="link"
                action={() => {
                    navigate(`/edit/${noteModel.id}`);
                }}
            />
            <Button
                icon={Trash}
                size="xs"
                variant="link"
                action={() => remove(noteModel.id)}
            />
        </>
    );
}
