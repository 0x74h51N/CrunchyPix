import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  vscDarkPlus,
  vs,
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import TopTitle from './TopTitle';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownTable from './MarkdownTable';
import { getTheme } from '@/app/actions/setThemeAction';
import { CodeLanguages } from '@/types/common.types';

interface CodeBlockProps {
  language: CodeLanguages;
  code: string;
  title: string;
}

export const CodeBlock = async ({ language, code, title }: CodeBlockProps) => {
  const theme = await getTheme();

  const highlightStyle = theme === 'light' && theme ? vs : vscDarkPlus;
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
            <SyntaxHighlighter language={language} style={highlightStyle}>
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}
    </div>
  );
};
