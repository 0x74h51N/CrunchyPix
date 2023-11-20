import { Dispatch, SetStateAction } from "react";

export type SectionData = {
  name?: string;
  className?: string;
  image?: string;
  textStyle?: string;
  children?: React.ReactNode;
  auto?: boolean;
  smoothScroll?: boolean | true;
};

export type SocialIconsType = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

export type HandleScroll = {
  event: WheelEvent;
  currentSectionIndex: number;
  sectionsData: SectionData[];
  sectionRefs: React.RefObject<HTMLDivElement>[];
  setCurrentSectionIndex: Dispatch<SetStateAction<number>>;
  smoothScroll?: boolean;
};

export type slide = {
  imageUrl?: string;
  title?: string;
  description?: string;
  left?: boolean;
  active?: boolean;
  children?: React.ReactNode | React.ReactElement<{ active: boolean }>;
  box?: boolean;
};

export type RobustSection = {
  title: string;
  description: string;
  icon?: React.ReactNode;
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
  icon?: React.ReactNode;
  initial?: any;
  style?: React.CSSProperties;
  className?: string;
  key?: string | number;
  span?: boolean;
  onClick?: () => void;
  _colorType?: ColorType;
  randomCount?: number;
};
