"use client";
import { slide } from "@/app/common.types";
import React from "react";
import PhoneFrame from "./PhoneFrame/PhoneFrame";
import FullScreenSlider from "../../Slider/FullScreenSlider/FullScreenSlider";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ResponsiveSect = () => {
  const rotateStart = useSelector(
    (state: RootState) => state.rotateChange.rotateStart
  );
  const rotateEnd = useSelector(
    (state: RootState) => state.rotateChange.rotateEnd
  );
  const sampleSlides: slide[] = [
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/landingH.jpg"
        : "/PhoneSlides/landingV.jpg",
      title: "Landing",
      description: "",
    },
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/aboutMeH.jpg"
        : "/PhoneSlides/aboutMeV.jpg",
      title: "About Me",
      description: "",
    },
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/portfolioH.jpg"
        : "/PhoneSlides/portfolioV.jpg",
      title: "Portfolio",
      description: "",
    },
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/mintingUiH.jpg"
        : "/PhoneSlides/mintingUiV.jpg",
      title: "Minting UI",
      description: "",
    },
  ];

  return (
    <div className="flex flex-row items-center w-full h-full pl-20 gap-40">
      <div className={`flex flex-wrap gap-10 p-6 w-auto h-auto`}>
        <div
          className={`flex flex-wrap items-center justify-center h-[600px] z-10 ${
            rotateStart ? "w-[600px]" : "w-[300px] "
          } transition-all ease-in-out duration-500`}
        >
          <PhoneFrame>
            <FullScreenSlider
              slides={sampleSlides}
              className="w-full h-full object-cover rounded-[42px]"
            />
          </PhoneFrame>
        </div>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-end p-20  bg-cool-gray-900"></div>
    </div>
  );
};

export default ResponsiveSect;
