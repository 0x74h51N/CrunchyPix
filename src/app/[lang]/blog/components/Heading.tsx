import clsx from 'clsx';
import React, { ElementType, ReactNode } from 'react';

interface HeadingProps {
  as?: ElementType;
  size?: '4xl' | '3xl' | '2xl' | 'xl';
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  as: Comp = 'h1',
  size = '4xl',
  children,
  className,
  id,
}) => {
  return (
    <Comp
      id={id}
      className={clsx(
        'font-sans font-semibold tracking-tighter text-pretty',
        size === '4xl' && 'text-3xl md:text-4xl',
        size === '3xl' && 'text-3xl',
        size === '2xl' && 'text-2xl',
        size === 'xl' && 'text-xl',
        className,
      )}
    >
      {children}
    </Comp>
  );
};
