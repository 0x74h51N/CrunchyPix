import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import TopTitle from './TopTitle';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownTable from './MarkdownTable';
export const codeLanguages = [
  'typescript',
  'javascript',
  'python',
  'json',
  'html',
  'css',
  'structure',
  'bash',
  'text',
  'table',
] as const;

interface CodeBlockProps {
  language: (typeof codeLanguages)[number];
  code: string;
  title: string;
}

export const CodeBlock = ({ language, code, title }: CodeBlockProps) => {
  return (
    <div>
      {language === 'table' ? (
        <div className="mt-3 mb-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={MarkdownTable}>
            {code}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="my-3">
          {language === 'text' ? null : (
            <TopTitle title={title} code={code} language={language} />
          )}
          <div className="max-h-[400px] overflow-auto">
            <SyntaxHighlighter language={language} style={vscDarkPlus}>
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};
