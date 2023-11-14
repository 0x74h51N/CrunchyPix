"use client";
import React from "react";
import Robust from "../Robust";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import { useTranslation } from "react-i18next";

const AboutMeSect = () => {
  const { t } = useTranslation(["translation"]);
  return (
    <div className="flex flex-col items-center justify-center max-2xl:gap-10 lg-gap-auto h-auto min-h-screen max-w-[80vw] pt-14">
      <div className="flex flex-col items-start w-full px-8 ">
        <motion.div variants={textVariant(0)}>
          <p className="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
            {t("introduction.intro")}
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            {t("introduction.title")}
          </h2>
        </motion.div>

        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-white lg:text-[17px] text-[14px] max-w-3xl leading-[30px]"
        >
          {t("introduction.description")}
        </motion.p>
      </div>
      <div className="flex flex-wrap gap-10 ">
        <Robust />
      </div>
    </div>
  );
};

export default AboutMeSect;
