import { RTLinkNode } from '@prismicio/client';
import Link from 'next/link';

const Hyperlink = ({
  children,
  node,
}: {
  children: JSX.Element[];
  node: RTLinkNode;
}) => {
  const href = (node.data as { url: string }).url;
  return (
    <Link
      href={(href as string) || ''}
      target="_blank"
      className="inline-flex hover:text-log-col underline underline-offset-3 group"
    >
      {children}
    </Link>
  );
};

export default Hyperlink;
