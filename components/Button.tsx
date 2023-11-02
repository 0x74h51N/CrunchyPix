// Button.tsx
import React from "react";
import { useScroll } from "./Scroll";
import Image from "next/image";

interface CusButtonProps {
  index: number;
  text?: string;
  className?: string;
  arrow?: boolean;
}

const ArrowButton = ({ index, text, className, arrow }: CusButtonProps) => {
  const { scrollToSection } = useScroll();

  return (
    <button onClick={() => scrollToSection(index)} className={className}>
      {text}
      {arrow && (
        <Image
          src="arrow-down.svg"
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
