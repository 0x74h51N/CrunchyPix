'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import { JSX } from 'react';
import useClickableHandlers from '@/hooks/useClickableHandlers';

interface CustomLinkProps {
  children: JSX.Element | JSX.Element[];
  href: string;
}

const CustomLink = ({ children, href }: CustomLinkProps) => {
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  return (
    <Link
      href={(href as string) || ''}
      target="_blank"
      className={isBlog ? 'cursor-pointer' : 'cursor-none'}
    >
      <span
        className={`text-log-col underline underline-offset-3 ${
          isBlog ? 'cursor-pointer' : 'cursor-none'
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
