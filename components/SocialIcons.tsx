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
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);

  const iconRadius = isMobile
    ? 0
    : Math.max(isTablet ? 250 : 290, screenWidth / 6);

  const totalIcons = iconPack.length;
  const angleIncrement = Math.PI / 2 / totalIcons;

  const handleIconClick = (url: string) => {
    window.open(url, "_blank");
  };

  const iconList = isMobile ? [...iconPack].reverse() : iconPack;

  return (
    <>
      {iconList.map((icon: any, index: number) => {
        const angle = index * angleIncrement;
        const x =
          isMobile || screenHeight <= 600
            ? 0
            : iconRadius * Math.cos(angle) + screenWidth / 2.3;
        const y =
          isMobile || screenHeight <= 600
            ? 0
            : -iconRadius * Math.sin(angle) + screenHeight / 2.25;

        const fontSize =
          isTablet || isMobile || screenHeight <= 600 ? "35px" : "50px";

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
            className="w-9 h-9"
          />
        );
      })}
    </>
  );
};
