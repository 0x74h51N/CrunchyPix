'use client';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { generateSpans } from './GenerateSpans';
import { generateSpanType } from '@/app/common.types';

type TypingTextProps = {
  text: string;
  typingSpeed?: number;
  textClass?: string;
  delay?: number;
  generateSpan?: boolean;
  loadingMode?: boolean;
  reverseDelay?: number;
};

const TypingText = ({
  text,
  typingSpeed = 50,
  textClass,
  delay = 1,
  generateSpan = false,
  colorType,
  randomCount,
  zeroColor,
  loadingMode = false,
  reverseDelay = 50,
}: TypingTextProps & generateSpanType) => {
  const [displayText, setDisplayText] = useState('');
  const [isDelayed, setIsDelayed] = useState(true);
  const [isWriting, setIsWriting] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const handleTyping = () => {
    if (isWriting && !isDelayed) {
      if (charIndex < text.length) {
        setDisplayText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsWriting(false), reverseDelay);
      }
    } else if (loadingMode && !isWriting) {
      if (charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setTimeout(() => setIsWriting(true), 50);
      }
    }
  };
  useEffect(() => {
    const interval = setInterval(handleTyping, typingSpeed);

    return () => clearInterval(interval);
  }, [typingSpeed, handleTyping]);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsDelayed(false);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [delay]);
  useEffect(() => {
    if (text !== displayText && !isWriting) {
      setDisplayText(text);
    }
  }, [text]);
  const content = useMemo(() => {
    if (generateSpan) {
      return (
        <div className={textClass}>
          {generateSpans({
            text: displayText,
            colorType: colorType,
            randomCount: randomCount,
            zeroColor: zeroColor,
          })}
        </div>
      );
    } else {
      return <span className={textClass}>{displayText}</span>;
    }
  }, [displayText]);

  return <>{content}</>;
};

export default memo(TypingText);
