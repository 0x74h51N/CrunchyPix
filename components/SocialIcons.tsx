import { useEffect, useState } from "react";
import { ColorfulHover } from "./ColorfulHover";
import { ColorfulHoverType, SocialIconsType } from "@/app/common.types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

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
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);

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
  }, [windowSize, setWindowSize, isMobile, isTablet]);
  const responsiveFactor = 0.5;
  const iconRadiusRatio = 0.5;
  const maxIconRadius = 370;

  const iconRadius = isTablet
    ? 0
    : Math.max(
        isMobile ? 300 : 350,
        (windowSize.width * responsiveFactor * iconRadiusRatio) / 4
      );
  const startingHeight = isTablet
    ? window.innerHeight / 4
    : isMobile
    ? window.innerHeight / 2
    : windowSize.height <= 490
    ? window.innerHeight / 5
    : 0;

  const totalIcons = iconPack.length;
  const angleIncrement = Math.PI / 2 / totalIcons;

  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };

  const iconList = isTablet ? [...iconPack].reverse() : iconPack;

  return (
    <>
      {iconList.map((icon: any, index: number) => {
        const angle = index * angleIncrement;
        const x =
          !isTablet && !isMobile
            ? iconRadius * Math.cos(angle) + windowSize.width / 2.35
            : isMobile
            ? windowSize.width - 60
            : windowSize.width - windowSize.width / 4;
        const y =
          !isTablet && !isMobile
            ? -iconRadius * Math.sin(angle) + windowSize.height / 2.2
            : startingHeight + index * 30;
        const fontSize = isMobile || screenHeight <= 500 ? "35px" : "50px";

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
