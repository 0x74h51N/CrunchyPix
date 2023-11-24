"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "@/utils/motion";
import { robustSections } from "@/constants";
import RobustSection from "../Robust";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import Image from "next/image";
import { Tilt } from "react-tilt";

const AboutMeSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobileRedux = useSelector(
    (state: RootState) => state.isMobile.mobile
  );
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
      <div className="flex flex-row gap-12 max-sm:flex-col max-lg:gap-6 max-lg:items-start max-xs:items-center items-end justify-center w-auto h-auto">
        <Image
          src="/headColor.png"
          alt="Photo"
          layout="filled"
          width={280}
          height={280}
          objectFit="cover"
          loading="lazy"
          className="object-center bg-opacity-0 grayscale max-lg:w-[240px] max-sm:w-[200px] h-auto"
        />
        <div className="flex flex-col items-start h-full w-auto p-5">
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
            className="mt-4 text-white lg:text-[17px] sm:text-[14px] text-[13px] max-w-3xl leading-[30px]"
          >
            {t("introduction.description")}
          </motion.p>
        </div>
      </div>
      <div className="flex flex-wrap gap-10">
        <div className=" flex flex-wrap justify-center gap-10 w-full p-8 max-xs:px-2 max-2xl:max-w-[700px]">
          {robustSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: index * 0.3 }}
              viewport={{ once: true, amount: 0.25 }}
            >
              {isMobileRedux ? (
                <RobustSection {...section} />
              ) : (
                <Tilt>
                  <RobustSection {...section} />
                </Tilt>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMeSect;
