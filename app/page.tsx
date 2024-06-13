'use client';
import dynamic from 'next/dynamic';

import { sectionsData } from '@/constants/sections';
import { SectionsSchema, SectionsTypes } from '@/schemas';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { memo, useEffect } from 'react';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import { getLocale } from '@/i18n/client';
import { useDispatch, useSelector } from 'react-redux';
import { setSectionItems } from '@/store/redux/sectionItems';
import { RootState } from '@/store';
import FsLoading from '@/components/Loading/FsLoading';

const Section = dynamic(() => import('@/components/Sections/Section'), {
  ssr: false,
  loading: () => <FsLoading />,
});

const Home = () => {
  const dispatch = useDispatch();
  const filteredData = useSelector((state: RootState) => state.section.items);
  const { data, loading, error } = useSupabaseFetch<SectionsTypes>(
    'home_schema',
    'sections',
    `*, translations(*, cards(*))`,
    SectionsSchema,
  );
  const language = getLocale();
  useEffect(() => {
    if (data && !loading) {
      const filteredItems = filterByLanguage({
        items: data,
        language,
        localPath: 'translations',
      });
      dispatch(setSectionItems(filteredItems));
    }
  }, [data, language, dispatch, loading]);

  if (error) {
    console.error(error);
  }
  return !filteredData || filteredData.length <= 0 || error || loading ? (
    <FsLoading />
  ) : (
    <Section sectionsData={sectionsData} />
  );
};

export default memo(Home);
