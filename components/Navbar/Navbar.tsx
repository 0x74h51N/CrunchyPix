'use client';
import { Links } from '@/constants/index';
import Link from 'next/link';
import React, { memo, useEffect, useMemo, useState } from 'react';
import MobileMenu from './MobileMenu';
import LanguageMenu from './LanguageMenu';
import { useSelector, useDispatch } from 'react-redux';
import { mobileChange } from '@/store/redux/isMobile';
import { RootState } from '@/store';
import { tabletChange } from '@/store/redux/isTablet';
import { setScreenHeight } from '@/store/redux/screenHeight';
import { setScreenWidth } from '@/store/redux/screenWidth';
import { mobileMenuChange } from '@/store/redux/isMobileMenu';
import CrunchyLogo from './CrunchyLogo';
import { useTranslation } from '@/hooks/useTranslation';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useThrottle from '@/hooks/useThrottle';

const Navbar = () => {
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);

  const isMenuOpen = useSelector(
    (state: RootState) => state.isMobileMenu.mobileMenu,
  );
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage,
  );
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width,
  );
  const screenHeight = useSelector(
    (state: RootState) => state.screenHeight.height,
  );
  const [smallNav, setSmallNav] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation('index');

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setSmallNav(false);
      } else {
        setSmallNav(true);
      }
    });
  };

  const { targetRef } = useIntersectionObserver(observerCallback, {
    threshold: 0,
  });

  const handleResize = () => {
    const _screenWidth = window.innerWidth;
    const _screenHeight = window.innerHeight;

    dispatch(setScreenHeight(_screenHeight));
    dispatch(setScreenWidth(_screenWidth));

    if (_screenWidth <= 768) {
      dispatch(mobileChange(true));
      dispatch(tabletChange(false));
    } else if (_screenWidth <= 1030) {
      dispatch(mobileChange(false));
      dispatch(tabletChange(true));
    } else {
      dispatch(mobileChange(false));
      dispatch(tabletChange(false));
      if (isMenuOpen) {
        dispatch(mobileMenuChange(false));
      }
    }
  };
  const throttledHandleResize = useThrottle(
    handleResize,
    isTouchDevice ? 800 : 100,
  );
  useEffect(() => {
    if (typeof window != 'undefined') {
      window.addEventListener('resize', throttledHandleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', throttledHandleResize);
      };
    }
  }, [throttledHandleResize, isTouchDevice]);
  const navClassName = useMemo(() => {
    let baseClass =
      'fixed flex w-auto 2xl:min-w-[1450px] xl:min-w-[75svw] min-w-[100svw] top-0 z-50 gap-4 bg-cool-gray-900 transition-all duration-1000 ease-in-out rounded-b-xl md:px-10 px-5';
    if (isMenuOpen) {
      return `${baseClass} navbar h-[280px] py-5 bg-opacity-0 ${smallNav ? 'h-[250px] bg-opacity-100 py-2 shadow-md shadow-black' : ''}`;
    } else if (smallNav) {
      return `${baseClass} bg-opacity-100 h-[70px] py-2 shadow-md shadow-black`;
    } else {
      return `${baseClass} pt-12 py-5 bg-opacity-0 h-[100px]`;
    }
  }, [isMenuOpen, smallNav]);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  return (
    <>
      <div
        ref={targetRef}
        id="targetto"
        style={{
          position: 'absolute',
          top: '50px',
          width: '1px',
          height: '1px',
        }}
      />
      <div className="flex justify-center min-w-[100svw]">
        <nav className={navClassName}>
          <Link
            href="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flex flex-row items-center justify-center pointer-events-auto cursor-none"
          >
            <CrunchyLogo smallNav={screenWidth <= 360 ? true : smallNav} />
          </Link>
          <div
            className={`flex flex-center items-start ml-auto transition-all duration-500 ease-in-out`}
          >
            {isMobile || isTablet ? (
              <div className={`h-full max-h-[70px] flex items-center`}>
                {' '}
                <MobileMenu smallNav={screenWidth <= 360 ? true : smallNav} />
              </div>
            ) : (
              <div className="flex flexCenter h-full">
                <ul
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`flex max-lg:text-base max-xl:gap-6 max-lg:gap-5 ${
                    smallNav
                      ? 'text-md font-medium gap-8'
                      : 'text-lg font-semibold'
                  }  text-stone-200 antialiased gap-12`}
                >
                  {Links.map((link) => (
                    <Link
                      href={link.href}
                      key={link.key}
                      className={`hover:text-log-col hover:scale-110 cursor-none  ${
                        selectedLink === link.href && link.href !== '/'
                          ? 'text-log-col'
                          : ''
                      } relative group transition-all duration-700 ease-in-out transform origin-bottom whitespace-nowrap`}
                    >
                      {t(link.text)}
                      <span
                        className={`absolute -bottom-1  transition-all duration-500 ease-in-out  left-0 h-0.5 bg-log-col ${
                          selectedLink === link.href && link.href !== '/'
                            ? 'w-full'
                            : 'w-0 group-hover:w-full'
                        }`}
                      ></span>
                    </Link>
                  ))}
                  <div
                    className="h-auto w-auto flex justify-center"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <LanguageMenu smallNav={smallNav} />
                  </div>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default memo(Navbar);
