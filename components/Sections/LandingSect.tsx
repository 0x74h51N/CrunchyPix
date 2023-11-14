"use client";
import React from "react";
import ParticlesBack from "../ParticlesBack/ParticlesBack";
import ArrowButton from "../ArrowButton";

const LandingSect = () => {
  return (
    <div className="flex flex-center justify-center h-screen w-full ">
      <div className="absolute inset-0 z-0">
        <ParticlesBack />
      </div>

      <div className="absolute bottom-0 w-full flex justify-center items-center z-30">
        <ArrowButton
          index={1}
          arrow={true}
          className="opacity-50 hover:opacity-100 transition-opacity animate-my-bounce-slow z-10"
        />
      </div>
    </div>
  );
};
export default LandingSect;
