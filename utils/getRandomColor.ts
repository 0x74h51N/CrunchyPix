import { ColorType } from '@/types/common.types';
import { randomColor } from './randomColors';
import { colorPacks } from '@/constants/colorPacks';

type getRandomColorType = {
  colorType: ColorType;
  randomCount?: number;
};

export const getRandomColor = ({
  colorType,
  randomCount = 6,
}: getRandomColorType) => {
  const selectedColorPack = colorPacks[colorType] || [];
  const cachedColors = Array.from({ length: randomCount }, () =>
    randomColor(randomCount),
  );
  const colorArray = colorType === 'random' ? cachedColors : selectedColorPack;

  if (colorArray.length === 0) {
    return '';
  }

  const randomIndex = Math.floor(Math.random() * colorArray.length);
  return colorArray[randomIndex];
};
