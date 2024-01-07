import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { getCodeLanguage, type LanguageAlias } from '~utils';

export type CodeBlockProps = {
    code: string;
    startLine: number;
    language: LanguageAlias;
};

export function CodeBlock({ code, startLine, language }: CodeBlockProps) {
    return (
        <SyntaxHighlighter
            showLineNumbers={true}
            startingLineNumber={startLine}
            useInlineStyles={true}
            language={getCodeLanguage(language)}
            style={stackoverflowDark}>
            {code}
        </SyntaxHighlighter>
    );
}
