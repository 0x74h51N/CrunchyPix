'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PortfolioItemProps } from '@/schemas';
import { setPortfolioItems } from '@/store/redux/portfolioItems';
import { getLocale } from '@/i18n/client';
import filterByLanguage from '@/lib/utils/filterByLanguage';

interface PortfolioDataStoreProps {
  portfolioItems: PortfolioItemProps[];
}

const PortfolioDataStore = ({ portfolioItems }: PortfolioDataStoreProps) => {
  const language = getLocale();
  const dispatch = useDispatch();

  useEffect(() => {
    const filteredItems = filterByLanguage({
      items: portfolioItems.sort((a, b) => a.id - b.id),
      language,
      localPath: 'project_overview',
    });
    dispatch(setPortfolioItems(filteredItems));
  }, [portfolioItems, language, dispatch]);

  return null;
};

export default PortfolioDataStore;
