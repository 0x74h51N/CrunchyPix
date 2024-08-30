'use client';
import ThemeToggle from '@/components/Buttons/ThemeToggle';
import React, { useEffect, useState } from 'react';
import ProgressAndShare from './ProgressAndShare';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { useTranslation } from 'react-i18next';
import { RiContractLeftRightLine, RiExpandLeftRightLine } from 'react-icons/ri';

const Menu = () => {
  const [fontSize, setFontSize] = useState(16);
  const [originalFontSize, setOriginalFontSize] = useState(16);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const { t } = useTranslation('blog');
  const [isWide, setIsWide] = useState(false);

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

  useEffect(() => {
    const blogSection = document.getElementById('blog-section');
    if (blogSection) {
      const computedStyle = window.getComputedStyle(blogSection);
      const originalSize = parseFloat(computedStyle.fontSize);
      setOriginalFontSize(originalSize);
      setFontSize(originalSize);
    }
  }, []);

  useEffect(() => {
    const blogSection = document.getElementById('blog-section');
    if (blogSection) {
      blogSection.style.fontSize = `${fontSize}px`;
    }
  }, [fontSize]);

  const changeFontSize = (newSize: number) => {
    setFontSize(() => Math.min(Math.max(newSize, 12), 24));
  };

  const resetFontSize = () => {
    setFontSize(originalFontSize);
  };

  return (
    <div className="relative flex items-center justify-between bg-base-300 rounded-b-lg lg:sticky top-0 p-2 md:px-6 md:gap-6 md:flex-row flex-col z-50 !select-none">
      <div className="flex gap-4 items-center">
        <div className="tooltip tooltip-bottom tooltip-accent">
          <ThemeToggle />
        </div>
        <div
          className="flex gap-1"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={toggleWidth}
            className=" btn btn-ghost btn-sm text-lg h-10 max-lg:hidden tooltip tooltip-bottom tooltip-accent"
            aria-label={t('blog-post.menu.expand')}
          >
            {isWide ? <RiContractLeftRightLine /> : <RiExpandLeftRightLine />}
          </button>
          <div className="join join-horizontal">
            <button
              className="btn btn-ghost btn-sm join-item text-xs px-2 h-10 tooltip tooltip-bottom tooltip-accent"
              onClick={() => changeFontSize(fontSize - 2)}
              aria-label={t('blog-post.menu.fontMinus')}
            >
              A<sup>-</sup>
            </button>
            <button
              className="btn btn-ghost btn-sm join-item h-10 px-2 tooltip tooltip-bottom tooltip-accent"
              onClick={resetFontSize}
              aria-label={t('blog-post.menu.font')}
            >
              A
            </button>
            <button
              className="btn btn-ghost btn-sm join-item text-lg h-10 px-2 tooltip tooltip-bottom tooltip-accent"
              onClick={() => changeFontSize(fontSize + 2)}
              aria-label={t('blog-post.menu.fontPlus')}
            >
              A<sup>+</sup>
            </button>
          </div>
        </div>
      </div>
      <ProgressAndShare />
    </div>
  );
};

export default Menu;
