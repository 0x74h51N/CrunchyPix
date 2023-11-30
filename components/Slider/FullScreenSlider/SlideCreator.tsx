import React from "react";
import Image from "next/image";
import SlideBox from "./SlideBox";
import { slide } from "@/app/common.types";

const SlideCreator: React.FC<slide> = ({
  title,
  description,
  imageUrl = "",
  active = false,
  left,
  children,
  box = false,
}) => {
  return (
    <div className="h-full w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={"Image"}
          width={1250}
          height={1250}
          loading="lazy"
          className=" object-cover"
        />
      </div>
      {box && (
        <SlideBox
          active={active}
          title={title}
          description={description}
          left={left}
          imageUrl={""}
        />
      )}
      {children &&
        React.cloneElement(children as React.ReactElement, { active })}
    </div>
  );
};

export default SlideCreator;
