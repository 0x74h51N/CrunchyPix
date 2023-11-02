import React, { useEffect } from "react";
import TypingText from "../typeText";
import ArrowButton from "../Button";

const Portfolio = () => {
  const codeString = `import React from "react";
  import TypingText from "../typeText";
  import ArrowButton from "../Button";
  
  const Portfolio = () => {
    
    return (
      <div className="h-screen flex flex-row items-center justify-center bg-zinc-700">
        <div className="flex flex-col items-start justify-center w-4/5 h-full">
          <div className="flex flex-col items-center justify-center h-full w-full ">
            Text
          </div>
          <div className="flex flex-row items-start  ml-4 mb-4 gap-2">
            <div className="rotate-180">
              <ArrowButton
                index={2}
                arrow={true}
                className="flex flex-row  opacity-50 hover:opacity-100 transition-opacity rounded-full shadow-lg hover:animate-bounce"
              />
            </div>
            <ArrowButton
              index={0}
              arrow={true}
              className="flex flex-row  opacity-50 hover:opacity-100 transition-opacity rounded-full shadow-lg hover:animate-bounce"
            />
          </div>
        </div>
        <div className="box flex flex-col items-start justify-start bg-neutral-900 h-full p-4  shadow-md shadow-black ml-auto overflow-auto w-1/5">
          <div className="mt-16 h-full">
            <TypingText text={codeString}></TypingText>
          </div>
        </div>
      </div>
    );
  };
  
  export default Portfolio;    
  `;

  return (
    <div className="h-screen flex flex-row items-center justify-center bg-zinc-700">
      <div className="flex flex-col items-start justify-center w-4/5 h-full">
        Text
      </div>
      <div className="box flex flex-col items-start justify-start bg-neutral-900 h-full p-4  shadow-md shadow-black ml-auto overflow-auto w-1/5">
        <div className="mt-16 h-full">
          <TypingText text={codeString}></TypingText>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
