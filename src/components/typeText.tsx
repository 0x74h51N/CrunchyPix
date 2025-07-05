'use client';
import React, { memo, useEffect, useState } from 'react';
import { generateSpans } from './GenerateSpans';
import { generateSpanType } from '@/lib/types/common.types';

type TypingTextProps = {
  text: string;
  typingSpeed?: number;
  textClass?: string;
  delay?: number;
  generateSpan?: boolean;
  loadingMode?: boolean;
  reverseDelay?: number;
};

/**
 * TypingText Component
 *
 * This component simulates a typing effect by incrementally displaying the given text string.
 * It can also simulate a "loading mode" where the text is typed out, then deleted in reverse, and retyped in a loop.
 *
 * @param text - The text to be displayed with the typing effect.
 * @param typingSpeed - The speed (in milliseconds) at which each character is typed. Default is 50ms.
 * @param textClass - An optional CSS class for styling the text.
 * @param delay - An optional delay (in milliseconds) before typing starts. Default is 100ms.
 * @param generateSpan - If true, wraps each character in a span element, allowing for additional styling.
 * @param loadingMode - If true, the component enters a loop where the text is typed out and then deleted in reverse.
 * @param reverseDelay - The delay (in milliseconds) between finishing typing and starting to delete the text in loading mode. Default is 150ms.
 *
 * @returns A React component that renders the text with a typing animation. If generateSpan is true, the text is wrapped in span elements.
 */
const TypingText = ({
  text,
  typingSpeed = 50,
  textClass,
  delay = 100,
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

  useEffect(() => {
    setDisplayText('');
    setCharIndex(0);
    setIsWriting(true);
    setIsDelayed(true);
  }, [text, loadingMode]);

  useEffect(() => {
    const id = setTimeout(() => setIsDelayed(false), delay);
    return () => clearTimeout(id);
  }, [delay]);

  useEffect(() => {
    if (isDelayed) return;
    let timeoutId: ReturnType<typeof setTimeout>;

    const run = () => {
      if (isWriting) {
        if (charIndex < text.length) {
          setDisplayText(text.slice(0, charIndex + 1));
          setCharIndex((idx) => idx + 1);
          timeoutId = setTimeout(run, typingSpeed);
        } else if (loadingMode) {
          timeoutId = setTimeout(() => setIsWriting(false), reverseDelay);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(text.slice(0, charIndex - 1));
          setCharIndex((idx) => idx - 1);
          timeoutId = setTimeout(run, typingSpeed);
        } else {
          timeoutId = setTimeout(() => setIsWriting(true), reverseDelay);
        }
      }
    };

    timeoutId = setTimeout(run, typingSpeed);
    return () => clearTimeout(timeoutId);
  }, [
    charIndex,
    isWriting,
    isDelayed,
    text,
    typingSpeed,
    loadingMode,
    reverseDelay,
  ]);

  if (generateSpan) {
    return (
      <div className={textClass}>
        {generateSpans({
          text: displayText,
          colorType,
          randomCount,
          zeroColor,
        })}
      </div>
    );
  }

  return <span className={textClass}>{displayText}</span>;
};

export default memo(TypingText);
