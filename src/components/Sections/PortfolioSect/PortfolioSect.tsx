'use client';
import { motion } from 'framer-motion';
import { slideIn } from '@/utils/motion';
import dynamic from 'next/dynamic';
import LoadingComponent from '@/components/Loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { memo, useMemo } from 'react';
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
  const portfolioItems = useSelector(
    (state: RootState) => state.portfolio.items,
  );
  const extendedPortfolioItems = useMemo(() => {
    return [...portfolioItems, ...portfolioItems];
  }, [portfolioItems]);
  return (
    portfolioItems && (
      <div className="h-auto flex flex-col items-center justify-center w-full">
        <div className="flex flex-col text-center">
          <motion.div
            variants={slideIn('up', 'spring', 0.5, 1.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 'all' }}
          >
            <TitleText sectName="portfolio_sect" />
          </motion.div>
        </div>
        <div className="w-full sm:h-[700px] h-[580px] min-w-[100sv] z-0 max-w-[2200px]">
          <CarouselSlider slides={extendedPortfolioItems} />
        </div>
        <div className="z-50">
          <SlideModal />
        </div>
      </div>
    )
  );
};

export default memo(PortfolioSect);
