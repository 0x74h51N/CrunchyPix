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

const AllRoutes = () => {
  const { hoverEnd } = useDragHandler();
  const { handleMouseLeave } = useClickableHandlers();
  const [mainPage, setMainPage] = useState('');
  const [childPage, setChildPage] = useState('');
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [pageExists, setPageExists] = useState(false);
  const [hasGrandchildPage, setHasGrand] = useState(false);
  useEffect(() => {
    const updatePageInfo = async () => {
      const urlParts = pathname.split('/');
      const currentPage = urlParts[1];
      const currentChildPage = urlParts[2] || '';

      setChildPage(currentChildPage);
      setMainPage(currentPage);

      const isValidPage = await checkIfPageExists(
        currentPage,
        currentChildPage,
      );
      setPageExists(isValidPage);
    };

    updatePageInfo();

    const handlePopState = () => {
      updatePageInfo();
    };

    const urlParts = pathname.split('/');
    urlParts.length > 3 && setHasGrand(true);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [pathname]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    hoverEnd();
    handleMouseLeave();
  }, []);
  if (
    !pageExists ||
    hasGrandchildPage ||
    pathname === '' ||
    pathname === 'home' ||
    pathname === '/' ||
    mainPage === ''
  ) {
    return null;
  } else {
    return (
      <div
        className="flex flex-col  justify-center items-center w-full lg:h-[380px] md:h-[330px] h-[270px] md:p-10 p-2 overflow-hidden relative"
        style={{
          background:
            mainPage !== 'policies'
              ? 'radial-gradient(circle, rgba(0,0,0,0.7), rgba(0,0,0,1))'
              : 'transparent',
          boxShadow:
            mainPage !== 'policies'
              ? 'inset 0 0 10px 5px rgba(0, 0, 0, 0.8)'
              : '',
        }}
      >
        <AnimatePresence>
          <motion.div
            key={mainPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-[-10]"
          >
            {mainPage !== 'policies' && (
              <CldImage
                src={`crunchypix/${mainPage}.jpg`}
                alt={mainPage}
                fill
                priority
                sizes="100svw"
                quality="auto"
                format="avif"
                className={`object-cover h-[700px] `}
                onLoad={() => setLoading(false)}
                style={{
                  opacity: loading ? 0 : 100,
                  transition: 'ease-in-out 300ms',
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <MainRoutes childPage={childPage} mainPage={mainPage} />
        <SubRoutes childPage={childPage} mainPage={mainPage} />
      </div>
    );
  }
};

export default AllRoutes;
