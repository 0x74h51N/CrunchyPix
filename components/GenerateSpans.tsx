import { motion } from "framer-motion";
import { ColorfulHover } from "./ColorfulHover";
import { generateSpanType } from "@/app/common.types";

export const generateSpans = ({
  text,
  colorType,
  zeroColor,
  randomCount,
  _className,
}: generateSpanType) => {
  const spans = [];
  let currentSpan = [];

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (char === " ") {
      if (currentSpan.length > 0) {
        spans.push(
          <motion.span className="whitespace-normal inline-block cursor-pointer ">
            {currentSpan.map((char, index) => (
              <ColorfulHover
                key={index}
                char={char}
                span={true}
                _colorType={colorType}
                randomCount={randomCount}
                zeroColor={zeroColor}
                className={_className}
              />
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
          <ColorfulHover
            key={index}
            char={char}
            span={true}
            _colorType={colorType}
            randomCount={randomCount}
            zeroColor={zeroColor}
            className={_className}
          />
        ))}
      </motion.span>
    );
  }

  return spans;
};
