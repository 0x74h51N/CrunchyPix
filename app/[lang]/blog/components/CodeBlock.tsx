import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import TopTitle from './TopTitle';
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
  title: string;
}

export const CodeBlock = ({ language, code, title }: CodeBlockProps) => {
  const validLanguage = supportedLanguages.includes(language)
    ? language
    : 'text';

  return (
    <div>
      <TopTitle title={title} code={code} />
      <SyntaxHighlighter language={validLanguage} style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
