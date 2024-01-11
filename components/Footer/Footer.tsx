"use client";
import Image from "next/image";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { slideIn, staggerContainer } from "@/utils/motion";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { footerIcons } from "@/constants/socialIcons";
import IconButton from "../Buttons/IconButton";
import { Icon } from "@/app/common.types";
import { footerLinks } from "@/constants";
import FooterColumn from "./FooterColumn";
import { clickableChange } from "@/store/redux/isClickable";
import Contact from "../Contact";

const Footer = () => {
  const { t, i18n } = useTranslation(["index"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
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
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <div className="relative flex justify-center footer py-24 bg-neutral-50 shadow-inner shadow-black">
      <motion.div
        variants={staggerContainer(2, 2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="overflow-hidden"
      >
        <div className="flex flexCenter py-24 pb-26 lg:px-14 px-8 bg-neutral-950">
          <div className="flex lg:flexBetween flex-col w-full h-auto z-10 max-w-[1300px]">
            <div className="flex flex-col lg:flex-row lg:justify-between justify-center lg:items-end items-center lg:gap-4 gap-8 w-full">
              <motion.div
                variants={slideIn("left", "tween", 0.3, 1)}
                className="flex flex-col justify-between lg:items-start items-center z-10 lg:w-1/4 w-full"
              >
                <Image
                  src="/LogoL.svg"
                  width={250}
                  height={100}
                  loading={"eager"}
                  alt="Flexibble"
                  className="w-full max-w-[180px] h-auto lg:pb-6 pb-0"
                />
                <div className="flex flex-col lg:items-start items-center w-full mt-5 gap-3">
                  <p className="text-stone-200 text-l w-auto font-medium whitespace-normal max-lg:text-center text-start">
                    {t("footer.title")}
                  </p>
                  <p className="text-stone-200 text-sm font-normal max-lg:text-center text-start max-lg:max-w-[300px]">
                    {t("footer.description")}
                  </p>
                </div>
              </motion.div>
              <div className="flex flex-row gap-8 text-end justify-center">
                <FooterColumn Links={footerLinks[0].links} />
                <div className="flex-1 flex flex-col gap-4 text-start">
                  <FooterColumn Links={footerLinks[1].links} />
                </div>
              </div>
              <div className="flex lg:justify-end justify-center h-auto lg:w-2/5 w-full">
                <motion.div
                  variants={slideIn("right", "tween", 0.3, 1)}
                  className="flex flex-col items-end justify-end max-lg:items-center w-full lg:max-w-[580px] max-w-[400px]"
                >
                  <Contact />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 flex justify-center sm:px-16 px-2 w-full">
          <div className="text-neutral-900 flex flex-row justify-between items-center footer_copyright w-full max-w-[1300px]">
            <p>@ 2023 Tahsin All right reserved</p>
            <div className="flex flex-row gap-3 text-neutral-900 items-center justify-center h-auto">
              {footerIcons.map((icon: Icon, index: number) => (
                <span
                  key={index}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="hover:text-log-col transition-all ease-in-out duration-300"
                >
                  <IconButton key={index} icon={icon} size={25} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Footer;
