import { useState } from 'react';

import type { TCodeModel } from '~data/models/CodeModel';
import type { LanguageAlias } from '~lib/utils';
import { Button } from '~ui/shared/components/Button';
import { Textarea } from '~ui/shared/components/Textarea';

import { CodeBlock } from './CodeBlock';

export type EditableNoteProps = {
    code: TCodeModel['code'];
    language: LanguageAlias;
    note?: string;
    save: (note: string) => void;
    discard: (note: string) => void;
};

export function EditableNote({
    code,
    language,
    note = '',
    save,
    discard,
}: EditableNoteProps) {
    const [comment, setComment] = useState(note);

    return (
        <>
            <div className="codenote__my-3">
                <CodeBlock
                    startLine={code[0].lineNumber}
                    language={language}
                    code={code.map((x) => x.code).join('\n')}
                    rounded
                />
            </div>
            <div className="codenote__my-3">
                <Textarea
                    placeholder="Add a note"
                    id="note"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <div className="codenote__my-3 codenote__flex codenote__items-center codenote__justify-end codenote__gap-x-3">
                    <Button variant="ghost" onClick={() => discard(comment)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => save(comment)}>
                        Save
                    </Button>
                </div>
            </div>
        </>
    );
}
