'use client';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FilterItems from './FilterItems';
import { motion } from 'framer-motion';
import PortfolioItem from './PortfolioItem';
import { CldImage } from 'next-cloudinary';
import { polygonIn } from '@/utils/motion';
import { PortfolioItemProps } from '@/schemas';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const PortfolioItemsTable = () => {
  const { t } = useTranslation('portfolio');
  const portfolioPageItems = useSelector(
    (state: RootState) => state.portfolio.items,
  );

  const [filteredItems, setFilteredItems] =
    useState<PortfolioItemProps[]>(portfolioPageItems);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 'some' }}
      variants={polygonIn('screen', 'easeInOut', 0.5, 1.5)}
      className="h-auto w-auto flex flexCenter  mt-8 mb-40 lg:px-14 max-w-[1310px] xl:w-full  lg:min-w-[630px] md:min-w-[300px]"
    >
      <div className="w-full">
        <FilterItems
          portfolioPageItems={portfolioPageItems}
          setFilteredItems={setFilteredItems}
        />
        <div className="relative grid xl:grid-cols-2 grid-cols-1 max-md:gap-5 h-auto overflow-hidden md:gap-14 gap-0 pb-10 pt-8 transition-all ease-in-out duration-300 min-h-[850px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item: any, index: number) => {
              const initial = index > 1 ? { y: 30, x: 0 } : { y: 0, x: 30 };

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, ...initial }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  <PortfolioItem
                    _id={item._id}
                    key={index}
                    project_overview={item.project_overview}
                    width={'560px'}
                    height={'500px'}
                    isSlide={false}
                    date={''}
                    catalogue={null}
                    id={index}
                    tech={[]}
                  />
                </motion.div>
              );
            })
          ) : (
            <div className="flex flex-col md:absolute right-0 md:mt-14 md:justify-center justify-start md:items-end items-center h-auto md:max-w-full max-w-[350px] max-sm:px-7">
              <CldImage
                width={550}
                height={550}
                format="avif"
                src="crunchypix/item_not_found_cat"
                alt={'Cat photo'}
                className="object-contain object-center"
              />
              <p className="w-full h2 pb-20 md:pl-14 pl-6 text-end mt-4">
                {t('noItem')}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(PortfolioItemsTable);
