import type { TNoteModel } from '~data/models/NoteModel';
import { removeLeadingSlash } from '~lib/utils';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~ui/shared/components/Accordion';

import { Note } from './note/Note';

export type FilePanelProps = {
    fileName: string;
    notes: TNoteModel[];
};

const FilePanel = ({ fileName, notes }: FilePanelProps) => {
    const file = removeLeadingSlash(fileName);
    const notesCountString =
        notes.length > 99 ? '99+' : notes.length.toString();
    const content = notes.map((note: TNoteModel) => (
        <Note key={note.id} noteModel={note} />
    ));

    return (
        <AccordionItem value={file}>
            <AccordionTrigger className="codenote__flex codenote__w-full codenote__cursor-pointer codenote__items-start codenote__justify-between codenote__p-3 codenote__pt-0">
                <span className="codenote__text-sm" title={file}>
                    <span
                        className={`codenote__w-[250px] codenote__overflow-hidden codenote__text-ellipsis codenote__whitespace-nowrap codenote__text-left`}
                        dir="rtl">
                        {file}
                    </span>
                </span>
                <span className="codenote__inline-flex codenote__items-center codenote__px-2 codenote__py-1 codenote__text-xs codenote__font-medium">
                    {notesCountString}
                </span>
            </AccordionTrigger>
            <AccordionContent className="codenote__pb-0">
                {content}
            </AccordionContent>
        </AccordionItem>
    );
};

export default FilePanel;
