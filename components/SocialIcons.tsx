import { useEffect, useState } from "react";
import { socialIcons } from "@/constants";
import { motion } from "framer-motion";

export const SocialIcons = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  const responsiveFactor = 0.7;
  const iconRadiusRatio = 0.5;
  const minScreenWidthForCircle = 1020;
  const maxScreenWidthForSmallIcons = 620;
  const maxIconRadius = 420;
  const isCircularLayout = windowSize.width >= minScreenWidthForCircle;
  const isMobile = windowSize.width <= maxScreenWidthForSmallIcons;

  let iconRadius = isCircularLayout
    ? Math.max(50, windowSize.width * responsiveFactor * iconRadiusRatio)
    : 0;

  iconRadius = Math.min(iconRadius, maxIconRadius);

  const startingHeight = 250;
  const totalIcons = socialIcons.length;
  const angleIncrement = Math.PI / 2 / totalIcons;
  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };

  const getRandomColor = () => {
    const colors = ["#6a7fff", "#ff8c8c", "#88c34a", "#f4d35e"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  return (
    <>
      {socialIcons.map((icon, index) => {
        const angle = index * angleIncrement;
        const x = isCircularLayout
          ? iconRadius * Math.cos(angle) + windowSize.width / 2
          : windowSize.width - windowSize.width / 7;
        const y = isCircularLayout
          ? -iconRadius * Math.sin(angle) + windowSize.height / 2
          : startingHeight + index * 30;
        const fontSize = isMobile ? "35px" : "50px";
        const iconStyle = { x, y, fontSize };

        return (
          <motion.div
            key={icon.title || index}
            className="social-icon cursor-pointer pointer-events-auto"
            whileHover={{
              color: getRandomColor(),
              scale: 1.2,
              originX: 0,
              originY: 0,
            }}
            onClick={() => handleIconClick(icon.url)}
            initial={{ color: "#e3ddff", scale: 1 }}
            style={iconStyle}
          >
            {icon.icon}
          </motion.div>
        );
      })}
    </>
  );
};
