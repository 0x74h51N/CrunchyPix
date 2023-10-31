import React from "react";
import CusButton from "../Button";

const AboutMe = () => {
  return (
    <div className="h-screen flex flex-row items-center justify-center bg-red-500">
      <h1>About Me</h1>
      <div className="flex flex-row gap-10 items-center mt-4">
        <CusButton
          index={1}
          text="Go to next"
          className="flex flex-row p-6 bg-amber-200 opacity-50 hover:opacity-100 transition-opacity rounded-lg shadow-lg mt-4 hover:animate-bounce"
        />
      </div>
      <div className="box bg-neutral-500 h-full w-80 p-4  shadow-md shadow-black  ml-auto">
        Boxy
      </div>
    </div>
  );
};

export default AboutMe;
