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

const Footer = () => {
  const { t, i18n } = useTranslation(["index"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage
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
        <div className="lg:px-16 pt-14 pe-6 px-5">
          <div className="flex md:flexBetween flex-col w-full h-auto z-10">
            <div className="flex flex-col md:flex-row md:justify-between justify-center md:items-end gap-4 lg:w-3/6">
              <motion.div
                variants={slideIn("left", "tween", 0.3, 1)}
                className="flex flex-col justify-center md:items-start items-center z-10 w-auto "
              >
                <Image
                  src="/LogoL.svg"
                  width={250}
                  height={100}
                  loading={"eager"}
                  alt="Flexibble"
                  className="w-full max-w-[180px] h-auto"
                />
                <p className="text-stone-200 text-l w-auto font-medium mt-5 whitespace-normal max-md:text-center text-start">
                  {t("footer.title")}
                </p>
                <p className="text-stone-200 text-sm font-normal mt-3 w-full md:w-3/5 max-md:text-center text-start">
                  {t("footer.description")}
                </p>
              </motion.div>
              <div className="flex flex-row gap-8 text-end justify-center md:px-0 px-10">
                <FooterColumn Links={footerLinks[0].links} />
                <div className="flex-1 flex flex-col gap-4 text-start">
                  <FooterColumn Links={footerLinks[1].links} />
                </div>
              </div>
            </div>
            <div className="flex flex-row max-lg:flex-col items-end justify-end max-lg:items-center max-lg:justify-center gap-4 w-auto h-full lg:w-4/6">
              <motion.div
                variants={slideIn("right", "tween", 0.3, 1)}
                className="flex flex-col items-end justify-end max-lg:items-center  p-2 w-auto max-w-[30svw] max-lg:max-w-full "
              ></motion.div>
            </div>
          </div>
          <div className="text-neutral-200 flexBetween footer_copyright">
            <p>@ 2023 Tahsin All right reserved</p>
            <div className="flex flex-row gap-3 text-white items-center justify-center h-auto">
              {footerIcons.map((icon: Icon, index: number) => (
                <span
                  key={index}
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
