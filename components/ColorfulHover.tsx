import { ColorfulHoverType } from "@/app/common.types";
import { getRandomColor } from "@/utils/getRandomColor";
import { useAnimation, motion } from "framer-motion";
import { useState, useEffect } from "react";

export const ColorfulHover = ({
  char,
  icon,
  initial,
  style,
  className,
  key,
  span,
  onClick,
  _colorType = "themeColors",
  randomCount = 6,
}: ColorfulHoverType) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  useEffect(() => {
    controls.start({
      color: isHovered
        ? getRandomColor(
            _colorType === "random"
              ? { colorType: "random", randomCount: randomCount }
              : { colorType: _colorType }
          )
        : "#dfd9ff",

      transition: { duration: isHovered ? 0.2 : 3 },
    });
  }, [isHovered, controls, _colorType]);
  if (span) {
    return (
      <motion.span
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        animate={controls}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    );
  } else {
    return (
      <motion.div
        key={key}
        className={`cursor-pointer pointer-events-auto w-8 ${className}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        animate={controls}
        onClick={onClick}
        initial={initial}
        style={style}
      >
        {icon}
      </motion.div>
    );
  }
};
