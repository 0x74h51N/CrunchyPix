// ArrowButton.jsx

import React from "react";
import ArrowSVG from "./ArrowSVG";
import { RootState } from "@/store";
import { clickableChange } from "@/store/redux/isClickable";
import { useDispatch, useSelector } from "react-redux";

type FlipButton = {
  directionLeft?: boolean | false;
  onClick: () => void;
  currentPage: number;
};

const FlipButton = ({ onClick, currentPage, directionLeft }: FlipButton) => {
  const dispatch = useDispatch();
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const handleMouseEnter = () => {
    if (isClickable === false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable === true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`absolute bottom-1/2  p-2 ${
        directionLeft ? "left-0" : "right-0"
      } ${currentPage === 0 ? "animate-bounceX-slow" : "animate-bounceX"}`}
    >
      <div
        className={`hover:stroke-log-col opacity-50 hover:opacity-90 transition-all ease-in-out duration-500 ${
          directionLeft ? "rotate-180" : ""
        } ${currentPage === 0 ? "stroke-log-col" : "stroke-neutral-900"}`}
      >
        <ArrowSVG width={50} height={50} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default FlipButton;
