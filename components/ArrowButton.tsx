import React from "react";
import Image from "next/image";
import { scrollToSection } from "@/utils/scrollToSection";
import { useScrollContext } from "@/context/ScrollContext";

interface ArrowButtonProps {
  index?: number;
  text?: string;
  className?: string;
  arrow?: boolean;
}

const ArrowButton = ({ index, text, className, arrow }: ArrowButtonProps) => {
  const { sectionRefs, setCurrentSectionIndex } = useScrollContext();

  const handleButtonClick = () => {
    if (index !== undefined) {
      scrollToSection(index, sectionRefs, setCurrentSectionIndex);
    }
  };

  return (
    <button className={className} onClick={handleButtonClick}>
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
