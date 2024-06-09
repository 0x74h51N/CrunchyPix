'use client';
import LoadingComponent from '@/components/Loading';
import LogoSlider from '../../Slider/LogoSlide';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { LogoSlideSchema, LogoSlideType } from '@/schemas';
import { motion } from 'framer-motion';
import { slideIn } from '@/utils/motion';
import { generateSpans } from '@/components/GenerateSpans';
import { useTranslation } from 'react-i18next';

const LogoSect = () => {
  const { data, loading } = useSupabaseFetch<LogoSlideType>(
    'public',
    'logo_slide',
    '*',
    LogoSlideSchema,
  );
  const { t } = useTranslation('home');
  if (loading) {
    return <LoadingComponent />;
  }
  if (data) {
    return (
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
              text: `${t('logoSect.title')}`,
              colorType: 'vibrantColors',
              zeroColor: '#FFFFFF',
            })}
          </motion.h1>
        </div>
        <div className="w-full h-auto flex flex-row justify-center items-center py-3 bg-neutral-950 z-20">
          <LogoSlider data={data.sort((a, b) => a.id - b.id)} />
        </div>
      </div>
    );
  }
};

export default LogoSect;
