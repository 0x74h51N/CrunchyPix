import useClickableHandlers from '@/hooks/useClickableHandlers';
import { RootState } from '@/store';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const MainRoutes = ({
  childPage,
  mainPage,
}: {
  childPage: string;
  mainPage: string;
}) => {
  const { t } = useTranslation('index');
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const portfolioItems = useSelector(
    (state: RootState) => state.portfolio.items,
  );

  const storeItem = useMemo(() => {
    return portfolioItems.find((a) => a._id === childPage);
  }, [childPage, portfolioItems]);
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h1 mb-3 hover:scale-105 transition-all duration-500 ease-in-out lg:mt-[175px] md:mt-[140px] mt-[120px] line-clamp-1"
      style={{ textTransform: 'capitalize' }}
    >
      {childPage ? (
        childPage === 'crunchypix' ? (
          <>
            <span>Crunchy</span>
            <span className="text-log-col mr-5">Pix</span>
          </>
        ) : mainPage === 'policies' ? (
          t(`links.${childPage.replaceAll('-', '').toLowerCase()}`)
        ) : (
          mainPage === 'portfolio' &&
          storeItem &&
          storeItem.project_overview &&
          storeItem.project_overview[0]!.title
        )
      ) : (
        t(`links.${mainPage}`)
      )}
    </div>
  );
};

export default MainRoutes;
