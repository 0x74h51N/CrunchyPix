'use client';
import { motion } from 'framer-motion';
import { generateSpans } from '@/components/GenerateSpans';
import { slideIn } from '@/utils/motion';
import dynamic from 'next/dynamic';
import LoadingComponent from '@/components/Loading';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { useTranslation } from 'react-i18next';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';

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
  const { t } = useTranslation('portfolio');
  const { data, loading, error } = useSupabaseFetch<PortfolioItemProps>(
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );

  if (loading) return <LoadingComponent />;
  if (error) console.log(error);

  return (
    data && (
      <div className="h-auto flex flex-col items-center justify-center w-full">
        <div className="flex flex-col text-center">
          <motion.h1
            variants={slideIn('up', 'spring', 0.5, 1.4)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 'all' }}
            className="text-stone-200 font-black md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[60px] z-auto"
          >
            {generateSpans({
              text: `${t('projectSlides.title')}`,
              colorType: 'vibrantColors',
              zeroColor: '#FFFFFF',
            })}
          </motion.h1>
        </div>
        <div className="w-full h-auto min-w-[100sv] z-0 bg-cool-gray-800">
          <CarouselSlider slides={data} />
        </div>
        <div className="z-50">
          <SlideModal />
        </div>
      </div>
    )
  );
};

export default PortfolioSect;
