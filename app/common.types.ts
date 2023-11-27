import { Dispatch, SetStateAction } from "react";

export type SectionData = {
  name?: string;
  className?: string;
  image?: string;
  textStyle?: string;
  children?: React.ReactNode;
  parallax?: boolean | false;
  parallaxImageSrc?: string;
  parallaxImageAlt?: string;
  background?: string;
  topImage?: string;
  smoothScroll?: boolean | false;
};

export type HandleScroll = {
  event: WheelEvent;
  currentSectionIndex: number;
  sectionsData: SectionData[];
  sectionRefs: React.RefObject<HTMLDivElement>[];
  setCurrentSectionIndex: Dispatch<SetStateAction<number>>;
  smoothScroll?: boolean;
  scrollY?: number;
  duration?: number;
};

export type slide = {
  imageUrl?: string;
  title?: string;
  description?: string;
  left?: boolean;
  active?: boolean;
  children?: React.ReactNode | React.ReactElement<{ active: boolean }>;
  box?: boolean;
  githubLink?: string;
  icons?: Icon[];
  labels?: string[];
};

export type RobustSection = {
  title: string;
  description: string;
  icon?: Icon;
  index?: number;
};

export type ColorPacks = {
  [key: string]: string[];
};

export type ColorType = keyof ColorPacks;

export type generateSpanType = {
  text: string;
  colorType?: ColorType;
  randomCount?: number;
};

export type ColorfulHoverType = {
  char?: string;
  icon?: Icon;
  initial?: any;
  style?: React.CSSProperties;
  className?: string;
  key?: string | number;
  span?: boolean;
  onClick?: () => void;
  _colorType?: ColorType;
  randomCount?: number;
};

export type Icon = {
  type: string;
  link?: string;
  size?: number;
  color?: string;
};
