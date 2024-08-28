import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
export const supportedLanguages = [
  'javascript',
  'typescript',
  'python',
  'html',
  'css',
  'json',
  'bash',
];

interface CodeBlockProps {
  language: string;
  code: string;
}

export const CodeBlock = ({ language, code }: CodeBlockProps) => {
  const validLanguage = supportedLanguages.includes(language)
    ? language
    : 'text';

  return (
    <div>
      <SyntaxHighlighter language={validLanguage} style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
