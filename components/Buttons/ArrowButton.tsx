"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";
import { scrollToSection } from "@/utils/scrollToSection";

interface ArrowButtonProps {
  index?: number;
  className?: string;
  arrow?: boolean;
  duration?: number;
  sectionRefs: React.RefObject<HTMLDivElement>[];
}

export const ArrowButton = ({
  index,
  className,
  arrow,
  duration = 0,
  sectionRefs,
}: ArrowButtonProps) => {
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
      scrollToSection(index, duration, sectionRefs);
    }
  };

  return (
    <button
      className={`${className} cursor-none`}
      onClick={handleButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
