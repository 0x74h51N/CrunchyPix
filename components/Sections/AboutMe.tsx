import React from "react";
import TypingText from "../typeText";
import ArrowButton from "../Button";

const AboutMe = () => {
  return (
    <div className="h-screen flex flex-row items-center justify-center bg-back-col p-5">
      <div className="flex flex-col items-start justify-center h-full w-full">
        <div className="flex flex-col items-center justify-center h-full w-full ">
          Text
        </div>
        <div className="w-full gap-2">
          <div className="rotate-180">
            <ArrowButton
              index={1}
              arrow={true}
              className="fopacity-50 hover:opacity-100 transition-opacity rounded-full shadow-lg hover:animate-bounce"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutMe;
