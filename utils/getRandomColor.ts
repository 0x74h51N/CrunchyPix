import { ColorType } from "@/app/common.types";
import { randomColor } from "./randomColors";
import { colorPacks } from "@/constants/colorPacks";

type getRandomColorType = {
  colorType: ColorType;
  randomCount?: number;
};

export const getRandomColor = ({
  colorType,
  randomCount = 6,
}: getRandomColorType) => {
  const selectedColorPack = colorPacks[colorType] || [];

  const colorArray =
    colorType === "random"
      ? Array.from({ length: randomCount }, () => randomColor(randomCount))
      : selectedColorPack;

  if (colorArray.length === 0) {
    return "";
  }

  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
};
