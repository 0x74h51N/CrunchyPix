'use client';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { generateSpans } from './GenerateSpans';
import { generateSpanType } from '@/types/common.types';

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
  reverseDelay = 150,
}: TypingTextProps & generateSpanType) => {
  const [displayText, setDisplayText] = useState('');
  const [isDelayed, setIsDelayed] = useState(true);
  const [isWriting, setIsWriting] = useState(true);
  const [charIndex, setCharIndex] = useState(0);

  const handleTyping = useCallback(() => {
    if (isWriting && !isDelayed) {
      if (charIndex < text.length) {
        setDisplayText((prev) => prev + text[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (!loadingMode) {
        setIsWriting(false);
      } else {
        setTimeout(() => setIsWriting(false), reverseDelay);
      }
    } else if (loadingMode && !isWriting) {
      if (charIndex > 0) {
        setDisplayText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setTimeout(() => setIsWriting(true), reverseDelay);
      }
    }
  }, [isWriting, isDelayed, charIndex, text, reverseDelay, loadingMode]);

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
    if (!isWriting && !loadingMode && charIndex === text.length) {
      setDisplayText(text);
    }
  }, [text, isWriting, loadingMode, charIndex]);

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
};

export default memo(TypingText);
