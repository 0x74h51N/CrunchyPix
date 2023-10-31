import React from "react";
import CusButton from "../Button";

const AboutMe = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-red-500">
      <h1>About Me</h1>
      <div className="flex flex-row gap-10 items-center mt-4">
        <div className="box box-border h-32 w-32 p-4 border-4">Kutu</div>
        <CusButton
          index={1}
          text="Go to next"
          className="flex flex-row p-6 bg-amber-200 opacity-50 hover:opacity-100 transition-opacity rounded-lg shadow-lg mt-4"
        />
      </div>
    </div>
  );
};

export default AboutMe;
