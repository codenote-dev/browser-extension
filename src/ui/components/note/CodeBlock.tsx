import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
    oneDark,
    oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

import { getCodeLanguage, type LanguageAlias } from '~lib/utils';

export type CodeBlockProps = {
    code: string;
    startLine?: number;
    language: LanguageAlias;
    rounded?: boolean;
};

export function CodeBlock({
    code,
    startLine,
    language,
    rounded = false,
}: CodeBlockProps) {
    const borderRadius = rounded
        ? {}
        : { borderBottomLeftRadius: '0', borderBottomRightRadius: '0' };
    return (
        <SyntaxHighlighter
            showLineNumbers={true}
            startingLineNumber={startLine}
            useInlineStyles={true}
            language={getCodeLanguage(language)}
            style={{
                ...oneDark,
                prism: {
                    ...oneDark.prism,
                },
            }}
            customStyle={{
                fontSize: '12px',
                padding: '8px',
                margin: '0',
                ...borderRadius,
            }}>
            {code}
        </SyntaxHighlighter>
    );
}
