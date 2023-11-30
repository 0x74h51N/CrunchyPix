"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import Label from "../../Labels";
import { slide } from "@/app/common.types";
import { useDispatch, useSelector } from "react-redux";
import { setSlide } from "@/store/redux/selectedSlide";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { useEffect, useState } from "react";
import IconButton from "../../IconButton";

SwiperCore.use([Autoplay, EffectCoverflow]);

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
  const _selectedSlide = (slide: slide) => {
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
    <div className="h-auto">
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={isMobile ? 1.2 : isTablet ? 1.5 : 2}
        spaceBetween={0}
        loop
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 3,
          slideShadows: false,
        }}
        onSlideChange={onSlideChange}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        className="h-auto min-h-[500px]"
      >
        {slides.map((slide: slide, index: number) => (
          <SwiperSlide key={index}>
            <div
              className={`relative ${
                isTablet && !isMobile ? "h-[340px]" : "h-[485px]"
              } w-auto shadow-2xl shadow-black`}
              onClick={() => index === activeIndex && _selectedSlide(slide)}
            >
              <Image
                loading="lazy"
                src={slide.imageUrl || ""}
                alt={slide.title || ""}
                width="1000"
                height="1000"
                className="object-cover w-full h-full my-5"
                quality={100}
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                <h2 className="text-lg font-bold">{t(`${slide.title}`)}</h2>
                <p className="text-[12px] overflow-hidden overflow-ellipsis line-clamp-1">
                  {t(`${slide.description}`)}
                </p>
                <div className="flex">
                  <div className="flex flex-wrap items-start mr-auto">
                    {slide.labels &&
                      slide.labels.map((label, labelIndex) => (
                        <Label
                          key={`label-${index}-${labelIndex}`}
                          text={label}
                        />
                      ))}
                  </div>
                  <div className="flex items-end gap-2">
                    {slide.icons &&
                      slide.icons.map((icon, iconIndex) => (
                        <IconButton
                          key={`icon-${index}-${iconIndex}`}
                          icon={icon}
                        />
                      ))}
                  </div>
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
