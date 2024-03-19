import type { CodeLine } from '~schemas/schema';
import { shortenCommitId, type LanguageAlias } from '~utils';

import { CodeBlock } from './CodeBlock';
import { NoteActions } from './NoteActions';

export type NoteProps = {
    id: number;
    code: CodeLine[];
    language: LanguageAlias;
    commitId: string;
    note?: string;
};

export function Note({ id, code, language, commitId, note = '' }: NoteProps) {
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
            <div className="flex items-start justify-between bg-[#282a2d] px-3 py-2 text-sm text-[#bdbdbd]">
                {note}
                <span className="ml-2 inline-flex items-center rounded p-1 text-[0.625rem]/3 ring-1 ring-inset ring-[#828282]">
                    {shortenCommitId(commitId)}
                </span>
            </div>
        </div>
    );
}
