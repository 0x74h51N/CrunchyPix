"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type TypingTextProps = {
  text: string;
  _code?: boolean;
  textClass?: string;
  delay?: number;
};

const TypingText: React.FC<TypingTextProps> = ({
  text,
  _code = true,
  textClass = "text",
  delay = 0,
}) => {
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
    }, 100);

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
      ) : (
        <div className={textClass}>{displayText}</div>
      )}
    </div>
  );
};

export default TypingText;
