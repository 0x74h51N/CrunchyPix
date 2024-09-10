import { slugifyHeading } from '@/lib/slugifyHeading';
import { RichTextField } from '@prismicio/client';
import { JSXMapSerializer, PrismicRichText } from '@prismicio/react';
import { Heading } from './Heading';
import { CodeBlock } from './CodeBlock';
import { RTPreformattedNode } from '@prismicio/types';
import Hyperlink from './Hyperlink';

export const richTextComponents: JSXMapSerializer = {
  label: ({ node, children }) => {
    if (node.data.label === 'codespan') {
      return <code>{children}</code>;
    }
  },
  heading1: ({ children, node }) => (
    <Heading
      as="h2"
      className="!mb-10 !mt-24 w-full h1-blog text-h1"
      id={slugifyHeading(node)}
    >
      {children}
      <hr className="border mt-2 w-full" />
    </Heading>
  ),
  heading2: ({ children, node }) => (
    <Heading
      as="h3"
      size="4xl"
      className="mb-3 mt-16 text-h2"
      id={slugifyHeading(node)}
    >
      {children}
    </Heading>
  ),
  heading3: ({ children, node }) => (
    <Heading
      as="h4"
      size="3xl"
      className="mb-2 mt-10 text-h3"
      id={slugifyHeading(node)}
    >
      {children}
    </Heading>
  ),
  heading4: ({ children, node }) => (
    <Heading
      as="h5"
      size="xl"
      className="mt-5 underline underline-offset-1"
      id={slugifyHeading(node)}
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <div className="paragraph">{children}</div>,
  hyperlink: ({ children, node }) => (
    <Hyperlink node={node}>{children}</Hyperlink>
  ),
  preformatted: ({ node }: { node: RTPreformattedNode }) => {
    return <CodeBlock code={node.text} title={node.type} language={'bash'} />;
  },
  list: ({ children }) => (
    <ul className="p-3 pl-8 list-disc paragraph">{children}</ul>
  ),
  listItem: ({ children }) => <li className="mt-4 first:mt-1">{children}</li>,
  oList: ({ children }) => (
    <ol className="p-3 pl-10 paragraph list-decimal">{children}</ol>
  ),
  oListItem: ({ children }) => <li className="mt-4 first:mt-1">{children}</li>,
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
