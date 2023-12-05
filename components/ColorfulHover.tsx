import { ColorfulHoverType } from "@/app/common.types";
import { getRandomColor } from "@/utils/getRandomColor";
import { useAnimation, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import IconButton from "./Buttons/IconButton";

export const ColorfulHover = ({
  char,
  icon,
  initial,
  style,
  className,
  span,
  _colorType = "themeColors",
  randomCount = 6,
  zeroColor = "#FFFFFF",
}: ColorfulHoverType) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback(() => {
    setIsHovered((prev) => !prev);
  }, []);

  useEffect(() => {
    controls.start({
      color: isHovered
        ? getRandomColor(
            _colorType === "random"
              ? { colorType: "random", randomCount: randomCount }
              : { colorType: _colorType }
          )
        : zeroColor,
      transition: { duration: isHovered ? 0.1 : 1.5 },
    });
  }, [isHovered, controls, _colorType]);

  if (span) {
    return (
      <motion.span
        className={`cursor-pointer pointer-events-auto ${className}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        initial={initial}
        animate={controls}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    );
  } else {
    return (
      <motion.div
        className={`cursor-pointer pointer-events-auto ${className}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        animate={controls}
        initial={initial}
        style={style}
      >
        {icon && <IconButton icon={icon} />}
      </motion.div>
    );
  }
};
