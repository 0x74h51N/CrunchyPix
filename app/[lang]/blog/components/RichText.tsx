import { slugifyHeading } from '@/lib/slugifyHeading';
import { RichTextField } from '@prismicio/client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import {
  JSXMapSerializer,
  PrismicRichText,
  PrismicLink,
} from '@prismicio/react';
import { Heading } from './Heading';
import { CodeBlock } from './CodeBlock';
import { RTPreformattedNode } from '@prismicio/types';

export const richTextComponents: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === 'codespan') {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children, node }) => (
    <Heading
      as="h2"
      size="3xl"
      className="mb-7 mt-12 first:mt-0 last:mb-0"
      id={slugifyHeading(node)}
    >
      {children}
    </Heading>
  ),
  heading2: ({ children, node }) => (
    <Heading
      as="h3"
      size="2xl"
      className="mb-7 last:mb-0"
      id={slugifyHeading(node)}
    >
      {children}
    </Heading>
  ),
  heading3: ({ children, node }) => (
    <Heading
      as="h4"
      size="xl"
      className="mb-7 last:mb-0"
      id={slugifyHeading(node)}
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
  hyperlink: ({ children, node }) => (
    <PrismicLink
      field={node.data}
      className="font-bold underline text-log-col hover:text-opacity-80"
    >
      {children}
    </PrismicLink>
  ),
  preformatted: ({ node }: { node: RTPreformattedNode }) => {
    const languageSpan = node.spans.find((span) => span.type === 'label');

    const language = languageSpan
      ? node.text.substring(languageSpan.start, languageSpan.end)
      : 'text';

    return <CodeBlock language={language} code={node.text} />;
  },
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
