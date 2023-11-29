"use client";
import { slide } from "@/app/common.types";
import React from "react";
import ContactSlide from "../Slider/FullScreenSlider/Childeren/ContactSlide";
import PhoneFrame from "../PhoneFrame";
import FullScreenSlider from "../Slider/FullScreenSlider/FullScreenSlider";

const ResponsiveSect = () => {
  const sampleSlides: slide[] = [
    {
      imageUrl: "",
      title: "",
      description: "",
    },
    {
      imageUrl: "",
      title: "",
      description: "",
    },
    {
      title: "",
      description: "",
    },
  ];
  return (
    <div className="flex flex-row items-center w-full h-full pl-20 gap-40">
      <div className="p-6">
        <PhoneFrame>
          <FullScreenSlider
            slides={sampleSlides}
            className="w-full h-full object-cover rounded-[42px]"
          />
        </PhoneFrame>
      </div>
      <div className="flex flex-col w-full h-full justify-center items-end p-20  bg-cool-gray-900"></div>
    </div>
  );
};

export default ResponsiveSect;
