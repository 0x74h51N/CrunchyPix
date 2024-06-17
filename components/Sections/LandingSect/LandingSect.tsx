'use client';
import { slideIn, staggerContainer, polygonIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { generateSpans } from '../../GenerateSpans';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { SocialIcons } from '../../SocialIcons';
import TypingText from '../../typeText';
import useFilteredData from '@/hooks/useFilteredData';
import { IconProps, IconSchema, SectionsTypes } from '@/schemas';
import { memo, useMemo } from 'react';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import FsLoading from '@/components/Loading/FsLoading';

const LandingSect = () => {
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const landSect = useFilteredData<SectionsTypes>(
    (state: RootState) => state.section.items,
    {
      key: 'name',
      value: 'landing_sect',
    },
  );
  const { data, loading, error } = useSupabaseFetch<IconProps>(
    'public',
    'social_icons',
    `*`,
    IconSchema,
  );
  if (error) {
    console.log(error);
  }
  const filteredData = useMemo(() => {
    return data && data.length > 1 && data.sort((a, b) => b.id - a.id).slice(3);
  }, [data]);
  return loading || !data || !filteredData ? (
    <FsLoading />
  ) : (
    <>
      <motion.div
        variants={staggerContainer(2, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={`anaDiv relative flex flex-wrap justify-center items-center w-full min-h-[100dvh] overflow-hidden`}
      >
        <div
          className={`w-full flex flex-col text-center justify-center items-center p-8 max-xs:px-4 z-0 md:pb-40 pb-[220px]`}
        >
          <div
            className={`font-medium lg:text-[40px] sm:text-[30px] text-[25px] text-white`}
          >
            <TypingText
              generateSpan={isTouchDevice ? false : true}
              text={landSect[0].translations[0].intro}
              typingSpeed={50}
              colorType="vibrantColors"
            />
          </div>
          <div className=" lg:text-[19px] text-[18px] leading-[30px] max-lg:leading-[20px] whitespace-pre-wrap text-white">
            <TypingText
              generateSpan={isTouchDevice ? false : true}
              text={landSect[0].translations[0].description ?? 'null'}
              typingSpeed={50}
              colorType="vibrantColors"
              delay={700}
            />
          </div>

          <motion.h1
            variants={slideIn('up', 'spring', 2, 1.5)}
            className="font-black text-white md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[40px] mt-2"
          >
            {isTouchDevice
              ? landSect[0].translations[0].title
              : generateSpans({
                  text: landSect[0].translations[0].title,
                  colorType: 'vibrantColors',
                })}
          </motion.h1>
        </div>
        <motion.div
          variants={polygonIn('down', 'spring', 2, 2.5)}
          className={`absolute h-full w-full  pointer-events-none max-md:pb-10 pt-0 pb-0 lg:z-0 z-30`}
        >
          <SocialIcons
            colorful={true}
            _colorType={'vibrantColors'}
            iconPack={filteredData}
          />
        </motion.div>
      </motion.div>
    </>
  );
};
export default memo(LandingSect);
