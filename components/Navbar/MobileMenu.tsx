import { Links } from '@/constants';
import Link from 'next/link';
import React, { useRef } from 'react';
import BurgerButton from '../Buttons/BurgerButton';
import LanguageMenu from './LanguageMenu';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';

type MobileMenuProps = {
  smallNav: boolean;
  isMenuOpen: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileMenu = ({
  smallNav,
  isMenuOpen,
  setMobileMenu,
}: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleMenu = () => {
    setMobileMenu(!isMenuOpen);
  };
  const selectedLink = useSelector(
    (state: RootState) => state.page.currentPage,
  );
  const { t } = useTranslation('index');

  useOutsideClick(menuRef, () => setMobileMenu(false));

  return (
    <div ref={menuRef} className="flex flex-col">
      <div
        className={`absolute ${smallNav ? 'top-5' : 'top-10'} right-6 transition-all duration-700 ease-in-out`}
      >
        <BurgerButton
          color={'#FFFFFF'}
          width={40}
          height={40}
          isToggled={isMenuOpen}
          onClick={toggleMenu}
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
                    href={link.href}
                    key={link.key}
                    onClick={toggleMenu}
                    className={`hover:text-log-col cursor-none ${
                      selectedLink === link.href && link.href !== '/'
                        ? 'text-log-col'
                        : 'text-neutral-200'
                    } w-20 block relative group py-2 rtl text-lg font-semibold text-right mr-10  antialiased ml-auto transition duration-500 ease-in-out whitespace-nowrap`}
                  >
                    {t(link.text)}
                    <span
                      className={`absolute -bottom-1 right-0 h-0.5 bg-log-col ${
                        selectedLink === link.href && link.href !== '/'
                          ? 'w-full'
                          : 'w-0 transition-all group-hover:w-full'
                      }`}
                    ></span>
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
