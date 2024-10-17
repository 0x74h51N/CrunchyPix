'use client';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { sectionsData } from '@/constants/sections';
import { SectionsSchema, SectionsTypes } from '@/lib/schemas';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { memo, useEffect, useState } from 'react';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import { useDispatch, useSelector } from 'react-redux';
import { setSectionItems } from '@/store/redux/sectionItems';
import { RootState } from '@/store';
import FsLoading from '@/components/Loading/FsLoading';
import { Locales } from '@/i18n/settings';

const Section = dynamic(() => import('@/components/Sections/Section'), {
  ssr: false,
  loading: () => <FsLoading />,
});

const Home = ({ params: { lang } }: { params: { lang: Locales } }) => {
  const dispatch = useDispatch();
  const filteredData = useSelector((state: RootState) => state.section.items);
  const { data, loading, error } = useSupabaseFetch<SectionsTypes>(
    'home_schema',
    'sections',
    `*, translations(*, cards(*))`,
    SectionsSchema,
  );

  const [language, setLanguage] = useState<Locales | null>(null);

  useEffect(() => {
    const fetchLanguage = () => {
      setLanguage(lang);
    };

    fetchLanguage();
  }, [lang]);

  useEffect(() => {
    if (language && data && !loading) {
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

  return !filteredData || filteredData.length <= 1 || error || loading ? (
    <FsLoading />
  ) : (
    <Section sectionsData={sectionsData} />
  );
};

export default memo(Home);
