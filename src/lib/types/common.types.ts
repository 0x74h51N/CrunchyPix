import { IconProps } from '@/lib/schemas';

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
  active?: boolean;
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
  style?: React.CSSProperties;
  className?: string;
  key?: string | number;
  span?: boolean;
  _colorType?: ColorType;
  randomCount?: number;
  zeroColor?: string;
};

export type Option = {
  key: string;
  value?: string | React.ReactNode;
  disabledTip?: string;
};

export type SimplifiedPrismicLink = {
  uid: string;
  url: string;
  link_type: 'Document';
};
export type CodeLanguages =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'json'
  | 'html'
  | 'css'
  | 'structure'
  | 'bash'
  | 'text'
  | 'table';

export type ContactFormData =
  | {
      errors?: {
        email?: string[];
        name?: string[];
        message?: string[];
        turnstileToken?: string[];
      };
      message?: string;
      success?: boolean | undefined;
    }
  | undefined;

export type ToastType = {
  id: number;
  type: 'success' | 'error';
  msg: string;
};
