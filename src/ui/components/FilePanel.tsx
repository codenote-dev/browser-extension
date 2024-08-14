import type { TNoteModel } from '~data/models/NoteModel';
import { removeLeadingSlash } from '~lib/utils';
import type { AccordionBarProps } from '~ui/shared/components/accordion/AccordionBar';
import AccordionPanel from '~ui/shared/components/accordion/AccordionPanel';

import { Note } from './note/Note';

export type FilePanelProps = {
    fileName: string;
    notes: TNoteModel[];
};

const FilePanel = ({ fileName, notes }: FilePanelProps) => {
    const titleBarProps = {
        title: removeLeadingSlash(fileName),
        label: notes.length > 99 ? '99+' : notes.length.toString(),
        variant: 'secondary',
    } as AccordionBarProps;
    const content = notes.map((note: TNoteModel) => (
        <Note key={note.id} noteModel={note} />
    ));

    return <AccordionPanel titleBar={titleBarProps}>{content}</AccordionPanel>;
};

export default FilePanel;
