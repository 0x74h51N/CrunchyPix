'use client';
import LoadingComponent from '@/components/Loading/Loading';
import { PortfolioItemProps } from '@/lib/schemas';
import { RootState } from '@/store';
import { slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import TitleText from '../TitleText';

const CarouselSlider = dynamic(
  () => import('@/components/Slider/Portfolio/CarouselSlider'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden z-50 bg-black">
        <LoadingComponent />
      </div>
    ),
  },
);

const SlideModal = dynamic(
  () => import('@/components/Slider/Portfolio/Child/SlideModal'),
);

const PortfolioSect = () => {
  const [selectedSlide, setSelectedSlide] = useState<
    PortfolioItemProps | undefined
  >(undefined);
  const portfolioItems = useSelector(
    (state: RootState) => state.portfolio.items,
  );
  const extendedPortfolioItems = [...portfolioItems, ...portfolioItems];
  return (
    portfolioItems && (
      <div className="h-auto flex flex-col items-center justify-center w-full">
        <motion.div
          variants={slideIn('up', 'spring', 0.5, 1.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 'all' }}
          className="flex flex-col text-center"
        >
          <TitleText sectName="portfolio_sect" />
        </motion.div>
        <div className="w-full md:h-[750px] sm:h-[700px] h-[580px] min-w-[100sv] z-0 max-w-[2200px]">
          <CarouselSlider
            slides={extendedPortfolioItems}
            setSelectedSlide={setSelectedSlide}
          />
        </div>
        <div className="z-50">
          <SlideModal
            selectedSlide={selectedSlide as PortfolioItemProps}
            setState={setSelectedSlide}
          />
        </div>
      </div>
    )
  );
};

export default PortfolioSect;
