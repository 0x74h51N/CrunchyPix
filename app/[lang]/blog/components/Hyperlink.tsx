'use client';
import CustomLink from '@/components/CustomLink';
import { RTLinkNode } from '@prismicio/client';
import React from 'react';

const Hyperlink = ({
  children,
  node,
}: {
  children: JSX.Element[];
  node: RTLinkNode;
}) => {
  const href = (node.data as { url: string }).url;
  return <CustomLink href={href}>{children}</CustomLink>;
};

export default Hyperlink;
