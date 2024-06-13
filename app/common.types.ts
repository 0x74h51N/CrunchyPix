import { IconProps } from '@/schemas';

export type Links = {
  href: string;
  key: string;
  text: string;
};

export type SubTitles = {
  title?: string;
  description?: string;
};

export type SectionData = {
  name: string;
  className: string;
  children: React.ReactNode;
  parallax?: boolean | false;
  parallaxImageSrc?: string;
  background?: string;
  topImage?: string;
};

export type HandleScroll = {
  event: WheelEvent;
  currentSection: number;
  sectionRefs: React.RefObject<HTMLDivElement>[];
  duration?: number;
};

export type slide = {
  imageUrl?: string;
  image?: string;
  imageUrlV?: string;
  imageUrlH?: string;
  title?: string;
  description?: string;
  left?: boolean;
  active?: boolean;
  children?: React.ReactNode | React.ReactElement<{ active: boolean }>;
  box?: boolean;
  githubLink?: string;
  icons?: IconProps[];
  labels?: string[];
};

export type ColorPacks = {
  [key: string]: string[];
};

export type ColorType = keyof ColorPacks;

export type generateSpanType = {
  text: string;
  colorType?: ColorType;
  zeroColor?: string;
  randomCount?: number;
  _className?: string;
};

export type ColorfulHoverType = {
  char?: string;
  icon?: IconProps;
  initial?: any;
  style?: React.CSSProperties;
  className?: string;
  key?: string | number;
  span?: boolean;
  onClick?: () => void;
  _colorType?: ColorType;
  randomCount?: number;
  zeroColor?: string;
};
