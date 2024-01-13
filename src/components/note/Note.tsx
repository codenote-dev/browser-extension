import { useNotesStorage } from '~data/useNotesStorage';
import type { CodeLine } from '~schemas/schema';
import type { LanguageAlias } from '~utils';

import { CodeBlock } from './CodeBlock';
import { NoteActions } from './NoteActions';

export type NoteProps = {
    id: number;
    code: CodeLine[];
    language: LanguageAlias;
    note?: string;
};

export function Note({ id, code, language, note = '' }: NoteProps) {
    const notesStorage = useNotesStorage();

    return (
        <div className="px-3 pb-3">
            <div className="group relative">
                <div className="left collapse absolute right-0 rounded-bl backdrop-blur group-hover:visible">
                    <NoteActions id={id} />
                </div>
                <CodeBlock
                    startLine={code[0].lineNumber}
                    language={language}
                    code={code.map((x) => x.code).join('\n')}
                />
            </div>
            <div className="bg-gray-500/10 p-1 text-sm text-white">{note}</div>
        </div>
    );
}
