'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import LogoImage from '../LogoImage';
import { LogoSlideType } from '@/schemas';

const LogoSlider = ({ data }: { data: LogoSlideType[] }) => {
  SwiperCore.use([Autoplay]);

  const breaks = {
    640: {
      slidesPerView: 6,
    },
    768: {
      slidesPerView: 8,
    },
    1024: {
      slidesPerView: 10,
    },
    1280: {
      slidesPerView: 12,
    },
  };

  return (
    <Swiper
      freeMode={true}
      loop
      spaceBetween={0}
      slidesPerView={4}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: false,
      }}
      speed={2000}
      breakpoints={breaks}
      className="w-full h-auto cursor-none"
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-[84px] h-[84px] max-lg:w-[70px] max-lg:h-[70px] max-sm:w-[55px] max-sm:h-[55px] flex justify-center my-8 grayscale">
            <LogoImage logoKey={item.logo_name} index={index} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;
