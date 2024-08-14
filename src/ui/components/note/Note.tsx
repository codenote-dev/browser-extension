import type { TNoteModel } from '~data/models/NoteModel';
import { shortenCommitId, type LanguageAlias } from '~lib/utils';

import { CodeBlock } from './CodeBlock';
import { NoteActions } from './NoteActions';

type NoteProps = {
    noteModel: TNoteModel;
};

export function Note({ noteModel }: NoteProps) {
    const code = noteModel.code.code;
    const commitId = noteModel.code.commitId;
    const language = noteModel.code.file.ext as LanguageAlias;

    return (
        <div className="px-3 pb-3">
            <div className="group relative">
                <div className="left collapse absolute right-0 rounded-bl backdrop-blur group-hover:visible">
                    <NoteActions noteModel={noteModel} />
                </div>
                <CodeBlock
                    startLine={noteModel.startLine}
                    language={language}
                    code={code.map((x) => x.code).join('\n')}
                />
            </div>
            <div className="flex items-start justify-between bg-[#282a2d] px-3 py-2 text-sm text-[#bdbdbd]">
                {noteModel.note}
                {commitId && (
                    <span className="ml-2 inline-flex items-center rounded p-1 text-[0.625rem]/3 ring-1 ring-inset ring-[#828282]">
                        {shortenCommitId(commitId)}
                    </span>
                )}
            </div>
        </div>
    );
}
