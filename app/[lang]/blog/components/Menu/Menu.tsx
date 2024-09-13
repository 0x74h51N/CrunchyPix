'use client';
import ThemeToggle from '@/components/Buttons/ThemeToggle';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RiContractLeftRightLine, RiExpandLeftRightLine } from 'react-icons/ri';
import ShareButtons from './ShareButtons';
import Progressbar from './Progressbar';
import FontSizeChanger from './FontSizeChanger';
import clsx from 'clsx';
import { GoLink, GoUnlink } from 'react-icons/go';
const Menu = () => {
  const { t } = useTranslation('blog');
  const [isWide, setIsWide] = useState(false);
  const [linked, setLinked] = useState(true);
  const toggleWidth = () => {
    setIsWide(!isWide);
  };
  useEffect(() => {
    const articleWrapper = document.getElementById('article-wrapper');
    if (articleWrapper) {
      articleWrapper.style.maxWidth = isWide ? '1850px' : '1300px';
      if (isWide) {
        articleWrapper.style.paddingRight = '1rem';
      } else {
        articleWrapper.style.paddingRight = '';
      }
    }
  }, [isWide]);

  return (
    <>
      <div
        className={clsx(
          'flex items-center border border-base-300 justify-between backdrop-blur-sm backdrop-filter bg-base-300 bg-opacity-25 rounded-b-lg top-0 p-2 md:px-6 md:gap-6 z-50 !select-none -mt-9',
          linked ? 'sticky' : '',
        )}
      >
        <div className="flex gap-4 items-center">
          <ThemeToggle />

          <div className="flex gap-1">
            <button
              onClick={() => setLinked(!linked)}
              className=" text-lg h-10 btn btn-ghost btn-sm"
            >
              {linked ? <GoLink /> : <GoUnlink />}
            </button>
            <button
              onClick={toggleWidth}
              className=" btn btn-ghost btn-sm text-lg h-10 max-lg:hidden"
              aria-label={t('blog-post.menu.expand')}
            >
              {isWide ? <RiContractLeftRightLine /> : <RiExpandLeftRightLine />}
            </button>

            <FontSizeChanger />
          </div>
        </div>
        <ShareButtons />
      </div>
      <Progressbar />
    </>
  );
};

export default Menu;
