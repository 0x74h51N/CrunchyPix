'use client';
import FsLoading from '@/components/Loading/FsLoading';
import Section from '@/components/Sections/Section';
import { sectionsData } from '@/constants/sections';
import { SectionsTypes } from '@/lib/schemas';
import { RootState } from '@/store';
import { setSectionItems } from '@/store/redux/sectionItems';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type HomeClientProps = { initialSections: SectionsTypes[] };

export const HomeClient = ({ initialSections }: HomeClientProps) => {
  const dispatch = useDispatch();
  const sectionItems = useSelector((state: RootState) => state.section.items);

  useEffect(() => {
    dispatch(setSectionItems(initialSections));
  }, [dispatch, initialSections]);

  if (!sectionItems || sectionItems.length <= 1) {
    return <FsLoading />;
  }

  return <Section sectionsData={sectionsData} />;
};
