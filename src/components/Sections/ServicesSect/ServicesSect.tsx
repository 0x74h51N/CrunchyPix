'use client';
import { Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RootState } from '@/store';
import { polygonIn } from '@/utils/motion';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import useDragHandler from '@/hooks/useDragHandler';
import useFilteredData from '@/hooks/useFilteredData';
import { CardsTypes, SectionsTypes } from '@/lib/schemas';
import TitleText from '../TitleText';
import { memo, useEffect, useMemo, useRef } from 'react';
import SwiperCore from 'swiper';
import dynamic from 'next/dynamic';

const CardMaker = dynamic(() => import('@/components/CardMaker'), {
  ssr: false,
});

const ServicesSect = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const serviceSect = useFilteredData<SectionsTypes>(
    (state: RootState) => state.section.items,
    {
      key: 'name',
      value: 'service_sect',
    },
  );

  const { hoverStart, hoverEnd } = useDragHandler();
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const pagination = {
    el: '.custom-pagy',
    clickable: true,
  };
  const navigation = {
    nextEl: '.swiper-button-next-cus',
    prevEl: '.swiper-button-prev-cus',
  };
  const breakpoints = useMemo(
    () => ({
      640: { slidesPerView: 1.5 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2.5 },
      1280: { slidesPerView: 3 },
    }),
    [],
  );
  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [breakpoints]);

  const slides = useMemo(
    () =>
      serviceSect[0].translations[0].cards?.map(
        (section: CardsTypes, index: number) => (
          <SwiperSlide key={index} className="w-[320px] h-[520px] swiper-lazy">
            <CardMaker
              key={index + ' card'}
              cardSections={section}
              cardWidth={320}
              cardHeight={520}
              className="cursor-none"
            />
          </SwiperSlide>
        ),
      ),
    [serviceSect],
  );
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[100svh]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 'some' }}
        variants={polygonIn('screen', 'spring', 0.7, 2.2)}
        className="flex flex-col items-start h-full w-auto md:p-16 xs:p-6 xs:py-10 p-4 z-10 mt-14 rounded-lg 2xl:ml-36 bg-neutral-900 shadow-lg relative"
      >
        <div className="max-sm:ml-5 md:mb-3">
          <TitleText sectName="service_sect" />
        </div>
        <div
          className="flex flex-wrap justify-center gap-8 w-auto relative"
          onMouseEnter={hoverStart}
          onMouseLeave={hoverEnd}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination, Navigation]}
            breakpoints={breakpoints}
            spaceBetween={30}
            centeredSlides
            initialSlide={1}
            loop
            pagination={pagination}
            navigation={navigation}
            className="xl:w-[1030px] lg:w-[900px] md:w-[680px] sm:w-[500px] w-[340px] h-auto !cursor-none"
          >
            {slides}
          </Swiper>
        </div>
        <div className="absolute swiper-button-next-cus top-10 right-1 h-full w-[50px] bg- z-50 ">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="swiper-button-next !cursor-none"
          />
        </div>
        <div className="absolute swiper-button-prev-cus top-10 left-1 h-full w-[50px] bg- z-50 ">
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="swiper-button-prev !cursor-none"
          />
        </div>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 'some' }}
        variants={polygonIn('down', 'spring', 0.7, 2.2)}
        className="custom-pagy !cursor-none absolute left-0 bottom-0 z-30 flex 2xl:flex-col flex-row justify-center items-center h-auto 2xl:min-h-[100svh] 
        w-full 2xl:max-w-[180px] 2xl:bg-neutral-900 2xl:p-40 lg:p-10 p-8 2xl:gap-8 gap-4"
      />
    </div>
  );
};

export default memo(ServicesSect);
