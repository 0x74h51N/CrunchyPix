"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollContext } from "@/context/ScrollContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";
import { motion } from "framer-motion";
import { slideIn } from "@/utils/motion";
import { visibleChange } from "@/store/redux/upArrowVisible";
import { setIndex } from "@/store/redux/currentSectionIndex";
import { scrollToSection, scrollToTop } from "@/utils/scrollToSection";

interface ArrowButtonProps {
  index?: number;
  text?: string;
  className?: string;
  arrow?: boolean;
  duration?: number;
}

export const ArrowButton = ({
  index,
  text,
  className,
  arrow,
  duration = 0,
}: ArrowButtonProps) => {
  const { sectionRefs } = useScrollContext();
  const dispatch = useDispatch();
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
    if (index !== undefined) {
      const dispatchSetIndex = (index: number) => dispatch(setIndex(index));
      scrollToSection(index, duration, sectionRefs, dispatchSetIndex);
    }
  };

  return (
    <button
      className={`${className} cursor-none`}
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
      {arrow && (
        <Image
          src="/arrow.svg"
          alt="Arrow"
          width={50}
          height={50}
          loading="lazy"
        />
      )}
    </button>
  );
};

export const ArrowToTop = () => {
  const dispatch = useDispatch();
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const isArrowVisible = useSelector(
    (state: RootState) => state.isArrowVisible.arrowVisible
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
      dispatch(visibleChange(false));
    }, 850);
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const isScrolledDown = scrollPosition > 500;

      if (isScrolledDown && !isArrowVisible) {
        dispatch(visibleChange(true));
      } else {
        dispatch(visibleChange(false));
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);
  if (isArrowVisible) {
    return (
      <motion.div
        initial={"hidden"}
        animate={"show"}
        variants={slideIn("right", "spring", 0.5, 0.8)}
        className="sticky  bottom-6 right-0 ml-auto mr-4 bg-cool-gray-900 w-[50px] h-[50px] pt-2 px-1 z-50 opacity-50 hover:opacity-100 transition-opacity duration-500 ease-in-out rounded-lg"
      >
        <button
          className={`cursor-none`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleButtonClick}
        >
          <Image
            src="/arrow.svg"
            alt="Arrow"
            width={50}
            height={50}
            loading="lazy"
            className="rotate-180"
          />
        </button>
      </motion.div>
    );
  } else return null;
};
