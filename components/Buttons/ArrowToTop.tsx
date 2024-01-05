"use client";
import { RootState } from "@/store";
import { setIndex } from "@/store/redux/currentSectionIndex";
import { clickableChange } from "@/store/redux/isClickable";
import { handleScroll } from "@/utils/handleScroll";
import { slideIn } from "@/utils/motion";
import { scrollToTop } from "@/utils/scrollToSection";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

export const ArrowToTop = () => {
  const dispatch = useDispatch();
  const [isArrowVisible, setArrowVisible] = useState(false);
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );

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

  const handleButtonClick = () => {
    dispatch(setIndex(0));
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
    scrollToTop(1500);
    setTimeout(() => {
      setArrowVisible(false);
    }, 850);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isScrolledDown = scrollPosition > 500;

      if (isScrolledDown && !isArrowVisible) {
        setArrowVisible(true);
      } else {
        setArrowVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  if (isArrowVisible) {
    return (
      <motion.div
        initial={"hidden"}
        animate={"show"}
        variants={slideIn("right", "spring", 0.5, 0.8)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed flexCenter bottom-5 right-3 bg-cool-gray-900 w-[40px] h-[40px] pt-1 px-1 z-50 opacity-50 hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg"
      >
        <button className={`cursor-none `} onClick={handleButtonClick}>
          <Image
            src="/arrow.svg"
            alt="Arrow"
            width={40}
            height={40}
            loading="lazy"
            className="rotate-180 opacity-50 hover:opacity-100 "
          />
        </button>
      </motion.div>
    );
  } else return null;
};
