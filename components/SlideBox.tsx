import React from "react";
interface SlideBoxProps {
  active: boolean;
  title: string;
  description: string;
  left?: boolean;
}

const SlideBox = ({
  active,
  title,
  description,
  left = true,
}: SlideBoxProps) => {
  return (
    active && (
      <div
        className={`${
          left ? "animate-slideLeft right-0" : "animate-slideRight left-0"
        } opacity-0 absolute bottom-24  w-auto h-auto flex flex-col justify-center items-center bg-stone-900 bg-opacity-30 rounded-bl-xl rounded-tl-xl hover:bg-opacity-60 hover:transition-all duration-1000 ease-in-out z-30 px-24 py-14 backdrop-blur-sm`}
      >
        <p className="text-start text-stone-200 text-xl font-medium">{title}</p>
        <p className="text-start text-stone-200 text-l font-normal mt-2 max-w-sm">
          {description}
        </p>
      </div>
    )
  );
};

export default SlideBox;
