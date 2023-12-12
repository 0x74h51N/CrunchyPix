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
import { memo, useEffect, useState } from "react";
import IconButton from "@/components/Buttons/IconButton";
import { sliderChange } from "@/store/redux/isSlider";
import { motion } from "framer-motion";

SwiperCore.use([Autoplay, EffectCoverflow]);

interface CarouselSliderProps {
  slides: slide[];
}

const CarouselSlider = memo(({ slides }: CarouselSliderProps) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    return 0;
  });
  const isSlider = useSelector((state: RootState) => state.isSlider.slider);
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
  const hoverHandler = () => {
    if (isSlider == false) {
      dispatch(sliderChange(true));
    } else if (isSlider == true) {
      dispatch(sliderChange(false));
    }
  };

  return (
    <motion.div
      onHoverStart={hoverHandler}
      onHoverEnd={hoverHandler}
      className="h-auto"
    >
      <Swiper
        effect="coverflow"
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
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        className="h-auto min-h-[500px] cursor-none"
      >
        {slides.map((slide: slide, index: number) => (
          <SwiperSlide key={index + 1}>
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
    </motion.div>
  );
});

export default CarouselSlider;
