import React from "react";
import Image from "next/image";
import SlideBox from "./SlideBox";

interface SlideProps {
  title: string;
  description: string;
  imageUrl: string;
  active: boolean;
  left?: boolean;
  children?: React.ReactNode | null;
}

const SlideCreator: React.FC<SlideProps> = ({
  title,
  description,
  imageUrl,
  active,
  left,
  children,
}) => {
  return (
    <div className="h-full">
      <Image
        src={imageUrl}
        alt={"Image"}
        layout="fill"
        objectFit="cover"
        loading="lazy"
        className="z-0"
      ></Image>
      <SlideBox
        active={active}
        title={title}
        description={description}
        left={left}
      />
      {children && children}
    </div>
  );
};

export default SlideCreator;
