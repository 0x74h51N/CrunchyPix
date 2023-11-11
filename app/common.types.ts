export type SectionData = {
  name: string;
  auto?: boolean;
  className?: string;
  image?: string;
  textStyle?: string;
  children?: React.ReactNode;
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
};
