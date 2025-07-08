import { Links } from '@/constants';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { Locales } from '@/i18n/settings';
import { RootState } from '@/store';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import BurgerButton from '../Buttons/BurgerButton';
import LanguageMenu from './LanguageMenu';

type MobileMenuProps = {
  locale: Locales;
  smallNav: boolean;
  isMenuOpen: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  blogChild: boolean;
};

const MobileMenu = ({
  locale,
  smallNav,
  isMenuOpen,
  setMobileMenu,
  blogChild,
}: MobileMenuProps) => {
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  const toggleMenu = () => {
    setMobileMenu(!isMenuOpen);
  };

  const { t } = useTranslation('index');

  useOutsideClick(menuRef as React.RefObject<HTMLDivElement>, () =>
    setMobileMenu(false),
  );

  return (
    <div ref={menuRef} className="flex flex-col">
      <div
        className={`absolute ${smallNav ? 'top-5' : 'top-10'} right-6 transition-all duration-700 ease-in-out`}
      >
        <BurgerButton
          color={'#eeb30d'}
          width={40}
          height={40}
          isToggled={isMenuOpen}
          onClick={toggleMenu}
          cursor={isBlog ? 'pointer' : 'none'}
        />
      </div>
      <div
        className={`mobile-menu w-full backdrop-blur ${smallNav ? 'mt-[74px]' : 'mt-[95px]'}`}
      >
        {isMenuOpen && (
          <div>
            <ul className="ul">
              <div className="flex justify-end mr-10 mb-3 z-50">
                <LanguageMenu smallNav={smallNav} />
              </div>
              {Links.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    key={link.key}
                    onClick={toggleMenu}
                    className={clsx(
                      'hover:text-log-col w-20 block relative group py-2 rtl text-lg font-semibold text-right mr-10  antialiased ml-auto transition duration-500 ease-in-out whitespace-nowrap',
                      path.includes(link.href) && link.href !== '/'
                        ? 'text-log-col'
                        : blogChild
                          ? ''
                          : 'text-neutral-200',
                      isBlog ? 'cursor-pointer' : 'cursor-none',
                    )}
                  >
                    {t(link.text)}
                    <span className="absolute -bottom-1 right-0 h-0.5 w-0 transition-all group-hover:w-full duration-700 bg-log-col"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
