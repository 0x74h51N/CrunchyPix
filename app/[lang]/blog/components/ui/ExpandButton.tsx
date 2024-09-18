import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RiContractLeftRightLine, RiExpandLeftRightLine } from 'react-icons/ri';

const ExpandButton = ({
  setWide,
  isWide,
}: {
  setWide: Dispatch<SetStateAction<boolean>>;
  isWide: boolean;
}) => {
  const { t } = useTranslation('blog');
  const toggleWidth = () => {
    setWide(!isWide);
  };
  useEffect(() => {
    const articleWrapper = document.getElementById('article-wrapper');
    const gridWrapper = document.getElementById('grid-wrapper');
    if (articleWrapper && gridWrapper) {
      articleWrapper.style.maxWidth = isWide ? '1900px' : '';
      gridWrapper.style.gridTemplateColumns = isWide
        ? 'minmax(179px, 300px) minmax(670px, 1fr) minmax(0px, 10px)'
        : '';
      if (isWide) {
        articleWrapper.style.paddingRight = '1rem';
      } else {
        articleWrapper.style.paddingRight = '';
      }
    }
  }, [isWide]);

  useEffect(() => {
    const gridWrapper = document.getElementById('grid-wrapper');

    // Ekran genişliğini takip eden ResizeObserver
    const handleResize = (entries: ResizeObserverEntry[]) => {
      const entry = entries[0]; // İlk entry'i alıyoruz çünkü sadece bir eleman dinleniyor
      if (entry.contentRect.width < 1024) {
        setWide(false);
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (gridWrapper) {
      observer.observe(gridWrapper);
    }

    return () => {
      if (gridWrapper) {
        observer.unobserve(gridWrapper);
      }
    };
  }, [setWide]);

  return (
    <button
      onClick={toggleWidth}
      className=" btn btn-ghost btn-sm text-lg h-10 max-lg:hidden"
      aria-label={t('blog-post.menu.expand')}
    >
      {isWide ? <RiContractLeftRightLine /> : <RiExpandLeftRightLine />}
    </button>
  );
};

export default ExpandButton;
