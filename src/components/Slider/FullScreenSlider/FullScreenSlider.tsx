import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SlideCreator from './SlideCreator';
import { slide } from '@/lib/types/common.types';
import { motion } from 'framer-motion';
import useDragHandler from '@/hooks/useDragHandler';

interface FullScreenSlideProps {
  slides: slide[];
  className: string;
}

const FullScreenSlider = ({ slides, className }: FullScreenSlideProps) => {
  const { hoverStart, hoverEnd } = useDragHandler();

  return (
    <motion.div
      className="w-full h-full flex flex-center justify-center "
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop
        centeredSlides={true}
        className={`text-center bg-stone-900 ${className} !cursor-none`}
        lazyPreloadPrevNext={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideCreator imageUrl={slide.imageUrl!}></SlideCreator>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default FullScreenSlider;
