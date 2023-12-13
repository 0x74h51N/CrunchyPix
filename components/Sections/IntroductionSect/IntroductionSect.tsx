"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { slideIn, textVariant } from "@/utils/motion";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import Image from "next/image";
import CardMaker from "../../CardMaker";
import { generateSpans } from "@/components/GenerateSpans";
import { introductionCards } from "@/constants/introductionCards";

const IntroductionSect = () => {
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
    <div className="flex flex-row items-center justify-center max-2xl:gap-10 lg-gap-auto h-auto  p-16 max-md:px-1 bg-cool-gray-800 rounded-3xl gap-12 max-sm:flex-col max-lg:gap-6 max-lg:items-start max-sm:items-center">
      <Image
        src="/headColor.png"
        alt="Photo"
        width={250}
        height={250}
        loading="lazy"
        className="object-center bg-opacity-0 grayscale max-lg:w-[230px] max-sm:w-[210px] h-auto z-30"
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        className="flex flex-col items-start h-full w-auto p-5 z-10"
      >
        <motion.h1 variants={slideIn("left", "spring", 0.5, 1)}>
          <div className="h2">
            {isMobile || isTablet
              ? t("introduction.intro")
              : generateSpans({
                  text: t("introduction.intro"),
                  colorType: "vibrantColors",
                  zeroColor: "#737373",
                })}
          </div>
          <div className="h1">
            {isMobile || isTablet
              ? t("introduction.title")
              : generateSpans({
                  text: t("introduction.title"),
                  colorType: "vibrantColors",
                })}
          </div>
        </motion.h1>
        <motion.p variants={textVariant(1)} className="mt-4 p max-w-3xl ">
          {t("introduction.description")}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default IntroductionSect;
