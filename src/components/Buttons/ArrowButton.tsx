'use client';
import Image from 'next/image';
import { scrollToSection } from '@/utils/scrollToSection';
import useClickableHandlers from '@/hooks/useClickableHandlers';

interface ArrowButtonProps {
  index?: number;
  className?: string;
  arrow?: boolean;
  duration?: number;
  sectionRefs: React.RefObject<HTMLDivElement>[];
}

export const ArrowButton = ({
  index,
  className,
  arrow,
  duration = 0,
  sectionRefs,
}: ArrowButtonProps) => {
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const handleButtonClick = () => {
    if (index !== undefined) {
      scrollToSection(index, duration, sectionRefs);
    }
    handleMouseLeave();
  };

  return (
    <button
      className={`${className} cursor-none`}
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {arrow && (
        <Image
          src="/arrow.svg"
          alt="Arrow"
          width={50}
          height={50}
          loading="lazy"
        />
      )}
    </button>
  );
};
