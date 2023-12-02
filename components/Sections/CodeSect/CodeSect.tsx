"use client";
import { codeString } from "@/constants/codeString";
import React from "react";
import MonitorFrame from "../../MonitorFrame";
import TypingText from "../../typeText";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeSect = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full pr-16 gap-32">
      <div className="flex flex-col w-full h-full justify-center items-end p-20  bg-cool-gray-800"></div>
      <div>
        <MonitorFrame>
          <div className="h-full w-full overflow-scroll overflow-x-scroll scrollbar-thin scrollbar-thumb scrollbar-track">
            {/* <TypingText text= duration={10} /> */}
            <SyntaxHighlighter
              language="typescript"
              style={vscDarkPlus}
              customStyle={{
                backgroundColor: "transparent",
                opacity: "1",
                overflow: "hidden",
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </MonitorFrame>
      </div>
    </div>
  );
};

export default CodeSect;
