import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

type Path = {
  d: string;
  delay?: number;
};

interface SvgAnimatorProps {
  paths: Path[];
  repeat?: boolean;
  direction?: "forwards" | "back";
  duration: number;
  pathDelay?: number;
  delay?: number;
}
const SvgAnimator = ({
  paths,
  repeat = false,
  direction = "forwards",
  duration,
  pathDelay = 0,
  delay = 0,
}: SvgAnimatorProps) => {
  const { t, i18n } = useTranslation(["home"]);
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
  const initialAnimation = {
    pathLength: 0,
    pathOffset: direction === "back" ? 0 : 1,
  };

  const animateAnimation = {
    pathLength: 1,
    pathOffset: 0,
  };

  return (
    <>
      {paths &&
        paths.map((path, index) => (
          <motion.path
            key={index}
            d={t(path.d)}
            initial={initialAnimation}
            animate={animateAnimation}
            transition={{
              duration: duration,
              ease: "easeInOut",
              delay: path.delay ? path.delay : index * pathDelay + delay,
              ...(repeat && {
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: delay,
              }),
            }}
          />
        ))}
    </>
  );
};

export default SvgAnimator;
