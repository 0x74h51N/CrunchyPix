import React, { useEffect, useRef, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import ArrowButton from "./Button";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { slides } from "@/constants";
import { useTranslation } from "react-i18next";

const FullScreenSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation(["translation"]);
  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex(0);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Swiper
        cssMode={true}
        navigation={true}
        loop
        onSlideChange={onSlideChange}
        centeredSlides={true}
        autoplay={{
          delay: 15000,
          disableOnInteraction: false,
        }}
        speed={5000}
        modules={[Navigation, Autoplay, Pagination]}
        className="w-full h-full flex flex-center justify-center  text-center bg-stone-900"
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <SwiperSlide>
              <div className="h-full">
                <Image
                  src={slide.imageUrl}
                  alt={"Image"}
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  className="z-0"
                ></Image>
                <div
                  className={`${
                    activeIndex === index ? "animate-slideLeft" : ""
                  } opacity-0 absolute bottom-24 right-0 w-auto h-auto flex flex-col justify-center items-center bg-stone-700 bg-opacity-10 rounded-bl-xl rounded-tl-xl hover:bg-opacity-60 hover:transition-opacity duration-300 z-30 px-24 py-14 backdrop-blur-sm`}
                >
                  <p className="text-start text-stone-200 text-xl font-medium">
                    {t(slide.title)}
                  </p>
                  <p className="text-start text-stone-200 text-l font-normal mt-2 max-w-sm">
                    {t(slide.description)}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </div>
        ))}
        <div className="absolute  bottom-0 w-full items-center z-30">
          <ArrowButton
            index={1}
            arrow={true}
            className="opacity-50 hover:opacity-100 transition-opacity animate-my-bounce-slow z-10"
          />
        </div>
      </Swiper>
    </>
  );
};

export default FullScreenSlider;
