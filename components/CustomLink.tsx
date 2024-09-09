'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import useClickableHandlers from '@/hooks/useClickableHandlers';

interface CustomLinkProps {
  children: JSX.Element | JSX.Element[];
  href: string;
}

const CustomLink = ({ children, href }: CustomLinkProps) => {
  const [isBlogReady, setIsBlogReady] = useState(false);

  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  useEffect(() => {
    setIsBlogReady(isBlog);
  }, [isBlog]);

  return (
    <Link
      href={(href as string) || ''}
      target="_blank"
      className={isBlogReady ? 'cursor-pointer' : 'cursor-none'}
    >
      <span
        className={`text-log-col underline underline-offset-3 ${
          isBlogReady ? 'cursor-pointer' : 'cursor-none'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
    </Link>
  );
};

export default CustomLink;
