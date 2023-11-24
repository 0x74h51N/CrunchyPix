"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import Label from "../Labels";
import GitHubButton from "./githubButton";
import { slide } from "@/app/common.types";
import { useDispatch } from "react-redux";
import { setSlide } from "@/store/redux/selectedSlide";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import LoadingComponent from "../Loading";

SwiperCore.use([EffectCoverflow, Navigation]);

interface CarouselSliderProps {
  slides: slide[];
}

const CarouselSlider = ({ slides }: CarouselSliderProps) => {
  const { t } = useTranslation(["translation"]);

  const dispatch = useDispatch();

  const selectedSlide = (slide: slide) => {
    dispatch(setSlide(slide));
    console.log(slide);
  };

  return (
    <div className=" h-auto">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={3}
        spaceBetween={0}
        loop
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 0.5,
          slideShadows: true,
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative shadow-2xl shadow-black"
              onClick={() => selectedSlide(slide)}
            >
              <Image
                loading="lazy"
                src={slide.imageUrl || ""}
                alt={slide.title || ""}
                width={1000}
                height={1000}
                quality={100}
                className="w-full h-auto my-5"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                <h2 className="text-lg font-bold">{t(`${slide.title}`)}</h2>
                <p className="text-[13px] font-extralight overflow-hidden overflow-ellipsis line-clamp-1">
                  {t(`${slide.description}`)}
                </p>
                <div className="flex flex-wrap">
                  {slide.labels &&
                    slide.labels.map((label, labelIndex) => (
                      <Label key={labelIndex} text={label} />
                    ))}
                  {slide.githubLink && (
                    <GitHubButton githubLink={slide.githubLink} />
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarouselSlider;
