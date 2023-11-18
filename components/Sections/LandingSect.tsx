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
import LoadingComponent from "../Loading";

const LandingSect = () => {
  const { t } = useTranslation(["translation"]);

  return (
    <div className="flex flex-center justify-center h-screen w-full ">
      <div className="absolute inset-0 z-0">
        <ParticlesBack />
      </div>
      <div className="h-full w-full flex flex-row max-md:flex-col md:gap-10 gap-0 m-10 justify-center max-md:m-8 items-center z-10">
        <Tilt
          options={{
            transition: true,
            speed: 50,
            scale: 1.05,
            max: 25,
          }}
        >
          <ColorfulBorder className="rounded-[100px] max-xs:rounded-[60px]">
            <Image
              src="/head.png"
              alt="Photo"
              layout="filled"
              width={320}
              height={320}
              objectFit="cover"
              loading="eager"
              className="object-center rounded-[100px] bg-opacity-0 grayscale max-md:w-[240px] max-sm:w-[215px] max-xs:w-[180px] max-xs:rounded-[60px] h-auto"
            />
          </ColorfulBorder>
        </Tilt>
        <div className="flex flex-col m-8">
          <motion.div variants={textVariant(0)}>
            <p className="text-[#baaeff] font-medium lg:text-[40px] sm:text-[30px] xs:text-[20px] text-[16px] lg:leading-[40px]">
              {generateSpans(t("landing.intro"))}
            </p>
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-4 text-white lg:text-[25px] text-[15px] max-w-3xl leading-[30px]"
            >
              {generateSpans(t("landing.description"))}
            </motion.p>
            <h1 className="text-white font-black md:text-[65x] sm:text-[55px] xs:text-[45px] text-[35px] max-w-2xl">
              {generateSpans(t("landing.title"))}
            </h1>
            <h1 className="text-white font-black md:text-[55px] sm:text-[45px] xs:text-[35px] text-[25px]">
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
