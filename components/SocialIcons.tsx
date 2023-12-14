import { ColorfulHover } from "./ColorfulHover";
import { ColorfulHoverType, Icon } from "@/app/common.types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import IconButton from "./Buttons/IconButton";
import { motion } from "framer-motion";

type SocialIconProp = {
  iconPack: Icon[];
  row?: boolean;
  colorful?: boolean;
};

export const SocialIcons = ({
  iconPack,
  _colorType,
  randomCount = 6,
  row = false,
  colorful = false,
}: SocialIconProp & ColorfulHoverType) => {
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);

  const iconRadius = isMobile ? 0 : Math.max(250, screenWidth / 6);

  const totalIcons = iconPack.length;
  const angleIncrement = Math.PI / 2 / totalIcons;
  const iconList =
    isMobile || screenHeight <= 600 || row ? [...iconPack].reverse() : iconPack;

  return (
    <>
      {iconList.map((icon: Icon, index: number) => {
        const angle = index * angleIncrement;
        const x =
          isMobile || screenHeight <= 600 || row
            ? 0
            : iconRadius * Math.cos(angle) +
              (isTablet ? screenWidth / 2.5 : screenWidth / 2.25);
        const y =
          isMobile || screenHeight <= 600 || row
            ? 0
            : -iconRadius * Math.sin(angle) + screenHeight / 2.2;

        const fontSize = isMobile || screenHeight <= 600 ? "35px" : "50px";
        const color = "white";
        const iconStyle = { x, y, fontSize, color };

        return colorful ? (
          <ColorfulHover
            icon={icon}
            style={iconStyle}
            key={index}
            span={false}
            _colorType={_colorType}
            randomCount={randomCount}
            className="w-9 h-9"
          />
        ) : (
          <motion.div
            className={`w-12 h-12 cursor-none pointer-events-auto flex justify-center items-center`}
            style={iconStyle}
            key={index}
          >
            {icon && <IconButton icon={icon} key={index} />}
          </motion.div>
        );
      })}
    </>
  );
};
