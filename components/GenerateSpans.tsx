import { useAnimation, motion } from "framer-motion";
import { ColorfulHover } from "./ColorfulHover";

export const generateSpans = (text: string) => {
  const spans = [];
  let currentSpan = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === " ") {
      if (currentSpan.length > 0) {
        spans.push(
          <motion.span className="whitespace-normal inline-block cursor-pointer">
            {currentSpan.map((char, index) => (
              <ColorfulHover key={index} char={char} span={true} />
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
      <motion.span className="whitespace-nowrap cursor-pointer">
        {currentSpan.map((char, index) => (
          <ColorfulHover key={index} char={char} span={true} />
        ))}
      </motion.span>
    );
  }

  return spans;
};
