"use client";
import { codeString } from "@/constants/codeString";
import React, { useEffect, useState } from "react";
import TypingText from "../../typeText";
import MonitorFrame from "@/components/Frames/MonitorFrame/MonitorFrame";
import { generateSpans } from "@/components/GenerateSpans";
import { staggerContainer, polygonIn, textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

const CodeSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const [isInView, setIsInView] = useState(false);
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
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

  const handleInViewChange = (inView: boolean) => {
    setIsInView(inView);
  };

  const description = [
    "codeSect.description.0",
    "codeSect.description.1",
    "codeSect.description.2",
    "codeSect.description.3",
  ];
  return (
    <div className="flex 2xl:flex-row flex-col items-center w-full h-full 2xl:pr-20 xl:pr-4 2xl:gap-28 xl:gap-14 gap-6">
      <motion.div
        variants={staggerContainer(4, 0)}
        initial="hidden"
        whileInView="show"
        onViewportEnter={() => handleInViewChange(true)}
        onViewportLeave={() => handleInViewChange(false)}
        viewport={{ once: true, amount: 0.5 }}
        className="flex flex-col w-full justify-center items-end py-8 2xl:px-20  lg:px-14 md:px-10 xs:p-6 p-4 h-auto 2xl:min-h-[600px] bg-cool-gray-800 xl:rounded-r-3xl"
      >
        <motion.h2
          variants={polygonIn("up", "spring", 0.5, 1)}
          className="w-full font-medium lg:text-[22px] sm:text-[20px] text-[18px] lg:leading-[40px] text-cool-gray-400 text-left"
        >
          {generateSpans({
            text: t("codeSect.title2"),
            colorType: "vibrantColors",
            zeroColor: "#737373",
          })}
        </motion.h2>
        <motion.h1
          variants={polygonIn("down", "spring", 0.5, 1)}
          className="w-full font-black md:text-[50px] sm:text-[40px] xs:text-[35px] text-[25px] leading-relaxed text-left"
        >
          {generateSpans({
            text: t("codeSect.title"),
            colorType: "vibrantColors",
          })}
        </motion.h1>
        <motion.div
          variants={textVariant(0.5)}
          className={`text-cool-gray-200 font-medium lg:text-[16px] sm:text-[14px] text-[12px] xl:leading-[30px] text-left`}
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
      <div>
        <MonitorFrame>
          <div className="h-full w-full overflow-scroll overflow-x-scroll scrollbar-thin scrollbar-thumb scrollbar-track">
            {isInView && (
              <TypingText
                text={codeString}
                duration={10}
                fontSize={
                  screenWidth >= 1535
                    ? "0.75em"
                    : screenWidth >= 1280
                    ? "0.7em"
                    : screenWidth >= 1024
                    ? "0.65em"
                    : "0.58em"
                }
                lineHeight={
                  screenWidth >= 1535
                    ? "1.5"
                    : screenWidth >= 1280
                    ? "1.35"
                    : screenWidth >= 1024
                    ? "1.2"
                    : "1"
                }
              />
            )}
          </div>
        </MonitorFrame>
      </div>
    </div>
  );
};

export default CodeSect;
