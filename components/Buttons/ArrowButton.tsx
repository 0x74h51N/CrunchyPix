"use client";
import Image from "next/image";
import { useScrollContext } from "@/context/ScrollContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";
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
