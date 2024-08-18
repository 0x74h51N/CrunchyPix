import useClickableHandlers from '@/hooks/useClickableHandlers';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { memo, useRef, useState } from 'react';

const Accordiona = ({
  title,
  description,
  index,
  activeIndex,
  setActiveIndex,
}: {
  title: string;
  description: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const acordionaRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  useOutsideClick(acordionaRef, () => setActiveIndex(null), false);
  const isActive = activeIndex === index;

  return (
    <div
      ref={acordionaRef}
      className={`collapse collapse-arrow bg-nav-col hover:!text-log-col mb-2 !cursor-none rounded-lg ${
        isActive ? 'collapse-open' : 'h-12'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="collapse-title font-medium !cursor-none py-3 after:!top-6">
        {title}
      </div>
      <div className="collapse-content hover:text-white text-white">
        <hr className="mb-2 text-log-col" />
        <p>{description}</p>
      </div>
    </div>
  );
};

export default memo(Accordiona);
