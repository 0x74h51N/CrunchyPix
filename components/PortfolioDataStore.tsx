'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import { setPortfolioItems } from '@/store/redux/portfolioItems';
import i18next from '@/i18n/client';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { useTranslation } from 'react-i18next';

const PortfolioDataStore = () => {
  const language = i18next.language;
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { data, loading, error } = useSupabaseFetch<PortfolioItemProps>(
    'portfolio_schema',
    'portfolio_items',
    '*, icons(*), project_overview(*)',
    PortfolioItemSchema,
  );

  useEffect(() => {
    if (data || !error || !loading) {
      const filteredItems =
        data &&
        filterByLanguage({
          items: data.sort((a, b) => a.id - b.id),
          language,
          localPath: 'project_overview',
        });

      if (filteredItems && filteredItems.length > 1) {
        if (i18n.isInitialized) {
          dispatch(setPortfolioItems(filteredItems));
        } else {
          i18n.on('initialized', () => {
            dispatch(setPortfolioItems(filteredItems));
          });
        }
      }
    }
  }, [data, language, dispatch, error, loading, i18n]);
};

export default PortfolioDataStore;
