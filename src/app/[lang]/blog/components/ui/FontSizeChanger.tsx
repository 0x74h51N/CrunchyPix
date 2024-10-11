import { t } from 'i18next';
import React, { useEffect, useState } from 'react';

type FontTypes = {
  xs: null | number;
  sm: null | number;
  md: null | number;
};
const createInitialFontSizes = (): FontTypes => ({
  xs: null,
  sm: null,
  md: null,
});
const FontSizeChanger = () => {
  const [fontSize, setFontSize] = useState<FontTypes>(createInitialFontSizes);
  const [originalFontSizes, setOriginalFontSizes] = useState<FontTypes>(
    createInitialFontSizes,
  );

  useEffect(() => {
    const computedStyles = getComputedStyle(document.documentElement);
    const initialFontSizes = ['xs', 'sm', 'md'].reduce((sizes, key) => {
      sizes[key as keyof FontTypes] = parseFloat(
        computedStyles.getPropertyValue(`--font-size-${key}`),
      );
      return sizes;
    }, {} as FontTypes);

    setOriginalFontSizes(initialFontSizes);
    setFontSize(initialFontSizes);
  }, []);

  const applyFontSizes = (sizes: FontTypes) => {
    Object.entries(sizes).forEach(([key, value]) =>
      document.documentElement.style.setProperty(
        `--font-size-${key}`,
        `${Math.min(Math.max(value!, 8), 24)}px`,
      ),
    );
  };

  const changeFontSize = (delta: number) => {
    const newFontSizes = Object.fromEntries(
      Object.entries(fontSize).map(([key, value]) => [key, value! + delta]),
    ) as FontTypes;
    applyFontSizes(newFontSizes);
    setFontSize(newFontSizes);
  };

  const resetFontSize = () => {
    applyFontSizes(originalFontSizes);
    setFontSize(originalFontSizes);
  };

  return (
    <div className="join join-horizontal">
      <button
        className="btn btn-ghost btn-sm join-item text-xs px-3 h-10"
        onClick={() => changeFontSize(-2)}
        aria-label={t('blog-post.menu.fontMinus')}
      >
        A<sup className="-ml-2">-</sup>
      </button>
      <button
        className="btn btn-ghost btn-sm join-item h-10 px-2"
        onClick={resetFontSize}
        aria-label={t('blog-post.menu.font')}
      >
        A
      </button>
      <button
        className="btn btn-ghost btn-sm join-item text-lg h-10 px-2"
        onClick={() => changeFontSize(2)}
        aria-label={t('blog-post.menu.fontPlus')}
      >
        A<sup className="-ml-2">+</sup>
      </button>
    </div>
  );
};

export default FontSizeChanger;
