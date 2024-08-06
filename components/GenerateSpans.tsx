import { ColorfulHover } from './ColorfulHover';
import { generateSpanType } from '@/types/common.types';

export const generateSpans = ({
  text,
  colorType,
  zeroColor,
  randomCount,
  _className,
}: generateSpanType) => {
  const words = text.split(' ');
  const spans = words.map((word, index) => {
    const characters = word.split('').map((char, charIndex) => (
      <span key={`char-${charIndex}`} className={`cursor-none`}>
        <ColorfulHover
          char={char}
          span={true}
          _colorType={colorType}
          randomCount={randomCount}
          zeroColor={zeroColor}
          className={_className}
        />
      </span>
    ));

    return <span key={`word-${index}`}>{characters} </span>;
  });

  return spans;
};
