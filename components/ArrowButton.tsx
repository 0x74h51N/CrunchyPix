import React from "react";
import { useScroll } from "./Section";
import Image from "next/image";

interface CusButtonProps {
  index?: number;
  text?: string;
  className?: string;
  arrow?: boolean;
}

const ArrowButton = ({ index, text, className, arrow }: CusButtonProps) => {
  const { scrollToSection } = useScroll();

  return (
    <button
      onClick={() => index && scrollToSection(index)}
      className={className}
    >
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
