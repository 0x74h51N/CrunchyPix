'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { PortfolioItemProps } from '@/schemas';
import SlideMaker from './SlideMaker';

SwiperCore.use([Autoplay, EffectCoverflow]);

const CarouselSlider = ({ slides }: { slides: PortfolioItemProps[] }) => {
  const filteredSlides = useMemo(
    () => slides.filter((slide) => !slide.catalogue),
    [slides],
  );
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    return 0;
  });

  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  const breakPoints = useMemo(
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
  }, [breakPoints]);
  const carouselSlides = useMemo(
    () =>
      filteredSlides.map((slide: PortfolioItemProps, index: number) => (
        <SwiperSlide key={index + 1}>
          <SlideMaker index={index} activeIndex={activeIndex} slide={slide} />
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
        breakpoints={breakPoints}
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
export default memo(CarouselSlider);
