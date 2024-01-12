import {
    ArrowTopRightOnSquareIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';

import { Button } from '~components/shared/Button';
import { useNotesStorage } from '~data/useNotesStorage';

export type NoteActionsProps = {
    id: number;
};

export function NoteActions({ id }: NoteActionsProps) {
    const notesStorage = useNotesStorage();

    function view() {
        const note = notesStorage.getOne(id);

        window.open(note.link);
    }

    return (
        <>
            <Button
                icon={ArrowTopRightOnSquareIcon}
                size="xs"
                variant="link"
                action={view}
            />
            <Button
                icon={PencilIcon}
                size="xs"
                variant="link"
                action={() => console.log('clicked')}
            />
            <Button
                icon={TrashIcon}
                size="xs"
                variant="link"
                action={() => notesStorage.delete(id)}
            />
        </>
    );
}
