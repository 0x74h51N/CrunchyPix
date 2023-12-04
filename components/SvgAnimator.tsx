import { RootState } from "@/store";
import { Variants, motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

type Path = {
  d: string;
  delay?: number;
};

interface SvgAnimatorProps {
  paths: Path[];
}
const SvgAnimator = ({ paths }: SvgAnimatorProps) => {
  const { t, i18n } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  return (
    <>
      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={t(path.d)}
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{ pathLength: 1, pathOffset: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
            delay: path.delay ? path.delay : index * 0.35 + 1.7,
          }}
        />
      ))}
    </>
  );
};

export default SvgAnimator;
