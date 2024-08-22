'use client';
import { slide } from '@/types/common.types';
import React, { memo, useMemo } from 'react';
import FullScreenSlider from '../../Slider/FullScreenSlider/FullScreenSlider';
import { motion } from 'framer-motion';
import { slideIn } from '@/utils/motion';
import PhoneFrame from '@/components/Frames/PhoneFrame/PhoneFrame';
import { phoneSlides } from '@/constants/phoneSlides';
import TitleText from '../TitleText';

const DesignSect = () => {
  const slides = useMemo(() => {
    const repeatCount = 2;
    return Array(repeatCount).fill(phoneSlides).flat().map((slide: slide) => ({
      imageUrl: slide.imageUrlV,
      title: slide.title,
      description: slide.description,
    }));
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="flex 2xl:flex-row flex-col-reverse xl:justify-between justify-center items-center w-full h-full 2xl:pl-20 pl-0 2xl:gap-[100px] xl:gap-24 gap-4 max-xl:my-10"
    >
      <div className={`flex flex-wrap gap-10 p-6 w-auto h-auto`}>
        <div
          className={`flex flex-wrap items-center justify-center xl:h-[600px] h-auto z-10 w-[500px]`}
        >
          <motion.div
            variants={slideIn('left', 'spring', 0, 0)}
            className="duration-500 delay-500"
          >
            <PhoneFrame>
              <FullScreenSlider
                slides={slides}
                className={`w-full h-full object-cover md:rounded-[42px] rounded-2xl`}
              />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
      <motion.div
        variants={slideIn('right', 'spring', 0, 0)}
        className="flex flex-col h-auto 2xl:min-h-[700px] 2xl:max-w-[1000px] xl:items-end justify-center 2xl:p-20 lg:p-14 md:p-10 max-sm:px-4 p-8 bg-cool-gray-800 2xl:rounded-l-3xl duration-500 delay-500"
      >
        <TitleText sectName="design_sect" />
      </motion.div>
    </motion.div>
  );
};

export default memo(DesignSect);
