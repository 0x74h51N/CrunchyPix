"use client";
import { codeString } from "@/constants/codeString";
import React, { useEffect, useState } from "react";
import TypingText from "../../typeText";
import MonitorFrame from "@/components/Frames/MonitorFrame/MonitorFrame";
import { generateSpans } from "@/components/GenerateSpans";
import {
  staggerContainer,
  polygonIn,
  textVariant,
  slideIn,
} from "@/utils/motion";
import { motion } from "framer-motion";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const [isInView, setIsInView] = useState(false);
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const dispatch = useDispatch();
  const [lineHeight, setLineHeight] = useState<string>("");
  const [fontSize, setFontSize] = useState<string>("");
  useEffect(() => {
    if (screenWidth >= 1535) {
      setLineHeight("1.35");
      setFontSize("0.75em");
    } else if (screenWidth >= 1280) {
      setLineHeight("1.3");
      setFontSize("0.7em");
    } else if (screenWidth >= 1024) {
      setLineHeight("1.25");
      setFontSize("0.650em");
    } else {
      setLineHeight("1.25");
      setFontSize("0.6em");
    }
  }, [screenWidth]);

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
  ];
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      onViewportEnter={() => handleInViewChange(true)}
      onViewportLeave={() => handleInViewChange(false)}
      viewport={{ once: true, amount: 0.38 }}
      className="flex 2xl:flex-row flex-col items-center w-full h-full 2xl:pr-20 xl:pr-4 2xl:gap-20 xl:gap-14 gap-6"
    >
      <motion.div
        variants={slideIn("left", "spring", 0.5, 0.5)}
        className="flex flex-col w-full justify-center items-end 2xl:p-20 lg:p-14 md:p-10 xs:p-6 p-4 h-auto 2xl:min-h-[600px] bg-cool-gray-800 xl:rounded-r-3xl"
      >
        <motion.h2
          variants={polygonIn("up", "spring", 0.5, 1)}
          className="w-full font-medium lg:text-[22px] sm:text-[20px] text-[18px] lg:leading-[40px] text-cool-gray-400 text-left"
        >
          {isMobile || isTablet
            ? t("codeSect.title2")
            : generateSpans({
                text: t("codeSect.title2"),
                colorType: "vibrantColors",
                zeroColor: "#737373",
              })}
        </motion.h2>
        <motion.h1
          variants={polygonIn("down", "spring", 0.5, 1)}
          className="w-full font-black text-cool-gray-50 md:text-[50px] sm:text-[40px] xs:text-[35px] text-[25px] leading-relaxed text-left"
        >
          {isMobile || isTablet
            ? t("codeSect.title")
            : generateSpans({
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
            {isMobile ? (
              <SyntaxHighlighter
                language="typescript"
                style={vscDarkPlus}
                showLineNumbers
                customStyle={{
                  backgroundColor: "transparent",
                  opacity: "1",
                  overflow: "hidden",
                  lineHeight: lineHeight,
                  fontSize: fontSize,
                }}
                codeTagProps={{
                  style: {
                    lineHeight: "inherit",
                    fontSize: "inherit",
                  },
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            ) : (
              isInView && (
                <TypingText
                  text={codeString}
                  typingSpeed={15}
                  lineHeight={lineHeight}
                  fontSize={fontSize}
                />
              )
            )}
          </div>
        </MonitorFrame>
      </div>
    </motion.div>
  );
};

export default CodeSect;
