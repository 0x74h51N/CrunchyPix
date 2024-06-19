'use client';
import { Links } from '@/constants/index';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import MobileMenu from './MobileMenu';
import LanguageMenu from './LanguageMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import CrunchyLogo from './CrunchyLogo';
import { useTranslation } from '@/hooks/useTranslation';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const Navbar = () => {
  const [isMenuOpen, setMobileMenu] = useState(false);
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage,
  );
  const [smallNav, setSmallNav] = useState(false);
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
  const navClassName = useMemo(() => {
    let baseClass =
      'fixed flex w-auto 2xl:min-w-[1450px] xl:min-w-[75svw] min-w-[100svw] top-0 z-50 gap-4 bg-cool-gray-900 transition-all duration-700 ease-in-out rounded-b-xl md:px-10 px-5';
    if (isMenuOpen) {
      return `${baseClass} navbar py-5 ${smallNav ? 'h-[250px] bg-opacity-100 py-2 shadow-md shadow-black' : 'h-[280px]  bg-opacity-0'}`;
    } else if (smallNav) {
      return `${baseClass} bg-opacity-100 h-[70px] py-2 shadow-md shadow-black`;
    } else {
      return `${baseClass} pt-12 py-5 bg-opacity-0 h-[100px]`;
    }
  }, [isMenuOpen, smallNav]);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const linkItems = useMemo(() => {
    return Links.map((link) => (
      <Link
        href={link.href}
        key={link.key}
        className={`hover:text-log-col hover:scale-110 cursor-none ${
          selectedLink === link.href && link.href !== '/' ? 'text-log-col' : ''
        } relative group transition-all duration-700 ease-in-out transform origin-bottom whitespace-nowrap`}
      >
        {t(link.text)}
        <span
          className={`absolute -bottom-1 transition-all duration-500 ease-in-out left-0 h-0.5 bg-log-col ${
            selectedLink === link.href && link.href !== '/'
              ? 'w-full'
              : 'w-0 group-hover:w-full'
          }`}
        ></span>
      </Link>
    ));
  }, [selectedLink, t]);
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
      <div className="flex justify-center w-[100svw] md:mt-0 lg:mt-0 xl:mt-0">
        <nav className={navClassName}>
          <Link
            href="/"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="flexCenter absolute top-2 pointer-events-auto cursor-none"
          >
            <CrunchyLogo smallNav={smallNav} />
          </Link>
          <div className={`ml-auto transition-all duration-500 ease-in-out`}>
            <div className={`lg:hidden h-full max-h-[70px] flex items-center`}>
              <MobileMenu
                smallNav={smallNav}
                isMenuOpen={isMenuOpen}
                setMobileMenu={setMobileMenu}
              />
            </div>

            <div className="max-lg:hidden flexCenter h-full">
              <ul
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`lg:flex max-lg:text-base max-xl:gap-6 max-lg:gap-5 ${
                  smallNav
                    ? 'text-md font-medium gap-8'
                    : 'text-lg font-semibold'
                }  text-stone-200 antialiased gap-12`}
              >
                {linkItems}
                <div
                  className="h-auto w-auto flex justify-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <LanguageMenu smallNav={smallNav} />
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
