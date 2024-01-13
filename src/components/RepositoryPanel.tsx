import type { NoteOutput } from '~schemas/schema';

import FilePanel from './FilePanel';
import GithubIcon from './icons/GithubIcon';
import { Accordion } from './shared/accordion/Accordion';
import type { AccordionBarProps } from './shared/accordion/AccordionBar';
import AccordionPanel from './shared/accordion/AccordionPanel';

type RepositoryPanelProps = {
    provider: NoteOutput['provider'];
    repository: string;
    files: Record<string, NoteOutput[]>;
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
        icon: provider === 'gitlab' ? <GithubIcon /> : <GithubIcon />,
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
