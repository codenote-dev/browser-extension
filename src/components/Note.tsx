import type { CodeLine } from '~schemas/schema';
import type { LanguageAlias } from '~utils';

import { Button } from './Button';
import { CodeBlock } from './CodeBlock';

export type NoteProps = {
    code: CodeLine[];
    language: LanguageAlias;
    note?: string;
};

export function Note({ code, language, note = '' }: NoteProps) {
    return (
        <>
            {/* <div className="actions">
                <Button
                    icon={PencilIcon}
                    variant="secondary"
                    action={() => console.log('clicked')}
                />
                <Button
                    icon={TrashIcon}
                    variant="secondary"
                    action={() => console.log('clicked')}
                />
            </div> */}
            <CodeBlock
                startLine={code[0].lineNumber}
                language={language}
                code={code.map((x) => x.code).join('\n')}
            />
            <p>{note}</p>
        </>
    );
}
