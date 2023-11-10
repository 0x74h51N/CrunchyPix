import React from "react";
import Image from "next/image";
import SlideBox from "./SlideBox";
import { slide } from "@/app/common.types";

const SlideCreator: React.FC<slide> = ({
  title,
  description,
  imageUrl,
  active = false,
  left,
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
        imageUrl={""}
      />
    </div>
  );
};

export default SlideCreator;
