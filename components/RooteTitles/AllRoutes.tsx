'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import MainRoutes from './MainRoutes';
import SubRoutes from './SubRoutes';
import { CldImage } from 'next-cloudinary';
import { AnimatePresence, motion } from 'framer-motion';
import { checkIfPageExists } from './checkIfPageExist';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import useDragHandler from '@/hooks/useDragHandler';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const AllRoutes = ({ staticParams }: { staticParams: { id: string }[] }) => {
  const { hoverEnd } = useDragHandler();
  const { handleMouseLeave } = useClickableHandlers();
  const [mainPage, setMainPage] = useState('');
  const [childPage, setChildPage] = useState('');
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [hasGrandchildPage, setHasGrand] = useState(false);
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  useEffect(() => {
    const updatePageInfo = () => {
      const urlParts = pathname.split('/');

      const currentPage = urlParts[2] || '';
      const currentChildPage = urlParts[3] || '';

      setMainPage(currentPage);
      setChildPage(currentChildPage);

      const isValidPage = checkIfPageExists(
        currentPage,
        currentChildPage,
        staticParams,
      );

      setPageExists(isValidPage);
      setHasGrand(urlParts.length > 4);
    };

    updatePageInfo();

    const handlePopState = () => {
      updatePageInfo();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname, staticParams]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    hoverEnd();
    handleMouseLeave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!pageExists || hasGrandchildPage || !mainPage || (isBlog && childPage)) {
    return null;
  } else {
    return (
      <div
        className={`${isBlog ? 'cursor-auto' : '!cursor-none'} flexCenter flex-col w-full lg:h-[380px] md:h-[330px] h-[270px] md:p-10 p-2 overflow-hidden relative !select-none`}
      >
        <div
          className="absolute inset-0  w-full z-50"
          style={{
            background:
              mainPage !== 'policies'
                ? 'radial-gradient(circle, rgba(0,0,0,0.6), rgba(0,0,0,0.9))'
                : 'transparent',
            boxShadow:
              mainPage !== 'policies'
                ? 'inset 0 0 10px 5px rgba(0, 0, 0, 0.8)'
                : '',
          }}
        ></div>
        <AnimatePresence>
          <motion.div
            key={mainPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            {mainPage !== 'policies' && (
              <CldImage
                src={`crunchypix/${mainPage}`}
                alt={mainPage}
                fill
                priority
                sizes="100vw"
                quality="auto"
                format="avif"
                className="object-cover h-[700px]"
                onLoad={() => setLoading(false)}
                style={{
                  opacity: loading ? 0 : 1,
                  transition: 'opacity 300ms ease-in-out',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div className="z-50 flex-col flexCenter">
          <MainRoutes childPage={childPage} mainPage={mainPage} />
          <SubRoutes childPage={childPage} mainPage={mainPage} />
        </div>
      </div>
    );
  }
};

export default AllRoutes;
