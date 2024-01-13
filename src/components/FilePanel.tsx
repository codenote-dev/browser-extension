import type { NoteOutput } from '~schemas/schema';
import { removeLeadingSlash, type LanguageAlias } from '~utils';

import { Note } from './note/Note';
import type { AccordionBarProps } from './shared/accordion/AccordionBar';
import AccordionPanel from './shared/accordion/AccordionPanel';

export type FilePanelProps = {
    fileName: string;
    notes: NoteOutput[];
};

const FilePanel = ({ fileName, notes }: FilePanelProps) => {
    const titleBarProps = {
        title: removeLeadingSlash(fileName),
        label: notes.length > 99 ? '99+' : notes.length.toString(),
        variant: 'secondary',
    } as AccordionBarProps;
    const content = notes.map((note) => (
        <Note
            key={note.id}
            id={note.id}
            code={note.code}
            language={note.file.ext as LanguageAlias}
            note={note.comment}
        />
    ));

    return <AccordionPanel titleBar={titleBarProps}>{content}</AccordionPanel>;
};

export default FilePanel;
