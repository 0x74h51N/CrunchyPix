'use client';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { setPortfolioItems } from '@/store/redux/portfolioItems';
import i18next from '@/i18n/client';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { useTranslation } from 'react-i18next';

const PortfolioDataStore = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { data, loading, error } = useSupabaseFetch<PortfolioItemProps>(
    'portfolio_schema',
    'portfolio_items',
    '*, icons(*), project_overview(*)',
    PortfolioItemSchema,
  );

  const updatePortfolioItems = useCallback(
    (language: string) => {
      if (data && !loading && !error) {
        const filteredItems = filterByLanguage({
          items: data.sort((a, b) => a.id - b.id),
          language,
          localPath: 'project_overview',
        });

        if (filteredItems && filteredItems.length > 0) {
          dispatch(setPortfolioItems(filteredItems));
        }
      }
    },
    [data, loading, error, dispatch],
  );

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      updatePortfolioItems(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, updatePortfolioItems]);

  useEffect(() => {
    updatePortfolioItems(i18next.language);
  }, [data, loading, error, i18next.language, updatePortfolioItems]);

  return <></>;
};

export default PortfolioDataStore;
