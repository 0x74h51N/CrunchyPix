import React from "react";
import SlideBox from "./SlideBox";
import { slide } from "@/app/common.types";
import { CldImage } from "next-cloudinary";

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
        <CldImage
          src={imageUrl}
          alt={"Image"}
          fill
          loading="lazy"
          className=" object-cover w-full h-full"
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
