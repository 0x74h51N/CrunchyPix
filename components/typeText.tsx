"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { generateSpans } from "./GenerateSpans";
import { generateSpanType } from "@/app/common.types";

type TypingTextProps = {
  text: string;
  duration?: number;
  _code?: boolean;
  textClass?: string;
  delay?: number;
  generateSpan?: boolean;
};

const TypingText = ({
  text,
  duration = 50,
  _code = true,
  textClass = "text",
  delay = 0,
  generateSpan = false,
  colorType,
  randomCount,
}: TypingTextProps & generateSpanType) => {
  const [displayText, setDisplayText] = useState("");
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (isDelayed && charIndex < text.length) {
        setDisplayText(text.substring(0, charIndex + 1));
        charIndex++;
      } else if (!isDelayed) {
        setDisplayText("");
      } else {
        clearInterval(typingInterval);
      }
    }, duration);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, isDelayed]);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsDelayed(true);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [delay]);

  return (
    <div>
      {_code ? (
        <SyntaxHighlighter
          language="typescript"
          style={vscDarkPlus}
          customStyle={{
            backgroundColor: "transparent",
            opacity: "1",
          }}
        >
          {displayText}
        </SyntaxHighlighter>
      ) : generateSpan ? (
        <div className={textClass}>
          {generateSpans({
            text: displayText,
            colorType: colorType,
            randomCount: randomCount,
          })}
        </div>
      ) : (
        <div className={textClass}>{displayText}</div>
      )}
    </div>
  );
};

export default TypingText;
