import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowButton from "./Button";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { slides } from "@/constants/index";
import { useTranslation } from "react-i18next";
import SlideCreator from "./SlideCreator";

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
          <SwiperSlide key={index}>
            <SlideCreator
              title={t(slide.title)}
              description={t(slide.description)}
              imageUrl={slide.imageUrl}
              active={activeIndex === index}
              left={slide.left}
              children={slide.children}
            />
          </SwiperSlide>
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
