'use client';
import LogoSlider from '../../Slider/LogoSlide';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { LogoSlideSchema, LogoSlideType } from '@/lib/schemas';
import TitleText from '../TitleText';
import { memo } from 'react';
import LoadingComponent from '@/components/Loading/Loading';

const LogoSect = () => {
  const { data, loading } = useSupabaseFetch<LogoSlideType>(
    'public',
    'logo_slide',
    '*',
    LogoSlideSchema,
  );

  if (loading) {
    return <LoadingComponent />;
  }
  if (data) {
    return (
      <div className="h-auto flex flex-col items-center justify-center w-full">
        <TitleText sectName="logo_sect" />
        <div className="w-full h-auto flex flex-row justify-center items-center py-3 bg-neutral-950 z-20">
          <LogoSlider data={data.sort((a, b) => a.id - b.id)} />
        </div>
      </div>
    );
  }
};

export default memo(LogoSect);
