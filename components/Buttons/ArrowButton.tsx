import React from "react";
import Image from "next/image";
import { scrollToSection } from "@/utils/scrollToSection";
import { useScrollContext } from "@/context/ScrollContext";

interface ArrowButtonProps {
  index?: number;
  text?: string;
  className?: string;
  arrow?: boolean;
  duration?: number;
}

const ArrowButton = ({
  index,
  text,
  className,
  arrow,
  duration = 0,
}: ArrowButtonProps) => {
  const { sectionRefs, setCurrentSectionIndex } = useScrollContext();
  const handleButtonClick = () => {
    if (index !== undefined) {
      scrollToSection(index, duration, sectionRefs, setCurrentSectionIndex);
    }
  };

  return (
    <button className={`${className} cursor-none`} onClick={handleButtonClick}>
      {text}
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

export default ArrowButton;
