'use client';
import { RootState } from '@/store';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FilterItems from './FilterItems';
import { motion } from 'framer-motion';
import PortfolioItem from './PortfolioItem';
import { CldImage } from 'next-cloudinary';
import { polygonIn } from '@/utils/motion';
import { PortfolioItemProps } from '@/schemas';

const PortfolioItemsTable = ({
  portfolioPageItems,
}: {
  portfolioPageItems: PortfolioItemProps[];
}) => {
  const { t } = useTranslation('portfolio');
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width,
  );
  const [filteredItems, setFilteredItems] =
    useState<PortfolioItemProps[]>(portfolioPageItems);
  useEffect(() => {
    setFilteredItems(portfolioPageItems);
  }, [portfolioPageItems]);
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 'some' }}
      variants={polygonIn('screen', 'easeInOut', 0.5, 1.5)}
      className=" h-auto w-auto flex flex-col justify-center items-center min-w-screen mt-8 mb-40"
    >
      <div className="w-auto">
        <FilterItems
          portfolioPageItems={portfolioPageItems}
          setFilteredItems={setFilteredItems}
        />
        <div className="grid xl:grid-cols-2 grid-cols-1 h-auto overflow-hidden md:gap-14 gap-0 pb-10 pt-4 transition-all ease-in-out duration-300 xl:min-w-[1316px] lg:min-w-[630px] md:min-w-[300px] min-h-[700px]">
          {filteredItems.length > 0 ? (
            filteredItems.map((item: any, index: number) => {
              const initial =
                screenWidth > 1280
                  ? index > 1
                    ? { y: 30, x: 0 }
                    : { y: 0, x: 30 }
                  : { y: 30, x: 0 };

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
                    width={630}
                    height={500}
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
            <div className="flex md:flex-row flex-col justify-start md:items-end items-center h-[350px] md:max-w-[550px] max-w-[350px]">
              <CldImage
                width={300}
                height={300}
                format="avif"
                src="crunchypix/portfolioItems/cat_qth7cg.png"
                alt={'Cat photo'}
                className="object-contain max-md:scale-75"
              />
              <p className="w-full h2 pb-20">{t('noItem')}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(PortfolioItemsTable);
