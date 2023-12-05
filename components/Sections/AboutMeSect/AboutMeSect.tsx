"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "@/utils/motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import Image from "next/image";
import CardMaker from "../../CardMaker";
import { cardSections } from "@/constants/cardSections";
import { generateSpans } from "@/components/GenerateSpans";

const AboutMeSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
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
    <div className="flex flex-col items-center justify-center max-2xl:gap-10 lg-gap-auto h-auto  p-10 xl:pt-2 pb-0 max-md:px-1 bg-cool-gray-800 rounded-3xl">
      <div className="flex flex-row gap-12 max-sm:flex-col max-lg:gap-6 max-lg:items-start max-sm:items-center items-end justify-center w-auto h-auto z-10">
        <Image
          src="/headColor.png"
          alt="Photo"
          width={250}
          height={250}
          loading="lazy"
          className="object-center bg-opacity-0 grayscale max-lg:w-[230px] max-sm:w-[210px] h-auto z-30"
        />
        <motion.div
          variants={staggerContainer(2, 0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-start h-full w-auto p-5 z-10"
        >
          <motion.h1 variants={slideIn("left", "spring", 0.5, 1)}>
            <div className="text-cool-gray-200 font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]">
              {isMobile || isTablet
                ? t("introduction.intro")
                : generateSpans({
                    text: t("introduction.intro"),
                    colorType: "vibrantColors",
                    zeroColor: "#737373",
                  })}
            </div>
            <div className="text-cool-gray-50 font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
              {isMobile || isTablet
                ? t("introduction.title")
                : generateSpans({
                    text: t("introduction.title"),
                    colorType: "vibrantColors",
                  })}
            </div>
          </motion.h1>
          <motion.p
            variants={textVariant(1)}
            className="mt-4 text-cool-gray-50 lg:text-[17px] sm:text-[14px] text-[13px] max-w-3xl leading-[30px]"
          >
            {t("introduction.description")}
          </motion.p>
        </motion.div>
      </div>
      <div className=" flex flex-wrap justify-center gap-10 w-auto p-8 max-xs:px-2 max-2xl:max-w-[700px] z-0">
        <CardMaker cardSections={cardSections} />
      </div>
    </div>
  );
};

export default AboutMeSect;
