"use client"
import React from "react";
import { RiAlertFill } from "react-icons/ri";
import { CldImage } from "next-cloudinary";

const Construction = () => {
  return (
    <div className="h-screen w-screen relative flex flex-col justify-evenly gap-32">
      <CldImage
        fill
        quality="auto"
        sizes={"100vw"}
        className="w-full h-full object-cover"
        priority
        src={"crunchypix/construction.png"}
        alt={"Under the construction"}
      />
      <h1 className="h1 log mt-12 text-log-col flex flex-col items-center">
        <span>Under</span>
        <span>Construction!..</span>
      </h1>
      <div className="flex lg:flex-row flex-col items-center self-justify-end self-center text-red-800 md:text-[250px] text-[125px]">
        <RiAlertFill /> <h1 className="h1">No Trespassing!</h1>
      </div>
    </div>
  );
};

export default Construction;
