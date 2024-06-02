'use client';
import { PortfolioItemProps } from '../common.types';
import { portfolioPageItems } from '@/constants/portfolioItems';
import PortfolioItem from './components/PortfolioItem';
import { polygonIn } from '@/utils/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Portfolio = () => {
  const [searchParam, setSearchParam] = useState('');
  const { t } = useTranslation('portfolio');
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width,
  );

  const filteredItems = portfolioPageItems.filter(
    (item: PortfolioItemProps) => {
      const title = t(item.title).toLowerCase();
      const type = item.projectType ? t(item.projectType).toLowerCase() : '';
      return (
        title.includes(searchParam) ||
        type.includes(searchParam) ||
        item._id.toLowerCase().includes(searchParam)
      );
    },
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 'some' }}
      variants={polygonIn('screen', 'easeInOut', 0.5, 1.5)}
      className=" h-auto w-auto flex flex-col justify-center items-center min-w-screen mt-8 mb-40"
    >
      <div className="w-auto">
        <div className="flex flex-row md:justify-end justify-center w-full">
          <input
            id="search"
            type="text"
            alt="search-box"
            onChange={(e) =>
              setSearchParam(e.target.value.toLowerCase().trim())
            }
            placeholder={t('search')}
            className="p-2 contactBox max-w-[16rem] focus:border-log-col focus:shadow-inner"
          />
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1 h-auto overflow-hidden md:gap-14 gap-0 pb-10 pt-4 transition-all ease-in-out duration-300 xl:min-w-[1316px] lg:min-w-[630px] md:min-w-[300px] min-h-[60vh]">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item: PortfolioItemProps, index: number) => {
                const initial =
                  screenWidth > 1280
                    ? index > 1
                      ? { y: 30, x: 0 }
                      : { y: 0, x: 30 }
                    : { y: 30, x: 0 };
                const exit =
                  screenWidth > 1280
                    ? index > 1
                      ? { y: -30, x: 0 }
                      : { y: 0, x: -30 }
                    : { y: -30, x: 0 };

                return (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, ...initial }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, ...exit }}
                    transition={{ duration: 0.3 }}
                  >
                    <PortfolioItem
                      _id={item._id}
                      key={index}
                      image={item.image}
                      imageAlt={item.imageAlt}
                      title={item.title}
                      projectType={item.projectType}
                      slideImage={''}
                      slideDescription={''}
                      width={630}
                      height={500}
                      isSlide={false}
                    />
                  </motion.div>
                );
              })
            ) : (
              <div className="flex md:flex-row flex-col justify-start md:items-end items-center h-[350px] max-w-[550px]">
                <Image
                  width={300}
                  height={300}
                  src="/cat.png"
                  alt={'Cat photo'}
                  className="object-contain max-md:scale-75"
                />
                <p className="w-full h2 pb-20">{t('noItem')}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;
