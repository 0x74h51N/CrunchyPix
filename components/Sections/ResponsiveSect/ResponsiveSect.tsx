"use client";
import { slide } from "@/app/common.types";
import React, { useEffect } from "react";
import FullScreenSlider from "../../Slider/FullScreenSlider/FullScreenSlider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { motion } from "framer-motion";
import {
  polygonIn,
  slideIn,
  staggerContainer,
  textVariant,
} from "@/utils/motion";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { useTranslation } from "react-i18next";
import { generateSpans } from "@/components/GenerateSpans";
import PhoneFrame from "@/components/Frames/PhoneFrame/PhoneFrame";

const ResponsiveSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const dispatch = useDispatch();

  const rotateStart = useSelector(
    (state: RootState) => state.rotateChange.rotateStart
  );
  const rotateEnd = useSelector(
    (state: RootState) => state.rotateChange.rotateEnd
  );
  const sampleSlides: slide[] = [
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/landingH.jpg"
        : "/PhoneSlides/landingV.jpg",
      title: "Landing",
      description: "",
    },
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/aboutMeH.jpg"
        : "/PhoneSlides/aboutMeV.jpg",
      title: "About Me",
      description: "",
    },
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/portfolioH.jpg"
        : "/PhoneSlides/portfolioV.jpg",
      title: "Portfolio",
      description: "",
    },
    {
      imageUrl: rotateEnd
        ? "/PhoneSlides/mintingUiH.jpg"
        : "/PhoneSlides/mintingUiV.jpg",
      title: "Minting UI",
      description: "",
    },
  ];
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

  const description = [
    "responsiveSect.description.0",
    "responsiveSect.description.1",
    "responsiveSect.description.2",
  ];
  return (
    <motion.div
      variants={staggerContainer(6, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      className="flex xl:flex-row flex-col-reverse items-center w-full h-full 2xl:pl-20 xl:pl-4 2xl:gap-[200px] xl:gap-24 gap-4"
    >
      <div className={`flex flex-wrap gap-10 p-6 w-auto h-auto`}>
        <div
          className={`flex flex-wrap items-center justify-center h-[600px] z-10 ${
            rotateStart ? "w-[600px]" : "w-[300px] "
          } transition-all ease-in-out duration-500`}
        >
          <motion.div variants={slideIn("left", "spring", 0.5, 0.5)}>
            <PhoneFrame>
              <FullScreenSlider
                slides={sampleSlides}
                className="w-full h-full object-cover rounded-[42px]"
              />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={slideIn("right", "spring", 0.5, 0.5)}
        className="flex flex-col h-auto 2xl:min-h-[600px] justify-center items-end 2xl:p-20 lg:p-16 md:p-12 xs:p-8 p-4 bg-cool-gray-800 xl:rounded-l-3xl"
      >
        <motion.h2
          variants={polygonIn("up", "spring", 1, 1)}
          className="w-full font-medium lg:text-[22px] sm:text-[20px] text-[18px] lg:leading-[40px] text-cool-gray-400 xl:text-right text-left"
        >
          {generateSpans({
            text: t("responsiveSect.title2"),
            colorType: "vibrantColors",
            zeroColor: "#737373",
          })}
        </motion.h2>
        <motion.h1
          variants={polygonIn("down", "spring", 1, 1)}
          className="w-full font-black md:text-[50px] sm:text-[40px] xs:text-[35px] text-[25px] leading-relaxed xl:text-right text-left"
        >
          {generateSpans({
            text: t("responsiveSect.title"),
            colorType: "vibrantColors",
          })}
        </motion.h1>
        <motion.div
          variants={textVariant(1)}
          className={`text-cool-gray-200 font-medium lg:text-[16px] sm:text-[14px] text-[12px] ml-0 w-full ${
            rotateStart ? "2xl:ml-20 xl:ml-4" : " 2xl:ml-36 xl:ml-6"
          } xl:leading-[30px] xl:text-right text-left`}
        >
          {description.map((paragraph, index) => (
            <motion.p key={index}>
              {t(paragraph)}
              <br />
              <br />
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResponsiveSect;
