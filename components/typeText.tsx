"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { generateSpans } from "./GenerateSpans";
import { generateSpanType } from "@/app/common.types";

type TypingTextProps = {
  text: string;
  typingSpeed?: number;
  _code?: boolean;
  textClass?: string;
  delay?: number;
  generateSpan?: boolean;
  fontSize?: string;
  lineHeight?: string;
};

const TypingText = ({
  text,
  typingSpeed = 50,
  _code = true,
  textClass,
  delay = 0,
  generateSpan = false,
  colorType,
  randomCount,
  zeroColor,
  fontSize,
  lineHeight,
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
    }, typingSpeed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, isDelayed, typingSpeed]);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsDelayed(true);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
    };
  }, [delay]);

  const content = useMemo(() => {
    if (_code) {
      return (
        <div className={textClass}>
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            showLineNumbers
            wrapLines
            customStyle={{
              backgroundColor: "transparent",
              opacity: "1",
              overflow: "hidden",
              lineHeight: lineHeight,
              fontSize: fontSize,
            }}
            codeTagProps={{
              style: {
                lineHeight: "inherit",
                fontSize: "inherit",
              },
            }}
          >
            {displayText}
          </SyntaxHighlighter>
        </div>
      );
    } else if (generateSpan) {
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
      return <div className={textClass}>{displayText}</div>;
    }
  }, [displayText]);

  return <>{content}</>;
};

export default TypingText;
