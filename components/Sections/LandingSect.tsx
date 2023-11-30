"use client";
import ArrowButton from "../ArrowButton";
import { slideIn, staggerContainer, polygonIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { generateSpans } from "../GenerateSpans";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { RootState } from "@/store";
import { SocialIcons } from "../SocialIcons";
import TypingText from "../typeText";
import { socialIcons } from "@/constants/socialIcons";

const LandingSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height
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
    <>
      <motion.div
        variants={staggerContainer(0, 0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className={`anaDiv flex justify-center items-center min-h-[100svh] min-w-[100svw] relative overflow-hidden`}
      >
        <div
          className={`flex flex-row max-lg:flex-col justify-center items-center max-md:m-8 z-0 pb-32 ${
            isMobile ? "pb-[180px]" : ""
          }`}
        >
          <div className="flex flex-col text-center">
            <div
              className={`font-medium lg:text-[40px] sm:text-[30px] text-[25px]`}
            >
              <TypingText
                generateSpan={true}
                _code={false}
                text={t("landing.intro")}
                duration={50}
                colorType="vibrantColors"
                zeroColor="#FFFFFF"
              />
            </div>
            <div className="mt-3 lg:text-[19px] text-[18px] min-w-[219] leading-[30px] max-lg:leading-[10px] whitespace-pre-wrap">
              <TypingText
                generateSpan={true}
                _code={false}
                text={t("landing.description")}
                duration={50}
                colorType="vibrantColors"
                delay={550}
                zeroColor="#FFFFFF"
              />
            </div>

            <motion.h1
              variants={slideIn("up", "spring", 2.5, 1.5)}
              className="font-black md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[60px]"
            >
              {generateSpans({
                text: t("landing.title"),
                colorType: "vibrantColors",
                zeroColor: "#FFFFFF",
              })}
            </motion.h1>
          </div>
        </div>
        <motion.div
          variants={
            isMobile || screenHeight <= 600
              ? slideIn("up", "spring", 2.8, 2.5)
              : polygonIn("down", "spring", 2.8, 2.5)
          }
          className={`absolute bottom-0 left-0 h-[100svh] w-[100svw] pointer-events-none flex  ${
            isMobile || screenHeight <= 600
              ? `flex-row gap-4 justify-center items-center pb-6 ${
                  screenHeight <= 600 && " pb-0 pt-20 z-50"
                }`
              : " flex-col"
          } `}
        >
          <SocialIcons _colorType={"vibrantColors"} iconPack={socialIcons} />
        </motion.div>
        <div className="absolute bottom-0 w-full flex justify-center z-50">
          <ArrowButton
            index={1}
            duration={1500}
            arrow={true}
            className="opacity-50 hover:opacity-100 transition-opacity animate-my-bounce-slow z-10"
          />
        </div>
      </motion.div>
    </>
  );
};
export default LandingSect;
