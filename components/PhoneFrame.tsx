import React from "react";
import { Tilt } from "react-tilt";
import FullScreenSlider from "./Slider/FullScreenSlider";

interface PhoneFrameProps {
  screenImage?: string;
  children?: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ screenImage, children }) => {
  return (
    <div className="relative w-[300px] h-[600px]">
      <img
        src="/phone.svg"
        alt="Phone Frame"
        className="w-full h-full absolute top-0 left-0 z-10 pointer-events-none"
      />
      <div className="w-full h-full absolute top-0 left-0 overflow-hidden px-2">
        {children}
      </div>
    </div>
  );
};

export default PhoneFrame;
