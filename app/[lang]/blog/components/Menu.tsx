'use client';
import ThemeToggle from '@/components/Buttons/ThemeToggle';
import React, { useEffect, useState } from 'react';
import ProgressAndShare from './ProgressAndShare';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { useTranslation } from 'react-i18next';

const Menu = () => {
  const [fontSize, setFontSize] = useState(16);
  const [originalFontSize, setOriginalFontSize] = useState(16);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const { t } = useTranslation('blog');

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
    <div className="flex items-center justify-between bg-base-300 rounded-b-lg md:sticky top-0 p-2 md:px-6 md:gap-6 md:flex-row flex-col z-50">
      <div className="flex gap-4 items-center px-">
        <div
          className="tooltip tooltip-bottom tooltip-accent"
          data-tip={t('blog-post.menu.themeToggle')}
        >
          <ThemeToggle />
        </div>
        <div
          className="join join-horizontal"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            className="btn btn-ghost btn-sm join-item text-xs h-10 tooltip tooltip-bottom tooltip-accent"
            onClick={() => changeFontSize(fontSize - 2)}
            aria-label={t('blog-post.menu.fontMinus')}
            data-tip={t('blog-post.menu.fontMinus')}
          >
            A<sup>-</sup>
          </button>
          <button
            className="btn btn-ghost btn-sm join-item h-10  tooltip tooltip-bottom tooltip-accent"
            onClick={resetFontSize}
            aria-label={t('blog-post.menu.font')}
            data-tip={t('blog-post.menu.font')}
          >
            A
          </button>

          <button
            className="btn btn-ghost btn-sm join-item text-lg h-10  tooltip tooltip-bottom tooltip-accent"
            onClick={() => changeFontSize(fontSize + 2)}
            aria-label={t('blog-post.menu.fontPlus')}
            data-tip={t('blog-post.menu.fontPlus')}
          >
            A<sup>+</sup>
          </button>
        </div>
        <div className="flex flex-wrap max-md:w-16 md:text-md text-xs">
          {t('blog-post.menu.fontSize')}{' '}
          <span className="ml-1">{fontSize.toFixed(1)}px</span>
        </div>
      </div>
      <ProgressAndShare />
    </div>
  );
};

export default Menu;
