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
            <div className="mt-5">
                <CodeBlock
                    startLine={code[0].lineNumber}
                    language={language}
                    code={code.map((x) => x.code).join('\n')}
                />
            </div>
            <div className="mt-5">
                <Textarea
                    placeholder="Add a note"
                    id="note"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <div className="mt-2 flex items-center justify-end gap-x-2">
                    <Button
                        text="Cancel"
                        variant="secondary"
                        action={() => discard(comment)}
                    />
                    <Button text="Save" action={() => save(comment)} />
                </div>
            </div>
        </>
    );
}
