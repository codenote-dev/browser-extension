import type { TNoteModel } from '~data/models/NoteModel';
import { useNotesService } from '~data/services/NotesService';
import RepositoryPanel from '~ui/components/RepositoryPanel';
import {
    Accordion,
    type AccordionProps,
} from '~ui/shared/components/accordion/Accordion';

import { Empty } from './Empty';

export const Notes = () => {
    const { getGrouped, hasAny } = useNotesService();
    const notes = getGrouped();
    const repositoryPanels: AccordionProps['children'] = [];

    if (!hasAny()) {
        return <Empty />;
    }

    Object.entries(notes).forEach(([provider, repositories]) =>
        Object.entries(repositories).forEach(([repository, files]) =>
            repositoryPanels.push(
                <RepositoryPanel
                    key={repository}
                    provider={provider as TNoteModel['code']['provider']}
                    repository={repository}
                    files={files as Record<string, TNoteModel[]>}
                />,
            ),
        ),
    );

    return <Accordion>{repositoryPanels}</Accordion>;
};
