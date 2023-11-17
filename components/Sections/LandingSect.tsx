"use client";
import React, { useEffect, useState } from "react";
import ParticlesBack from "../ParticlesBack/ParticlesBack";
import ArrowButton from "../ArrowButton";
import Image from "next/image";
import { ColorfulBorder } from "../ColorfulBorder";
import { Tilt } from "react-tilt";
import { textVariant, fadeIn } from "@/utils/motion";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import { generateSpans } from "../DelayedHover";

const LandingSect = () => {
  const { t } = useTranslation(["translation"]);

  return (
    <div className="flex flex-center justify-center h-screen w-full ">
      <div className="absolute inset-0 z-0">
        <ParticlesBack />
      </div>
      <div className="h-full w-full flex flex-row max-md:flex-col m-10 gap-6 max-md:gap-4 justify-center max-md:m-8 max-md:justify-center items-center z-10">
        <Tilt>
          <ColorfulBorder className="rounded-full">
            <Image
              src="/head.png"
              alt="Photo"
              layout="filled"
              width={280}
              height={280}
              objectFit="cover"
              loading="lazy"
              className="object-center rounded-full bg-opacity-0 grayscale max-md:w-[200px] h-auto"
            />
          </ColorfulBorder>
        </Tilt>
        <div className="flex flex-col m-8">
          <motion.div variants={textVariant(0)}>
            <p className="text-[#baaeff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
              {generateSpans(t("landing.intro"))}
            </p>
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-4 text-white lg:text-[17px] text-[14px] max-w-3xl leading-[30px]"
            >
              {generateSpans(t("landing.description"))}
            </motion.p>
            <h1 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl">
              {generateSpans(t("landing.title"))}
            </h1>
            <h1 className="text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[20px]">
              {generateSpans(t("landing.title2"))}
            </h1>
          </motion.div>
        </div>
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
