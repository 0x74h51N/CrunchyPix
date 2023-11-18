import { useAnimation, motion } from "framer-motion";
import { useState, useEffect } from "react";

type ColorfulHover = {
  char?: string;
  icon?: React.ReactNode;
  initial?: any;
  style?: React.CSSProperties;
  className?: string;
  key?: string | number;
  span?: boolean;
  onClick?: () => void;
};

export const ColorfulHover = ({
  char,
  icon,
  initial,
  style,
  className,
  key,
  span,
  onClick,
}: ColorfulHover) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const getRandomColor = () => {
    const colors = [
      "#E40303",
      "#FF8C00",
      "#FFED00",
      "#008026",
      "#004DFF",
      "#750787",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  useEffect(() => {
    controls.start({
      color: isHovered ? getRandomColor() : "#dfd9ff",
      scale: isHovered ? 1.2 : 1,
      transition: { duration: isHovered ? 0.2 : 3 },
    });
  }, [isHovered, controls]);

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
