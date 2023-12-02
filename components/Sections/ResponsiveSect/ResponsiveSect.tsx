"use client";
import { slide } from "@/app/common.types";
import React from "react";
import PhoneFrame from "../../PhoneFrame";
import FullScreenSlider from "../../Slider/FullScreenSlider/FullScreenSlider";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ResponsiveSect = () => {
  const sampleSlides: slide[] = [
    {
      imageUrl: "/mintingui.jpg",
      title: "",
      description: "",
    },
    {
      imageUrl: "/ccorder.jpg",
      title: "",
      description: "",
    },
    {
      imageUrl: "/crunchypix.jpg",
      title: "",
      description: "",
    },
  ];

  const isRotate = useSelector(
    (state: RootState) => state.rotateChange.isRotate
  );

  return (
    <div className="flex flex-row items-center w-full h-full pl-20 gap-40">
      <div className={`flex flex-wrap gap-10 p-6 w-auto h-auto`}>
        <div
          className={`flex flex-wrap items-center justify-center h-[600px] z-10 ${
            isRotate ? "w-[600px]" : "w-[300px] "
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
