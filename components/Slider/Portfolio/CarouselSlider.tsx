'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import Label from '../../Labels';
import { useDispatch, useSelector } from 'react-redux';
import { setSlide } from '@/store/redux/selectedSlide';
import { RootState } from '@/store';
import { memo, useState } from 'react';
import IconButton from '@/components/Buttons/IconButton';
import { motion } from 'framer-motion';
import { CldImage } from 'next-cloudinary';
import useDragHandler from '@/hooks/useDragHandler';
import { disableScroll } from '@/utils/scrollEventControl';
import i18next from 'i18next';
import { PortfolioItemProps } from '@/schemas';

SwiperCore.use([Autoplay, EffectCoverflow]);

const CarouselSlider = memo(({ slides }: { slides: PortfolioItemProps[] }) => {
  const filteredSlides = slides.filter((slide) => !slide.catalogue);
  const [activeIndex, setActiveIndex] = useState(() => {
    return 0;
  });
  const dispatch = useDispatch();
  const language = i18next.language;
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height,
  );
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
      disableScroll();
    }
  };

  return (
    <motion.div
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      className="h-auto overflow-visible z-50"
    >
      <Swiper
        effect="coverflow"
        centeredSlides
        slidesPerView={
          isMobile ? (screenHeight < 500 ? 1.7 : 1.2) : isTablet ? 1.5 : 2
        }
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
              className={`relative  ${
                isTablet && !isMobile
                  ? 'h-[340px]'
                  : screenHeight < 500
                    ? 'h-[300px]'
                    : 'h-[485px]'
              } w-auto shadow-2xl shadow-black lg:my-8 my-4`}
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
                  {slide.translations[language].title}
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
