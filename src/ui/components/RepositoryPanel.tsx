import { Github, GitlabFull } from 'iconoir-react';
import React from 'react';

import type { TNoteModel } from '~data/models/NoteModel';
import { Accordion } from '~ui/shared/components/accordion/Accordion';
import type { AccordionBarProps } from '~ui/shared/components/accordion/AccordionBar';
import AccordionPanel from '~ui/shared/components/accordion/AccordionPanel';

import FilePanel from './FilePanel';

type RepositoryPanelProps = {
    provider: TNoteModel['code']['provider'];
    repository: string;
    files: Record<string, TNoteModel[]>;
};

const RepositoryPanel = ({
    provider,
    repository,
    files,
}: RepositoryPanelProps) => {
    const notesCount = Object.values(files).reduce(
        (acc, notes) => acc + notes.length,
        0,
    );
    const notesCountString = notesCount > 99 ? '99+' : notesCount.toString();
    const titleBarProps = {
        icon:
            provider === 'gitlab' ? (
                <GitlabFull color="#fff" width={18} height={18} />
            ) : (
                <Github color="#fff" width={18} height={18} />
            ),
        title: repository,
        label: notesCountString,
        variant: 'primary',
    } as AccordionBarProps;
    const content = Object.entries(files).map(([fileName, notes]) => (
        <FilePanel key={fileName} fileName={fileName} notes={notes} />
    ));

    return (
        <AccordionPanel titleBar={titleBarProps}>
            <Accordion>{content}</Accordion>
        </AccordionPanel>
    );
};

export default RepositoryPanel;
