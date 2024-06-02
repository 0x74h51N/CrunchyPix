import { PortfolioItemProps } from '@/app/common.types';
import { portfolioPageItems } from '@/constants/portfolioItems';
import { RootState } from '@/store';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FilterItems from './FilterItems';
import { motion } from 'framer-motion';
import PortfolioItem from './PortfolioItem';
import { CldImage } from 'next-cloudinary';

const PortfolioItemsTable = () => {
  const { t } = useTranslation('portfolio');
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width,
  );
  const [filteredItems, setFilteredItems] = useState<PortfolioItemProps[]>(
    () => portfolioPageItems,
  );

  return (
    <div className="w-auto">
      <FilterItems setFilteredItems={setFilteredItems} />
      <div className="grid xl:grid-cols-2 grid-cols-1 h-auto overflow-hidden md:gap-14 gap-0 pb-10 pt-4 transition-all ease-in-out duration-300 xl:min-w-[1316px] lg:min-w-[630px] md:min-w-[300px] min-h-[60vh]">
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
                className="flex items-center justify-center"
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
                  date={undefined}
                />
              </motion.div>
            );
          })
        ) : (
          <div className="flex md:flex-row flex-col justify-start md:items-end items-center h-[350px] max-w-[550px]">
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
  );
};

export default PortfolioItemsTable;
