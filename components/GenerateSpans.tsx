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

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const isWhitespace = char === " ";

    spans.push(
      <span
        key={`char-${i}`}
        className={`${
          isWhitespace ? "whitespace-normal" : "whitespace-nowrap"
        } cursor-pointer`}
      >
        {isWhitespace ? (
          <span>&nbsp;</span>
        ) : (
          <ColorfulHover
            char={char}
            span={true}
            _colorType={colorType}
            randomCount={randomCount}
            zeroColor={zeroColor}
            className={_className}
          />
        )}
      </span>
    );
  }

  return spans;
};
