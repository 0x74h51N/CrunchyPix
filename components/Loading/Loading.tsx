'use client';
import { useTranslation } from 'react-i18next';
import CrunchyLogo from '../Navbar/CrunchyLogo';

const LoadingComponent = () => {
  const { t } = useTranslation('index');
  return (
    <div className="absolute loading-container left-1/2 top-1/2">
      <div className="m-auto absolute flex flex-row items-center justify-center pointer-events-auto cursor-none -translate-x-10">
        <CrunchyLogo loadingMode={true} />
      </div>
      <p className=" text-stone-200 mt-40">{t('loading')}</p>
    </div>
  );
};

export default LoadingComponent;
