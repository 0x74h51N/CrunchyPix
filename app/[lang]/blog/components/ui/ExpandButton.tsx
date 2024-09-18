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
    if (articleWrapper) {
      articleWrapper.style.maxWidth = isWide ? '1900px' : '1150px';
      if (isWide) {
        articleWrapper.style.paddingRight = '1rem';
      } else {
        articleWrapper.style.paddingRight = '';
      }
    }
  }, [isWide]);
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
