"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "@/utils/motion";
import { robustSections } from "@/constants/robustSections";
import RobustSection from "../Robust";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import Image from "next/image";

const AboutMeSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const dispatch = useDispatch();
  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-center max-2xl:gap-10 lg-gap-auto h-auto min-h-[100svh] ">
      <div className="flex flex-row gap-12 max-sm:flex-col max-lg:gap-6 max-lg:items-start max-sm:items-center items-end justify-center w-auto h-auto">
        <Image
          src="/headColor.png"
          alt="Photo"
          width={280}
          height={280}
          loading="lazy"
          className="object-center bg-opacity-0 grayscale max-lg:w-[240px] max-sm:w-[220px] h-auto z-30"
        />
        <motion.div
          variants={staggerContainer(2, 0.5)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-start h-full w-auto p-5 z-10"
        >
          <motion.h1 variants={slideIn("left", "spring", 0.2, 1.6)}>
            <div className="text-cool-gray-200 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
              {t("introduction.intro")}
            </div>
            <div className="text-cool-gray-50 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
              {t("introduction.title")}
            </div>
          </motion.h1>
          <motion.p
            variants={textVariant(0.8)}
            className="mt-4 text-cool-gray-50 lg:text-[17px] sm:text-[14px] text-[13px] max-w-3xl leading-[30px]"
          >
            {t("introduction.description")}
          </motion.p>
        </motion.div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className=" flex flex-wrap justify-center gap-10 w-auto p-8 max-xs:px-2 max-2xl:max-w-[700px]">
          <RobustSection robustSections={robustSections} />
        </div>
      </div>
    </div>
  );
};

export default AboutMeSect;
