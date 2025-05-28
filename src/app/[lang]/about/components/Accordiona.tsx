import useClickableHandlers from '@/hooks/useClickableHandlers';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AcordionaProps {
  title: string;
  description: string;
  index: number;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
/**
 * Accordiona is a custom accordion component designed for smooth transition animations
 * and to handle both the behavior of checkbox and radio buttons.
 * This component is also responsive to outside click events, which closes the currently open accordion.
 *
 * @param {string} title - The title of the accordion section.
 * @param {string} description - The content to be displayed when the accordion is expanded.
 * @param {number} index - The index of the accordion item, used to identify which item is active.
 * @param {number | null} activeIndex - The index of the currently active (open) accordion item.
 * @param {React.Dispatch<React.SetStateAction<number | null>>} setActiveIndex - Function to set the active index, used to control which accordion item is open.
 *
 * @returns {JSX.Element} A rendered accordion component with smooth transition effects and outside click handling.
 */

const Accordiona = ({
  title,
  description,
  index,
  activeIndex,
  setActiveIndex,
}: AcordionaProps) => {
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const acordionaRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState('3rem');
  const handleClick = () => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useOutsideClick(
    acordionaRef as React.RefObject<HTMLElement>,
    () => setActiveIndex(null),
    false,
  );

  const isActive = activeIndex === index;
  useEffect(() => {
    if (isActive) {
      setContentHeight(`${acordionaRef.current?.scrollHeight}px`);
    } else {
      setContentHeight('3rem');
    }
  }, [isActive, title]);
  return (
    <div
      ref={acordionaRef}
      className={`overflow-hidden bg-nav-col mb-2 !cursor-none rounded-lg p-3 transition-all duration-700 ease-in-out ${
        isActive ? 'max-h-96' : 'max-h-12'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        maxHeight: contentHeight,
      }}
    >
      <div className="w-full flex justify-between items-center  text-stone-300">
        <h3
          className={`hover:!text-log-col ml-1 ${!isActive ? 'max-sm:line-clamp-1' : ''}`}
        >
          {title}
        </h3>
        <Image
          src="/arrow.svg"
          alt="Arrow"
          priority
          width={8}
          height={8}
          className={`transition-transform duration-500 ease-in-out object-contain ${
            isActive ? 'rotate' : ''
          }`}
        />
      </div>
      <div className="text-white px-4">
        <hr className="mt-4 mb-2 text-log-col" />
        <p className="p">{description}</p>
      </div>
    </div>
  );
};

export default Accordiona;
