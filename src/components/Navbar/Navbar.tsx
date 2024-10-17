'use client';
import { Links } from '@/constants/index';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import MobileMenu from './MobileMenu';
import LanguageMenu from './LanguageMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CrunchyLogo from './CrunchyLogo';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { useTranslation } from 'react-i18next';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const Navbar = () => {
  const [isMenuOpen, setMobileMenu] = useState(false);
  const theme = useSelector((state: RootState) => state.themeSlice.theme);
  const route = usePathname();
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);
  const fixed = useMemo(() => {
    const path = route.split('/');
    return path.length < 3;
  }, [route]);
  const locale = route.split('/')[1];
  const [smallNav, setSmallNav] = useState(false);
  const { t } = useTranslation('index');

  const observerCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setSmallNav(false);
      } else if (fixed) {
        setSmallNav(true);
      }
    });
  };
  const blogChild = useMemo(
    () => isBlog && route.split('/').length > 3,
    [route, isBlog],
  );
  const superTheme = useMemo(() => {
    return blogChild && theme ? theme : 'dark';
  }, [blogChild, theme]);

  const superSmallNav = useMemo(() => {
    return smallNav || blogChild;
  }, [smallNav, blogChild]);

  const { targetRef } = useIntersectionObserver(observerCallback, {
    threshold: 0,
  });

  const navClassName = useMemo(() => {
    const baseClass = clsx(
      fixed ? 'fixed' : 'absolute',
      isBlog ? 'cursor-auto' : 'cursor-none ',
      blogChild
        ? 'border border-base-300 bg-base-100 z-[250]'
        : 'bg-cool-gray-900 z-[450]',
      ' flex w-auto 2xl:min-w-[1450px] min-w-full top-0gap-4 transition-all duration-700 ease-in-out rounded-b-xl md:px-10 px-5',
    );
    if (isMenuOpen) {
      return `${baseClass} navbar py-5 ${superSmallNav ? 'h-[300px] bg-opacity-100 py-2 shadow-md shadow-black' : 'h-[310px]  bg-opacity-0'}`;
    } else if (superSmallNav) {
      return `${baseClass} bg-opacity-100 h-[70px] py-2 ${isBlog && route.split('/').length > 3 ? '' : 'shadow-md shadow-black'}`;
    } else {
      return `${baseClass} pt-12 py-5 bg-opacity-0 h-[100px]`;
    }
  }, [isMenuOpen, superSmallNav, fixed, isBlog, route, blogChild]);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const linkItems = useMemo(() => {
    return Links.map((link) => (
      <Link
        href={`/${locale}${link.href}`}
        key={link.key}
        className={clsx(
          isBlog ? 'cursor-pointer' : 'cursor-none',
          route.includes(link.href) && link.href !== '/'
            ? 'text-log-col scale-110'
            : 'hover:text-log-col hover:scale-110 ',
          'relative group transition-all duration-700 ease-in-out transform origin-bottom whitespace-nowrap',
        )}
      >
        {t(link.text)}
        <span
          className={clsx(
            route.includes(link.href) && link.href !== '/'
              ? ''
              : 'absolute -bottom-1 transition-all duration-500 ease-in-out left-0 h-0.5 w-0 group-hover:w-full bg-log-col',
          )}
        ></span>
      </Link>
    ));
  }, [route, t, isBlog]);
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
      <div className="flex justify-center w-[100svw] md:mt-0 lg:mt-0 xl:mt-0 !select-none">
        <nav className={navClassName}>
          <Link
            href={`/${locale}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={clsx(
              `flexCenter absolute top-2 pointer-events-auto  ${isBlog ? 'cursor-pointer' : 'cursor-none'}`,
            )}
          >
            <CrunchyLogo theme={superTheme} smallNav={superSmallNav} />
          </Link>
          <div
            className={`ml-auto transition-all duration-500 ease-in-out flex`}
          >
            <div
              className={clsx(
                'lg:hidden h-full max-h-[70px] flex items-center',
                isBlog ? 'cursor-auto' : 'cursor-none',
              )}
            >
              <MobileMenu
                blogChild={blogChild}
                smallNav={superSmallNav}
                isMenuOpen={isMenuOpen}
                setMobileMenu={setMobileMenu}
              />
            </div>
            <div className="max-lg:hidden flexCenter h-full">
              <ul
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={clsx(
                  'lg:flex max-lg:text-base max-xl:gap-6 max-lg:gap-5 antialiased gap-12',
                  isBlog ? 'cursor-auto text-h3' : 'cursor-none',
                  !blogChild && 'text-stone-200',
                  superSmallNav
                    ? 'text-md font-medium gap-8'
                    : 'text-lg font-semibold',
                )}
              >
                {linkItems}
                <div
                  className="h-auto flex justify-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <LanguageMenu smallNav={superSmallNav} />
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;