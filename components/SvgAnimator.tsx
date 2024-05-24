import { motion } from "framer-motion";
import React from "react";
import { useTranslation } from "react-i18next";


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
  const { t } = useTranslation(["home"]);
 
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
