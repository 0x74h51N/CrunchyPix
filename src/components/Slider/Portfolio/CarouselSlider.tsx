'use client';
import { PortfolioItemProps } from '@/lib/schemas';
import { useEffect, useMemo, useRef, useState } from 'react';
import SwiperCore from 'swiper';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideMaker from './SlideMaker';

SwiperCore.use([Autoplay, EffectCoverflow]);

const CarouselSlider = ({
  slides,
  setSelectedSlide,
}: {
  slides: PortfolioItemProps[];
  setSelectedSlide: React.Dispatch<
    React.SetStateAction<PortfolioItemProps | undefined>
  >;
}) => {
  const filteredSlides = useMemo(
    () => slides.filter((slide) => !slide.catalogue),
    [slides],
  );
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    return 0;
  });

  const onSlideChange = (swiper: SwiperCore) => {
    setActiveIndex(swiper.realIndex);
  };

  const breakpoints = useMemo(
    () => ({
      0: {
        slidesPerView: 1.2,
      },
      640: {
        slidesPerView: 1.5,
      },
      1020: {
        slidesPerView: 2,
      },
    }),
    [],
  );
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [breakpoints]);

  const carouselSlides = useMemo(
    () =>
      filteredSlides.map((slide: PortfolioItemProps, index: number) => (
        <SwiperSlide key={index + 1}>
          <SlideMaker
            index={index}
            activeIndex={activeIndex}
            slide={slide}
            setState={setSelectedSlide}
          />
        </SwiperSlide>
      )),
    [filteredSlides, activeIndex],
  );

  return (
    <div className="overflow-visible z-50 h-full">
      <Swiper
        onInit={(swiper) => (swiperRef.current = swiper)}
        effect="coverflow"
        centeredSlides
        breakpoints={breakpoints}
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
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1500}
        className="cursor-none h-full"
      >
        {carouselSlides}
      </Swiper>
    </div>
  );
};
export default CarouselSlider;
