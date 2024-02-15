"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import { polygonIn, slideIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import ProjectSlide from "./ProjectSlide";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { sliderChange } from "@/store/redux/isSlider";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const OtherProjects = () => {
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
  const pathname = usePathname();
  const [childPage, setChildPage] = useState("");
  const portfolioPageItemIds = portfolioPageItems.map((item) =>
    item._id.toLowerCase()
  );

  useEffect(() => {
    const updatePageInfo = () => {
      const urlParts = pathname.split("/");
      if (urlParts[2]) {
        const currentChildPage = urlParts[2];
        setChildPage(currentChildPage);
      } else setChildPage("");
    };
    updatePageInfo();

    const handlePopState = () => {
      updatePageInfo();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, setChildPage]);

  const hoverStart = () => {
    if (isSlider === false) {
      dispatch(sliderChange(true));
    }
  };
  const hoverEnd = () => {
    dispatch(sliderChange(false));
  };
  if (childPage && portfolioPageItemIds.includes(childPage.toLowerCase())) {
    return (
      <div className="flexCenter w-auto h-auto min-w-[100svw] overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "some" }}
          variants={polygonIn("screen", "spring", 1.5, 1.8)}
          className="flex flex-col items-center w-full max-w-[1300px] h-auto mb-24 px-8 "
          onHoverStart={hoverStart}
          onHoverEnd={hoverEnd}
        >
          <motion.div variants={slideIn("up", "easeInOut", 2.2, 1)}>
            <h2 className="h1 half w-full mb-2">{t("page.otherProjects")}</h2>
          </motion.div>

          <ProjectSlide Items={portfolioPageItems} />
        </motion.div>
      </div>
    );
  } else return null;
};

export default OtherProjects;
