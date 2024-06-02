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
import FilterItems from './components/FilterItems';
import PortfolioItemsTable from './components/PortfolioItemsTable';

const Portfolio = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 'some' }}
        variants={polygonIn('screen', 'easeInOut', 0.5, 1.5)}
        className=" h-auto w-auto flex flex-col justify-center items-center min-w-screen mt-8 mb-40"
      >
        <PortfolioItemsTable />
      </motion.div>
    </AnimatePresence>
  );
};

export default Portfolio;
