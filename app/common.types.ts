import { Dispatch, SetStateAction } from "react";

export type SectionData = {
  name: string;
  className?: string;
  image?: string;
  textStyle?: string;
  children?: React.ReactNode;
};

export type HandleScroll = {
  event: WheelEvent;
  currentSectionIndex: number;
  sectionsData: SectionData[];
  sectionRefs: React.RefObject<HTMLDivElement>[];
  setCurrentSectionIndex: Dispatch<SetStateAction<number>>;
};

export type slide = {
  imageUrl: string;
  title: string;
  description: string;
  left: boolean;
  active?: boolean;
  children?: React.ReactNode | React.ReactElement<{ active: boolean }>;
};

export type RobustSection = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  index?: number;
};
