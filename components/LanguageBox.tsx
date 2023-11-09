import React from "react";

interface LanguageBoxProps {
  title: string;
  bgColor?: "nav-col";
  textColor?: string;
}

const LanguageBox: React.FC<LanguageBoxProps> = ({
  title,
  bgColor,
  textColor,
}) => {
  return (
    <div
      className={`p-4 flex flex-col justify-center items-center rounded-lg shadow-md w-4 h-4 sm:w-auto sm:h-auto bg-${bgColor} text-${textColor}`}
    >
      {title}
    </div>
  );
};

export default LanguageBox;
export type { LanguageBoxProps };
