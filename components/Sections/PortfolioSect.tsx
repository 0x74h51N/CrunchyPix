"use client";
import React, { useEffect } from "react";
import PhoneFrame from "../PhoneFrame";
import FullScreenSlider from "../Slider/FullScreenSlider";
import { useTranslationWithLoader } from "@/utils/i18nUtils";

const PortfolioSect = () => {
  const { t, isTranslationsLoaded } = useTranslationWithLoader();
  if (!isTranslationsLoaded) {
    return null;
  }
  return (
    <div className="h-auto min-h-screen flex flex-row items-center justify-center ">
      <div className="box flex flex-col items-start justify-start overflow-auto w-full h-full">
        <PhoneFrame>
          <FullScreenSlider className="w-full h-full object-cover rounded-[42px]" />
        </PhoneFrame>
      </div>
    </div>
  );
};

export default PortfolioSect;
