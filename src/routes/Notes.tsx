import RepositoryPanel from '~components/RepositoryPanel';
import {
    Accordion,
    type AccordionProps,
} from '~components/shared/accordion/Accordion';
import { useNotesStorage } from '~data/useNotesStorage';
import type { NoteOutput } from '~schemas/schema';

export const Notes = () => {
    const notesStorage = useNotesStorage();
    const notes = notesStorage.getGroupedNotesByProviderRepositoryFilename();
    const repositoryPanels: AccordionProps['children'] = [];

    Object.entries(notes).forEach(([provider, repositories]) =>
        Object.entries(repositories).forEach(([repository, files]) =>
            repositoryPanels.push(
                <RepositoryPanel
                    key={repository}
                    provider={provider as NoteOutput['provider']}
                    repository={repository}
                    files={files}
                />,
            ),
        ),
    );

    return <Accordion>{repositoryPanels}</Accordion>;
};
