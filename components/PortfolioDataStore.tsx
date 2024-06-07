'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PortfolioItemProps } from '@/schemas';
import { setPortfolioItems } from '@/store/redux/portfolioItems';

interface PortfolioDataStoreProps {
  portfolioItems: PortfolioItemProps[];
}

const PortfolioDataStore = ({ portfolioItems }: PortfolioDataStoreProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(portfolioItems);
    dispatch(setPortfolioItems(portfolioItems));
  }, [dispatch, portfolioItems]);

  return null;
};

export default PortfolioDataStore;
