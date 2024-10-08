import useClickableHandlers from '@/hooks/useClickableHandlers';
import { RootState } from '@/store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const SubRoutes = ({
  childPage,
  mainPage,
}: {
  childPage: string;
  mainPage: string;
}) => {
  const path = usePathname();
  const blogPath = path.includes('blog');
  const { t } = useTranslation(['index', 'portfolio']);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center ">
      <div className="flex flex-row items-center">
        <Link
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`md:text-2xl text-lg text-cool-gray-50 font-bold hover:scale-105 transition-all duration-500 ease-in-out ${isBlog ? 'curosr-pointer' : 'cursor-none'}`}
          href={`/`}
        >
          <span>Crunchy</span>
          <span className="text-log-col mr-5">Pix</span>
        </Link>
        <span className="text-log-col md:text-[20px] text-md">{'•'}</span>
        <Link
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`md:text-2xl text-lg ${
            childPage ? 'text-cool-gray-50' : 'text-log-col'
          } font-bold ml-2 hover:scale-105 transition-all duration-500 ease-in-out ${isBlog ? 'curosr-pointer' : 'cursor-none'}`}
          href={`/${mainPage}`}
        >
          {t(`index:links.${mainPage}`)}
        </Link>
      </div>
      {childPage && mainPage !== 'policies' && (
        <div className="flex flex-row items-center">
          <span className="text-log-col md:text-[20px] text-md md:ml-5 ml-0">
            {'•'}
          </span>
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="md:text-2xl text-lg text-log-col font-bold ml-2 hover:scale-105 transition-all duration-500 ease-in-out "
            style={{ textTransform: 'capitalize' }}
          >
            {blogPath ? 'Article' : t('portfolio:page.details')}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubRoutes;
