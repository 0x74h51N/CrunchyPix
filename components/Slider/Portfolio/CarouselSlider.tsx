'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import Label from '../../Labels';
import { useDispatch } from 'react-redux';
import { setSlide } from '@/store/redux/selectedSlide';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import IconButton from '@/components/Buttons/IconButton';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import useDragHandler from '@/hooks/useDragHandler';
import { PortfolioItemProps } from '@/schemas';

SwiperCore.use([Autoplay, EffectCoverflow]);

const CarouselSlider = memo(({ slides }: { slides: PortfolioItemProps[] }) => {
  const filteredSlides = slides.filter((slide) => !slide.catalogue);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    return 0;
  });
  const dispatch = useDispatch();
  const { hoverStart, hoverEnd } = useDragHandler();
  const _selectedSlide = (_slide: PortfolioItemProps) => {
    dispatch(setSlide(_slide));
    hoverEnd();
  };

  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  const clickHandler = (index: number, slide: PortfolioItemProps) => {
    if (index === activeIndex) {
      _selectedSlide(slide);
    }
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

  return (
    <motion.div
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      className="h-auto overflow-visible z-50"
    >
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
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        className="h-auto cursor-none "
      >
        {filteredSlides.map((slide: PortfolioItemProps, index: number) => (
          <SwiperSlide key={index + 1}>
            <div
              key={index}
              className={`relative md:w-[640px] w-auto 2xl:w-[1020px] xl:w-[850px] lg:w-[750px] max-md:h-[450px] h-auto shadow-2xl shadow-black lg:my-8 my-4`}
              onClick={() => clickHandler(index, slide)}
            >
              <CldImage
                src={`crunchypix/PortfolioSlides/${slide._id}` || ''}
                alt={slide._id}
                width="1000"
                height="1000"
                className="object-cover w-full h-full"
                quality="auto"
                fetchPriority="auto"
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                <h2 className="text-lg font-bold">
                  {slide.project_overview && slide.project_overview[0].title}
                </h2>
                <div className="flex">
                  <div className="flex flex-wrap items-start mr-auto">
                    {slide.tech &&
                      slide.tech.map((label, labelIndex) => (
                        <Label
                          key={`label-${index}-${labelIndex}`}
                          text={label}
                        />
                      ))}
                  </div>
                  <div className="flex items-end gap-2">
                    {slide.icons &&
                      Object.entries(slide.icons).map(
                        ([key, icon], iconIndex) => (
                          <span key={iconIndex} className="lg:text-2xl text-xl">
                            <IconButton
                              key={`icon-${index}-${key}`}
                              icon={icon}
                            />
                          </span>
                        ),
                      )}
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
CarouselSlider.displayName = 'CarouselSlider';
export default CarouselSlider;
