import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { slideIn, staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FaAnglesRight } from "react-icons/fa6";
import { clickableChange } from "@/store/redux/isClickable";

export interface PortfolioItemProps {
  image: string;
  imageAlt: string;
  title: string;
  projectType: string;
}

const PortfolioItem = ({
  image,
  imageAlt,
  title,
  projectType,
}: PortfolioItemProps) => {
  const slug = imageAlt.toLowerCase().replace(/\s+/g, "");
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(["home"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
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
    <div className="flex flex-col items-center justify-between">
      <motion.div
        initial="hidden"
        whileHover="show"
        className="group relative flex justify-center items-center w-[630px] h-[500px] rounded-md bg-cool-gray-500"
      >
        <Image
          src={image}
          alt={imageAlt}
          width={630}
          height={500}
          className="object-cover rounded-md"
        ></Image>
        <div className="absolute w-full h-full  group-hover:backdrop-filter group-hover:backdrop-blur-sm bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 ease-in-out rounded-md " />
        <motion.div
          variants={slideIn("up", "spring", 0.2, 0.75)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute flex justify-center items-center rounded-full bg-log-col opacity-0 group-hover:opacity-70 w-[70px] h-[70px]"
        >
          <Link href={`/portfolio/${slug}`} passHref className="cursor-none">
            <FaAnglesRight className="text-white text-2xl -rotate-45" />
          </Link>
        </motion.div>
      </motion.div>
      <div className="w-full p-5 text-stone-200">
        <h2 className="text-xl text-log-col">{t(`${projectType}`)}</h2>
        <h1 className="text-[40px] font-bold">{t(`${title}`)}</h1>
      </div>
    </div>
  );
};

export default PortfolioItem;
