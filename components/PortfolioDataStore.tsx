'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PortfolioItemProps } from '@/schemas';
import { setPortfolioItems } from '@/store/redux/portfolioItems';
import i18next from 'i18next';

interface PortfolioDataStoreProps {
  portfolioItems: PortfolioItemProps[];
}

const filterByLanguage = (items: PortfolioItemProps[], language: string) => {
  return items
    .map((item) => {
      const filteredOverview = item.project_overview.find(
        (overview) => overview.lang === language,
      );
      if (filteredOverview) {
        return { ...item, project_overview: [filteredOverview] };
      }
      return null;
    })
    .filter((item) => item !== null) as PortfolioItemProps[];
};

const PortfolioDataStore = ({ portfolioItems }: PortfolioDataStoreProps) => {
  const language = i18next.language || 'en';
  const dispatch = useDispatch();
  const [translated, setTranslated] = useState<PortfolioItemProps[]>([]);

  useEffect(() => {
    setTranslated(
      filterByLanguage(
        portfolioItems.sort((a, b) => a.id - b.id),
        language,
      ),
    );
  }, [portfolioItems, language]);

  useEffect(() => {
    console.log(translated);
    dispatch(setPortfolioItems(translated));
  }, [dispatch, translated]);

  return null;
};

export default PortfolioDataStore;
