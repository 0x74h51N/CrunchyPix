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
      size="4xl"
      className="mb-7 mt-12 first:mt-0 last:mb-0 w-full font-bold"
      id={slugifyHeading(node)}
    >
      {children}
      <hr className="border mt-2 w-full" />
    </Heading>
  ),
  heading2: ({ children, node }) => (
    <Heading
      as="h3"
      size="2xl"
      className="mb-7 mt-10 last:mb-0"
      id={slugifyHeading(node)}
    >
      {children}
    </Heading>
  ),
  heading3: ({ children, node }) => (
    <Heading
      as="h4"
      size="xl"
      className="mb-5 mt-8 last:mb-0"
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
    return <CodeBlock code={node.text} title={node.type} language={'text'} />;
  },
  list: ({ children }) => (
    <ul className="p-3 pl-10 list-disc rounded-md paragraph">{children}</ul>
  ),
  listItem: ({ children }) => <li>{children}</li>,
};

interface RichTextProps {
  field: RichTextField;
}

export const RichText = ({ field }: RichTextProps) => {
  return <PrismicRichText field={field} components={richTextComponents} />;
};
