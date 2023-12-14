"use client";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { slideIn, staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

const page = () => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }
  return (
    <motion.div
      variants={staggerContainer(2, 2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex flex-row  overflow-hidden min-h-[100svh]"
    >
      <div className="w-4/6"></div>
      <div className="flex flex-col p-8 justify-end items-center gap-7 z-10 w-2/6 max-xs:px-8">
        <motion.div
          variants={slideIn("right", "tween", 0.3, 1)}
          className="w-full"
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default page;
