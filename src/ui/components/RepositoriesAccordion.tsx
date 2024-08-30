import React, { type ReactNode } from 'react';

import type { TNoteModel } from '~data/models/NoteModel';
import { useNotesService } from '~data/services/NotesService';
import { Accordion } from '~ui/shared/components/Accordion';

import RepositoryPanel from './RepositoryPanel';

type RepositoriesAccordionProps = {
    notes: TNoteModel[];
};

const RepositoriesAccordion: React.FC<RepositoriesAccordionProps> = ({
    notes,
}) => {
    const { group } = useNotesService();
    const repositoryPanels: ReactNode[] = [];

    Object.entries(group(notes)).forEach(([provider, repositories]) =>
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

    return (
        <Accordion type="multiple" className="codenote__border-t">
            {repositoryPanels}
        </Accordion>
    );
};

export default RepositoriesAccordion;
