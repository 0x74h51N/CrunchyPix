import { RootState } from "@/store";
import  { useTranslation } from "@/i18n/client";
import { slideIn } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaAnglesRight } from "react-icons/fa6";
import { clickableChange } from "@/store/redux/isClickable";
import { PortfolioItemProps } from "@/app/common.types";
import { sliderChange } from "@/store/redux/isSlider";

const areEqual = (
  prevProps: PortfolioItemInterface,
  nextProps: PortfolioItemInterface
) => {
  return (
    prevProps._id === nextProps._id &&
    prevProps.image === nextProps.image &&
    prevProps.imageAlt === nextProps.imageAlt &&
    prevProps.title === nextProps.title &&
    prevProps.projectType === nextProps.projectType &&
    prevProps.width === nextProps.width &&
    prevProps.height === nextProps.height &&
    prevProps.isSlide === nextProps.isSlide
  );
};

interface PortfolioItemInterface extends PortfolioItemProps {
  width: number;
  height: number;
  isSlide: boolean;
}

const PortfolioItem = memo(
  ({
    _id,
    image,
    imageAlt,
    title,
    projectType,
    width,
    height,
    isSlide,
  }: PortfolioItemInterface) => {
    const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
    const isTouch = useSelector((state: RootState) => state.isTouch.touch);
    const originalWidth = width;
    const originalHeight = height;
    const mobileWidth = 300;
    const mobileHeight = (mobileWidth / originalWidth) * originalHeight;
    const id = _id.toLowerCase().replace(/\s+/g, "");
    const isClickable = useSelector(
      (state: RootState) => state.isClickable.clickable
    );
    const isSlider = useSelector((state: RootState) => state.isSlider.slider);
    const dispatch = useDispatch();
    const { t } = useTranslation("portfolio");
    
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
    const onClickHandler = () => {
      if (isClickable == true) {
        dispatch(clickableChange(false));
      } else if (isSlider === true) {
        dispatch(sliderChange(false));
      }
    };

    return (
      <div
        className="relative flex flex-col items-center justify-between overflow-hidden"
        style={{
          height: isSlide ? "auto" : isMobile ? 320 : 600,
          width: isMobile ? mobileWidth : originalWidth,
          marginTop: isSlide ? 0 : 25,
        }}
      >
        <motion.div
          initial="hidden"
          whileHover="show"
          whileTap={"show"}
          className="group relative flex justify-center items-center rounded-xl bg-gradient-to-br to-cool-gray-700 from-slate-800 z-10"
          style={{
            width: isMobile ? mobileWidth : originalWidth,
            height: isMobile ? mobileHeight : originalHeight,
          }}
        >
          <Image
            src={image}
            alt={imageAlt}
            quality={100}
            width={isMobile ? 1000 : 1500}
            height={isMobile ? 800 : 1500}
            className="object-cover object-center w-full h-full rounded-xl"
          />

          <div className="absolute w-full h-full  group-hover:backdrop-filter group-hover:backdrop-blur-sm bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 ease-in-out rounded-xl " />
          {isTouch || isSlide ? (
            <Link
              href={`/portfolio/${id}`}
              passHref
              className="absolute cursor-none w-full h-full"
              onClick={onClickHandler}
            />
          ) : (
            <>
              <motion.div
                variants={slideIn("up", "spring", 0.2, 0.75)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="absolute flex justify-center items-center rounded-full bg-log-col opacity-0 group-hover:opacity-70 w-[70px] h-[70px]"
              >
                <Link
                  href={`/portfolio/${id}`}
                  passHref
                  className="cursor-none"
                  onClick={onClickHandler}
                >
                  <FaAnglesRight className="text-white text-2xl -rotate-45" />
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
        <div
          className={`absolute bottom-0 rounded-b-xl z-10 w-full flex justify-start ${
            isSlide
              ? "left-0 bg-black bg-opacity-50  h-auto"
              : "md:-bottom-5 bottom-0 md:h-32 h-20"
          }`}
        >
          <Link
            href={`/portfolio/${id}`}
            passHref
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex flex-col justify-center w-auto md:p-4 p-2 text-stone-200 cursor-none"
            onClick={onClickHandler}
          >
            <h2 className="md:text-md text-sm text-log-col">
              {t(`${projectType}`)}
            </h2>
            <h1
              className={`${
                isMobile || isSlide ? "h2" : "h1 half"
              } hover:text-log-col transition-all duration-300 ease-in-out`}
            >
              {t(`${title}`)}
            </h1>
          </Link>
        </div>
      </div>
    );
  },
  areEqual
);
PortfolioItem.displayName = "PortfolioItem";
export default PortfolioItem;
