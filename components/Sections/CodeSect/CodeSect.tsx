"use client";
import React, { useEffect, useState } from "react";
import MonitorFrame from "@/components/Frames/MonitorFrame/MonitorFrame";
import { generateSpans } from "@/components/GenerateSpans";
import { textVariant, slideIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { RootState } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { codeString } from "@/constants/codeString";
import { scrollState } from "@/store/redux/isScrollEnabled";
import { useTranslation } from "react-i18next";

const CodeSect = () => {
  const { t, i18n } = useTranslation("home");
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const isScrollEnabled = useSelector(
    (state: RootState) => state.isScrollEnabled.enabled
  );
  const dispatch = useDispatch();
  const [lineHeight, setLineHeight] = useState<string>(() => {
    return "";
  });
  const [fontSize, setFontSize] = useState<string>(() => {
    return "";
  });
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
    } else if (screenWidth >= 768) {
      setLineHeight("1.25");
      setFontSize("0.6em");
    } else {
      setLineHeight("1.25");
      setFontSize("0.4em");
    }
  }, [screenWidth]);

  const scrollHandlerEnter = () => {
    if (isScrollEnabled) {
      dispatch(scrollState(false));
    }
  };
  const scrollHandlerLeave = () => {
    if (!isScrollEnabled) {
      dispatch(scrollState(true));
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "some" }}
      className="flex 2xl:flex-row flex-col items-center 2xl:justify-between justify-center w-full h-full 2xl:pr-20 pr-0 2xl:gap-20 xl:gap-14 gap-6"
    >
      <motion.div
        variants={slideIn("left", "spring", 0.5, 0.5)}
        className="flex flex-col w-full 2xl:max-w-[1000px] justify-center items-end 2xl:p-20 lg:p-14 md:p-10 max-sm:px-4 p-8 h-auto 2xl:min-h-[700px] bg-cool-gray-800 2xl:rounded-r-3xl"
      >
        <h2 className="w-full max-xs:w-2/3 max-xs:self-start font-medium lg:text-[22px] sm:text-[20px] text-[14px] lg:leading-[40px] text-cool-gray-300 text-left ">
          {isMobile || isTablet
            ? t("codeSect.title2")
            : generateSpans({
                text: t("codeSect.title2"),
                colorType: "vibrantColors",
                zeroColor: "#737373",
              })}
        </h2>
        <h1 className="w-full font-black text-cool-gray-50 md:text-[50px] sm:text-[40px] xs:text-[35px] text-[22px] leading-relaxed text-left">
          {isMobile || isTablet
            ? t("codeSect.title")
            : generateSpans({
                text: t("codeSect.title"),
                colorType: "vibrantColors",
              })}
        </h1>
        <div
          className={`text-cool-gray-200 font-medium lg:text-[16px] sm:text-[14px] text-[12px] xl:w-4/5 self-start xl:leading-[30px] text-left`}
        >
          <motion.p variants={textVariant(1)}>
            {t("codeSect.description")}
          </motion.p>
        </div>
      </motion.div>
      <motion.div variants={slideIn("right", "spring", 0.5, 0.5)}>
        <MonitorFrame>
          <div
            onMouseEnter={scrollHandlerEnter}
            onMouseLeave={scrollHandlerLeave}
            className="h-full w-full overflow-scroll scrollbar-thumb scrollbar-track cursor-none bg-cool-gray-800"
          >
            <SyntaxHighlighter
              language="typescript"
              showLineNumbers
              useInlineStyles={true}
              style={vscDarkPlus}
              customStyle={{
                backgroundColor: "transparent",
                opacity: "1",
                overflow: "scroll",
                cursor: "none",
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
          </div>
        </MonitorFrame>
      </motion.div>
    </motion.div>
  );
};

export default CodeSect;
