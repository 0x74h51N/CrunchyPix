"use client";
import Image from "next/image";

import { lazy, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { ColorfulBorder } from "./ColorfulBorder";
import { SocialIcons } from "./SocialIcons";
import { socialIcons } from "@/constants/socialIcons";

const Footer = () => {
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
    <div className="flex justify-center footer">
      <motion.div
        variants={staggerContainer(2, 2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative overflow-hidden"
      >
        <div className="lg:px-10 pt-14 pe-6 px-5">
          <div className="flex flexBetween max-md:flex-col w-full h-auto z-10">
            <motion.div
              variants={slideIn("left", "tween", 0.3, 1)}
              className="flex flex-row max-lg:flex-col gap-12 z-10 w-auto px-10"
            >
              <Image
                src="/LogoL.svg"
                width={250}
                height={100}
                loading={"eager"}
                alt="Flexibble"
                className="min-w-[180px] h-auto"
              />
              <div className="flex flex-row gap-8 items-center">
                <SocialIcons
                  colorful={true}
                  iconPack={socialIcons}
                  row={true}
                />
              </div>
            </motion.div>
            <div className="flex flex-row max-lg:flex-col items-end justify-end max-lg:items-center max-lg:justify-center gap-4 w-auto h-full">
              <motion.div
                variants={slideIn("right", "tween", 0.3, 1)}
                className="flex flex-col items-end justify-end max-lg:items-center  p-2 w-auto max-w-[30svw] max-lg:max-w-full "
              >
                <p className="text-stone-200 text-l font-medium mt-5 whitespace-normal max-md:text-center text-end">
                  {t("footer.title")}
                </p>
                <p className="text-stone-200 text-sm font-normal mt-3 w-full max-md:text-center text-end">
                  {t("footer.description")}
                </p>
              </motion.div>

              <div className="h-full w-auto max-w-[110px] z-0">
                <ColorfulBorder>
                  <a
                    href="/contact"
                    className="w-full rounded-2xl bg-transparent p-4 text-cool-gray-100 hover:text-log-col text-center cursor-none"
                  >
                    Contact with me!
                  </a>
                </ColorfulBorder>
              </div>
            </div>
          </div>
          <div className="text-neutral-200 flexBetween mt-10 footer_copyright p-4">
            <p>@ 2023 Tahsin O.. All right reserved</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
