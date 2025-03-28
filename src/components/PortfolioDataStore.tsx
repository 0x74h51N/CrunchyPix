'use client';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import i18next from '@/i18n/client';
import { PortfolioItemProps, PortfolioItemSchema } from '@/lib/schemas';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import { setPortfolioItems } from '@/store/redux/portfolioItems';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

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
        const itemsWithTimestamp = data.map((data) => ({
          ...data,
          timestamp: (() => {
            const [y, m, d] = data.date.split('-').map(Number);
            return new Date(y, m - 1, d).getTime();
          })(),
        }));

        const filteredItems = filterByLanguage({
          items: itemsWithTimestamp.sort((a, b) => b.timestamp - a.timestamp),
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
  }, [updatePortfolioItems]);

  return <></>;
};

export default PortfolioDataStore;
