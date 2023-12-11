import React, { useEffect, useState } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import { useTranslation } from "react-i18next";
import SlideCreator from "./SlideCreator";
import { slide } from "@/app/common.types";

interface FullScreenSlideProps {
  slides: slide[];
  className: string;
}

const FullScreenSlider = ({ slides, className }: FullScreenSlideProps) => {
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
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
      }}
      pagination={{
        dynamicBullets: true,
        clickable: true,
      }}
      loop
      onSlideChange={onSlideChange}
      centeredSlides={true}
      speed={700}
      className={`w-full h-full flex flex-center justify-center  text-center bg-stone-900 ${className} cursor-none`}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <SlideCreator
            title={slide.title && t(slide.title)}
            description={slide.description && t(slide.description)}
            imageUrl={slide.imageUrl && slide.imageUrl}
            active={activeIndex === index}
            left={slide.left}
            children={slide.children}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FullScreenSlider;
