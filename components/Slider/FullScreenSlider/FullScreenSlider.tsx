import React, { useEffect, useState } from 'react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import SlideCreator from './SlideCreator';
import { slide } from '@/app/common.types';
import { motion } from 'framer-motion';
import useDragHandler from '@/hooks/useDragHandler';

interface FullScreenSlideProps {
  slides: slide[];
  className: string;
}

const FullScreenSlider = ({ slides, className }: FullScreenSlideProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };
  const { hoverStart, hoverEnd } = useDragHandler();
  useEffect(() => {
    const timeout = setTimeout(() => {
      setActiveIndex(0);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="w-full h-full flex flex-center justify-center "
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
    >
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
        className={` text-center bg-stone-900 ${className} cursor-none`}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideCreator
              imageUrl={slide.imageUrl && slide.imageUrl}
              active={activeIndex === index}
              left={slide.left}
            >
              {slide.children}
            </SlideCreator>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default FullScreenSlider;
