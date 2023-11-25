"use client";
import ArrowButton from "../ArrowButton";
import { textVariant, fadeIn, slideIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { generateSpans } from "../GenerateSpans";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { RootState } from "@/store";
import { SocialIcons } from "../SocialIcons";
import TypingText from "../typeText";
import { socialIcons } from "@/constants";

const LandingSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height
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
    <>
      <div
        className={`anaDiv flex justify-center items-center min-h-[100svh] min-w-[100svw] relative overflow-hidden `}
      >
        <div
          className={`flex flex-row max-lg:flex-col justify-center items-center max-md:m-8 z-0 pb-32 ${
            isMobile ? "pb-[180px]" : ""
          }`}
        >
          <motion.div
            variants={textVariant(0)}
            className="flex flex-col text-center"
          >
            <p
              className={`text-[#baaeff] font-medium lg:text-[40px] sm:text-[30px] text-[25px]`}
            >
              <TypingText
                generateSpan={true}
                _code={false}
                text={t("landing.intro")}
                duration={40}
                colorType="vibrantColors"
              />
            </p>
            <motion.div
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-3 text-stone-100  lg:text-[19px] text-[18px] min-w-[219] leading-[30px] max-lg:leading-[10px] whitespace-pre-wrap"
            >
              <TypingText
                generateSpan={true}
                _code={false}
                text={t("landing.description")}
                duration={40}
                colorType="vibrantColors"
                delay={500}
              />
            </motion.div>

            <motion.h1
              variants={slideIn("up", "spring", 2, 1.6)}
              initial="hidden"
              animate="show"
              className="text-stone-200 font-black md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[60px]"
            >
              {generateSpans({
                text: t("landing.title"),
                colorType: "vibrantColors",
              })}
            </motion.h1>
          </motion.div>
        </div>

        <motion.div
          initial={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ delay: 2.5, duration: 1 }}
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
      </div>
    </>
  );
};
export default LandingSect;
