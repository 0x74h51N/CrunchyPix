import { useAnimation, motion } from "framer-motion";
import { useEffect, useState } from "react";

type HoverDelaySpanProps = {
  char: string;
};

const HoverDelaySpan: React.FC<HoverDelaySpanProps> = ({ char }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const getRandomColor = () => {
    const colors = ["#6a7fff", "#ff8c8c", "#88c34a", "#f4d35e"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  useEffect(() => {
    controls.start({
      color: isHovered ? getRandomColor() : "#dfd9ff",
      scale: isHovered ? 1.2 : 1,
      transition: { duration: isHovered ? 0.2 : 2 },
    });
  }, [isHovered, controls]);

  return (
    <motion.span
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className={`inline-block cursor-pointer ${
        isHovered ? "whitespace-nowrap" : ""
      }`}
      animate={controls}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export const generateSpans = (text: string) => {
  const spans = [];
  let currentSpan = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === " ") {
      if (currentSpan.length > 0) {
        spans.push(
          <motion.span className="whitespace-nowrap">
            {currentSpan.map((char, index) => (
              <HoverDelaySpan key={index} char={char} />
            ))}
          </motion.span>
        );
        currentSpan = [];
      }
      spans.push(<span>&nbsp;</span>);
    } else {
      currentSpan.push(char);
    }
  }

  if (currentSpan.length > 0) {
    spans.push(
      <motion.span className="whitespace-nowrap">
        {currentSpan.map((char, index) => (
          <HoverDelaySpan key={index} char={char} />
        ))}
      </motion.span>
    );
  }

  return spans;
};
