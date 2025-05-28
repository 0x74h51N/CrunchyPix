import { RTLinkNode } from '@prismicio/client';
import Link from 'next/link';
import { JSX } from 'react';

const Hyperlink = ({
  node,
  children,
}: {
  node: RTLinkNode;
  children: JSX.Element[];
}) => {
  const href = (node.data as { url: string }).url;
  return (
    <Link
      href={(href as string) || ''}
      target="_blank"
      className="inline-flex hover:text-log-col text-log-col text-opacity-80 hover:text-opacity-100 underline underline-offset-3 group"
    >
      {children}
    </Link>
  );
};

export default Hyperlink;
