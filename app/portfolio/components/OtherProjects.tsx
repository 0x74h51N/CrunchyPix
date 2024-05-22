"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import { polygonIn, slideIn } from "@/utils/motion";
import { motion } from "framer-motion";
import ProjectSlide from "./ProjectSlide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { sliderChange } from "@/store/redux/isSlider";
import { useTranslation } from '@/i18n/client';

const OtherProjects = () => {
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const dispatch = useDispatch();
  const { t } = useTranslation("portfolio");

  const hoverStart = () => {
    if (isSlider === false) {
      dispatch(sliderChange(true));
    }
  };
  const hoverEnd = () => {
    dispatch(sliderChange(false));
  };
    return (
      <div className="flexCenter w-auto h-auto min-w-[100svw] overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "some" }}
          variants={polygonIn("screen", "spring", 2, 1.8)}
          className="w-full max-w-[1300px] h-auto mb-24 px-8 "
          onHoverStart={hoverStart}
          onHoverEnd={hoverEnd}
        >
          <motion.div variants={slideIn("up", "easeInOut", 2.2, 1)}>
            <h2 className="h1 half w-full mb-2 text-center">{t("page.otherProjects")}</h2>
          </motion.div>
          <ProjectSlide Items={portfolioPageItems} />
        </motion.div>
      </div>
    );
};

export default OtherProjects;
