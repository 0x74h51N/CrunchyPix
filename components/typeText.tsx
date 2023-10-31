import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");

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
      {" "}
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
    </div>
  );
};

export default TypingText;
