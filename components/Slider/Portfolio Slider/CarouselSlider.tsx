"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {
  EffectCoverflow,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import Label from "../../Labels";
import GitHubButton from "./Child/githubButton";
import { slide } from "@/app/common.types";
import { useDispatch, useSelector } from "react-redux";
import { setSlide } from "@/store/redux/selectedSlide";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { useEffect, useState } from "react";

SwiperCore.use([EffectCoverflow, Navigation]);

interface CarouselSliderProps {
  slides: slide[];
}

const CarouselSlider = ({ slides }: CarouselSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { t } = useTranslation(["translation"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const selectedSlide = (slide: slide) => {
    dispatch(setSlide(slide));
  };

  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }

  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="h-auto ">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={isMobile ? 1.2 : isTablet ? 1.5 : 2}
        spaceBetween={0}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 3,
          slideShadows: false,
        }}
        initialSlide={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        onSlideChange={onSlideChange}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        className="min-h-[650px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`relative ${
                isTablet && !isMobile ? "h-[340px]" : "h-[480px]"
              } w-auto shadow-2xl shadow-black`}
              onClick={() => index === activeIndex && selectedSlide(slide)}
            >
              <Image
                loading="lazy"
                src={slide.imageUrl || ""}
                alt={slide.title || ""}
                layout="fill"
                objectFit="cover"
                quality={100}
                className="w-auto h-full my-5"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                <h2 className="text-lg font-bold">{t(`${slide.title}`)}</h2>
                <p className="text-[12px] overflow-hidden overflow-ellipsis line-clamp-1">
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
