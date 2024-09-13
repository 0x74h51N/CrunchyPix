'use client';
import { useTranslation } from 'react-i18next';
import useDragHandler from '@/hooks/useDragHandler';
import ProjectSlide from './ProjectSlide';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { memo } from 'react';

const OtherProjects = () => {
  const { t } = useTranslation('portfolio');
  const portfolioItems = useSelector(
    (state: RootState) => state.portfolio.items,
  );

  const { hoverStart, hoverEnd } = useDragHandler();
  return (
    <div className="flexCenter w-auto h-auto min-w-[100svw] overflow-hidden !select-none">
      <div
        className="w-full max-w-[1300px] h-auto mb-24 px-8 "
        onMouseEnter={hoverStart}
        onMouseLeave={hoverEnd}
      >
        <h2 className="h1 half w-full mb-2 text-center">
          {t('page.otherProjects')}
        </h2>
        {portfolioItems && <ProjectSlide Items={portfolioItems} />}
      </div>
    </div>
  );
};

export default memo(OtherProjects);
