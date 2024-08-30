'use client';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { RTLinkNode } from '@prismicio/client';
import { PrismicLink } from '@prismicio/react';
import React from 'react';

const Hyperlink = ({
  children,
  node,
}: {
  children: JSX.Element[];
  node: RTLinkNode;
}) => {
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  return (
    <span
      className=""
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PrismicLink
        field={node.data}
        className="font-bold hover:underline text-log-col hover:brightness-110"
      >
        {children}
      </PrismicLink>
    </span>
  );
};

export default Hyperlink;
