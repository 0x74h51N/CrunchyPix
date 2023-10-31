// Button.tsx
import React from "react";
import { useScroll } from "./Scroll";

interface CusButtonProps {
  index: number;
  text: string;
  className: string;
}

const CusButton = ({ index, text, className }: CusButtonProps) => {
  const { scrollToSection } = useScroll();

  return (
    <button onClick={() => scrollToSection(index)} className={className}>
      {text}
    </button>
  );
};

export default CusButton;
