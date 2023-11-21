import { useEffect, useState } from "react";
import { ColorfulHover } from "./ColorfulHover";
import { ColorfulHoverType, SocialIconsType } from "@/app/common.types";

type SocialIconProp = {
  iconPack: SocialIconsType[];
};

export const SocialIcons = ({
  iconPack,
  _colorType,
  randomCount = 6,
}: SocialIconProp & ColorfulHoverType) => {
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

  const responsiveFactor = 0.5;
  const iconRadiusRatio = 0.5;
  const minScreenWidthForCircle = 1028;
  const maxScreenWidthForSmallIcons = 620;
  const maxIconRadius = 370;
  const isCircularLayout = windowSize.width >= minScreenWidthForCircle;
  const isMobile = windowSize.width <= maxScreenWidthForSmallIcons;

  let iconRadius = isCircularLayout
    ? Math.max(350, windowSize.width * responsiveFactor * iconRadiusRatio)
    : 0;

  iconRadius = Math.min(iconRadius, maxIconRadius);
  const startingHeight = isMobile ? (window.innerHeight / 5) * 3 : 250;

  const totalIcons = iconPack.length;
  const angleIncrement = Math.PI / 2 / totalIcons;
  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };
  const iconList = isCircularLayout ? iconPack : [...iconPack].reverse();
  return (
    <>
      {iconList.map((icon: any, index: number) => {
        const angle = index * angleIncrement;
        const x = isCircularLayout
          ? iconRadius * Math.cos(angle) + windowSize.width / 2.35
          : isMobile
          ? windowSize.width - 50
          : windowSize.width - windowSize.width / 4;
        const y = isCircularLayout
          ? -iconRadius * Math.sin(angle) + windowSize.height / 2.2
          : startingHeight + index * 30;
        const fontSize = isMobile ? "35px" : "50px";

        const iconStyle = { x, y, fontSize };
        return (
          <ColorfulHover
            icon={icon.icon}
            onClick={() => handleIconClick(icon.url)}
            initial={{ color: "#e3ddff", scale: 1 }}
            style={iconStyle}
            key={icon.title || index}
            span={false}
            _colorType={_colorType}
            randomCount={randomCount}
          />
        );
      })}
    </>
  );
};
