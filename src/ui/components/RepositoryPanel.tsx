import { Github, GitlabFull } from 'iconoir-react';
import React from 'react';

import type { TNoteModel } from '~data/models/NoteModel';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~ui/shared/components/Accordion';

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
    const icon =
        provider === 'gitlab' ? (
            <GitlabFull color="#fff" width={18} height={18} />
        ) : (
            <Github color="#fff" width={18} height={18} />
        );
    const content = Object.entries(files).map(([fileName, notes]) => (
        <FilePanel key={fileName} fileName={fileName} notes={notes} />
    ));

    return (
        <AccordionItem value={repository} className="codenote__border-b">
            <AccordionTrigger className="codenote__flex codenote__w-full codenote__cursor-pointer codenote__items-start codenote__justify-between codenote__p-3">
                <span
                    className="codenote__text-base codenote__font-bold codenote__inline-flex codenote__items-center"
                    title={repository}>
                    {icon && <span className="codenote__mr-2">{icon}</span>}
                    <span
                        className={`codenote__w-[250px] codenote__overflow-hidden codenote__text-ellipsis codenote__whitespace-nowrap codenote__text-left`}
                        dir="rtl">
                        {repository}
                    </span>
                </span>
                <span className="codenote__inline-flex codenote__items-center codenote__rounded-full codenote__bg-muted codenote__px-2 codenote__py-1 codenote__text-xs codenote__font-medium">
                    {notesCountString}
                </span>
            </AccordionTrigger>
            <AccordionContent className="codenote__pb-0">
                <Accordion type="multiple">{content}</Accordion>
            </AccordionContent>
        </AccordionItem>
    );
};

export default RepositoryPanel;
