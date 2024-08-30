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
        <div className="codenote__m-3 first:codenote__mt-0">
            <div className="codenote__group codenote__relative">
                <div className="codenote__left codenote__collapse codenote__absolute codenote__right-0 codenote__rounded-bl codenote__backdrop-blur group-hover:codenote__visible">
                    <NoteActions noteModel={noteModel} />
                </div>
                <CodeBlock
                    startLine={noteModel.startLine}
                    language={language}
                    code={code.map((x) => x.code).join('\n')}
                />
            </div>
            <div className="codenote__flex codenote__items-start codenote__justify-between codenote__bg-foreground/15 codenote__p-3 codenote__rounded-b-sm codenote__text-sm codenote__text-neutral-950 dark:codenote__text-neutral-50">
                {noteModel.note}
                {commitId && (
                    <span className="codenote__ml-2 codenote__inline-flex codenote__items-center codenote__rounded codenote__py-0.5 codenote__px-1 codenote__text-xxs codenote__ring-1 codenote__ring-inset codenote__ring-neutral-950 dark:codenote__ring-neutral-50">
                        {shortenCommitId(commitId)}
                    </span>
                )}
            </div>
        </div>
    );
}
