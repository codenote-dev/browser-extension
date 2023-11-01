import { useState } from 'react';

import type { CodeLine } from '~schemas/schema';
import type { LanguageAlias } from '~utils';

import { Button } from './Button';
import { CodeBlock } from './CodeBlock';
import { Textarea } from './Textarea';

export type EditableNoteProps = {
    code: CodeLine[];
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
