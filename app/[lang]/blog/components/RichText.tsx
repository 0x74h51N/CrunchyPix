import { slugifyHeading } from '@/lib/slugifyHeading';
import { RichTextField } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { Heading } from './Heading';
import { CodeBlock } from './CodeBlock';
import { RTPreformattedNode } from '@prismicio/types';
import Hyperlink from './Hyperlink';
import { FaArrowRight } from 'react-icons/fa6';

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
    <Hyperlink node={node}>{children}</Hyperlink>
  ),
  preformatted: ({ node }: { node: RTPreformattedNode }) => {
    const languageSpan = node.spans.find((span) => span.type === 'label');

    const language = languageSpan
      ? node.text.substring(languageSpan.start, languageSpan.end)
      : 'text';

    return <CodeBlock language={language} code={node.text} title={node.type} />;
  },
  list: ({ children }) => (
    <ul className="list-none bg-base-200 p-5 rounded-md">{children}</ul>
  ),
  listItem: ({ children }) => (
    <li className="ml-3 flex items-center">
      <FaArrowRight className="mr-2" />
      {children}
    </li>
  ),
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
