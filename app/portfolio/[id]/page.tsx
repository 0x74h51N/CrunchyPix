"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import Project from "./components/Project";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { sliderChange } from "@/store/redux/isSlider";
import { clickableChange } from "@/store/redux/isClickable";
import OtherProjects from "../components/OtherProjects";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );
  useEffect(() => {
    if (!selectedItem) {
      console.log("Couldn't find a portfolio item.");
      return;
    }

    if (isSlider) {
      dispatch(sliderChange(false));
    } else if (isClickable) {
      dispatch(clickableChange(false));
    }
  }, []);

  if (!selectedItem) {
    return null;
  }
  return (<><Project Item={selectedItem} />
  <OtherProjects /></>);
};

export default PortfolioPage;
