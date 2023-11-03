import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import PixHighlight from "./PixHighlight";

type TypingText = {
  text: string;
  _code?: boolean;
  textClass?: string;
};

const TypingText = ({ text, _code = true, textClass = "text" }: TypingText) => {
  const [displayText, setDisplayText] = useState("");
  const pixIndex = text.indexOf("Pix");

  useEffect(() => {
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayText(text.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

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
        <div className={textClass}>
          <PixHighlight>{displayText}</PixHighlight>
        </div>
      )}
    </div>
  );
};

export default TypingText;
