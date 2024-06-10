'use client';
import dynamic from 'next/dynamic';
import LoadingComponent from '@/components/Loading';
import { sectionsData } from '@/constants/sections';
import { SectionsSchema, SectionsTypes } from '@/schemas';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { useEffect, useState } from 'react';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import { getLocale } from '@/i18n/client';
import { useDispatch } from 'react-redux';
import { setSectionItems } from '@/store/redux/sectionItems';

const FsLoading = () => {
  return (
    <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden z-50 bg-black">
      <LoadingComponent />
    </div>
  );
};
const Section = dynamic(() => import('@/components/Sections/Section'), {
  ssr: false,
  loading: () => <FsLoading />,
});

const Home = () => {
  const dispatch = useDispatch();
  const [translated, setTranslated] = useState<SectionsTypes[]>([]);
  const { data, loading, error } = useSupabaseFetch<SectionsTypes>(
    'home_schema',
    'sections',
    `*, translations(*, cards(*))`,
    SectionsSchema,
  );
  const language = getLocale();
  useEffect(() => {
    if (data) {
      const filteredItems = filterByLanguage({
        items: data,
        language,
        localPath: 'translations',
      });
      setTranslated(filteredItems);
    }
  }, [data, language]);
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    dispatch(setSectionItems(translated));
  }, [dispatch, translated]);
  return loading ? <FsLoading /> : <Section sectionsData={sectionsData} />;
};

export default Home;
