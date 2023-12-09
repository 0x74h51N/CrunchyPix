"use client";
import { slide } from "@/app/common.types";
import React, { useEffect, useMemo } from "react";
import FullScreenSlider from "../../Slider/FullScreenSlider/FullScreenSlider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import { polygonIn, slideIn, textVariant } from "@/utils/motion";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { useTranslation } from "react-i18next";
import { generateSpans } from "@/components/GenerateSpans";
import PhoneFrame from "@/components/Frames/PhoneFrame/PhoneFrame";
import { phoneSlides } from "@/constants/phoneSlides";

const DesignSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const dispatch = useDispatch();
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const rotateStart = useSelector(
    (state: RootState) => state.rotateChange.rotateStart
  );
  const rotateEnd = useSelector(
    (state: RootState) => state.rotateChange.rotateEnd
  );
  const slides = useMemo(() => {
    return phoneSlides.map((slide: slide) => ({
      imageUrl: rotateEnd ? slide.imageUrlH : slide.imageUrlV,
      title: slide.title,
      description: slide.description,
    }));
  }, [rotateEnd]);
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
  const imageWidth = isMobile ? 110 : 148;
  const imageHeight = isMobile ? 110 : 148;
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some" }}
      className="flex xl:flex-row flex-col-reverse justify-center items-center w-full h-full 2xl:pl-20 xl:pl-4 2xl:gap-[100px] xl:gap-24 gap-4 "
    >
      <div className={`flex flex-wrap gap-10 p-6 w-auto h-auto`}>
        <div
          className={`flex flex-wrap items-center justify-center h-[600px] z-10 ${
            rotateStart ? "w-[800px]" : "w-[500px] "
          } transition-all ease-in-out duration-500`}
        >
          <motion.div variants={slideIn("left", "spring", 0.5, 0.5)}>
            <PhoneFrame>
              <FullScreenSlider
                slides={slides}
                className={`w-full h-full object-cover ${
                  isMobile ? "rounded-2xl" : "rounded-[42px]"
                }`}
              />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={slideIn("right", "spring", 0.5, 0.5)}
        className="flex flex-col h-auto xl:min-h-[700px] xl:items-end justify-center items-center 2xl:p-20 lg:p-14 md:p-10 max-sm:px-4 p-8 bg-cool-gray-800 xl:rounded-l-3xl "
      >
        <motion.h2
          variants={polygonIn("up", "spring", 1, 1)}
          className="w-full font-medium lg:text-[22px] sm:text-[20px] text-[18px] lg:leading-[40px] text-cool-gray-400 xl:text-right text-left"
        >
          {isMobile || isTablet
            ? t("designSect.title2")
            : generateSpans({
                text: t("designSect.title2"),
                colorType: "vibrantColors",
                zeroColor: "#737373",
              })}
        </motion.h2>
        <motion.h1
          variants={polygonIn("down", "spring", 1, 1)}
          className="w-full font-black text-cool-gray-50 md:text-[50px] sm:text-[40px] xs:text-[35px] text-[25px] leading-relaxed xl:text-right text-left"
        >
          {isMobile || isTablet
            ? t("designSect.title")
            : generateSpans({
                text: t("designSect.title"),
                colorType: "vibrantColors",
              })}
        </motion.h1>
        <motion.div
          variants={textVariant(1)}
          className={`text-cool-gray-200 font-medium lg:text-[16px] sm:text-[14px] text-[12px] ml-0 w-full 2xl:w-3/4 xl:pl-16 pl-0 xl:leading-[30px] xl:text-right text-left`}
        >
          <motion.p>{t("designSect.description")}</motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DesignSect;
