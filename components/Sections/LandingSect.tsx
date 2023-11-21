"use client";
import ParticlesBack from "../ParticlesBack/ParticlesBack";
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
import ParallaxImage from "../ParallaxImage";

const LandingSect = () => {
  const { t, i18n } = useTranslation(["translation"]);
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

  return (
    <>
      <div className="anaDiv flex flex-center justify-center h-full min-h-screen w-full relative galata0">
        <div className=" h-auto w-auto pt-10 flex flex-row max-lg:flex-col lg:gap-0 gap-0 m-10 justify-center max-md:m-8 items-center max-lg:items-start z-0 pb-[165px]">
          <div className="flex flex-col m-8 max-lg:mt-0">
            <motion.div variants={textVariant(0)}>
              <p className="text-[#baaeff] font-medium lg:text-[40px] sm:text-[30px] xs:text-[20px] text-[16px] lg:leading-[40px]">
                <TypingText
                  generateSpan={true}
                  _code={false}
                  text={t("landing.intro")}
                  duration={40}
                  colorType="vibrantColors"
                />
              </p>
              <motion.p
                variants={fadeIn("", "", 0.1, 1)}
                className="mt-3 text-stone-200 lg:text-[18px] text-[15px] min-w-[219] leading-[30px] whitespace-pre-wrap"
              >
                <TypingText
                  generateSpan={true}
                  _code={false}
                  text={t("landing.description")}
                  duration={40}
                  colorType="vibrantColors"
                  delay={500}
                />
              </motion.p>

              <motion.h1
                initial={{
                  clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                }}
                animate={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="text-stone-200 font-black md:text-[65x] sm:text-[55px] xs:text-[40px] text-[30px] max-w-2xl"
              >
                {generateSpans({
                  text: t("landing.title"),
                  colorType: "vibrantColors",
                })}
              </motion.h1>
              <motion.h2
                initial={{
                  clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                }}
                animate={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
                transition={{ delay: 2.2, duration: 0.5 }}
                className="text-stone-200 font-black md:text-[55px] sm:text-[45px] xs:text-[30px] text-[20px]"
              >
                {/* {generateSpans({
                  text: t("landing.title2"),
                  colorType: "vibrantColors",
                })} */}
              </motion.h2>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 z-30 h-full w-full pointer-events-none">
          <ParticlesBack />
        </div>
        <div className="absolute h-full w-full z-30 pointer-events-none">
          <ParallaxImage imageSource="galata1" alt="galata" />
        </div>
        <motion.div
          initial={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          }}
          animate={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-0 right-0 h-full w-full pointer-events-none"
        >
          <SocialIcons _colorType={"vibrantColors"} iconPack={socialIcons} />
        </motion.div>
        <div className="absolute bottom-0 w-full flex justify-center items-end z-50">
          <ArrowButton
            index={1}
            arrow={true}
            className="opacity-50 hover:opacity-100 transition-opacity animate-my-bounce-slow z-10"
          />
        </div>
      </div>
    </>
  );
};
export default LandingSect;
