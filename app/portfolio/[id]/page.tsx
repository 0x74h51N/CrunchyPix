"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import Project from "./components/Project";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { sliderChange } from "@/store/redux/isSlider";
import { clickableChange } from "@/store/redux/isClickable";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    console.log("Couldn't find a portfolio item.");
    return null;
  }

  useEffect(() => {
    if (isSlider === true) {
      dispatch(sliderChange(false));
    } else if (isClickable === true) dispatch(clickableChange(false));
  }, []);

  return <Project Item={selectedItem} />;
};

export default PortfolioPage;
