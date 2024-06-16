'use client';
import { useTranslation } from '@/hooks/useTranslation';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Custom404 = () => {
  const router = useRouter();
  const { t } = useTranslation('index');

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 6000);
  }, [router]);

  return (
    <div className="flex flex-col flexCenter min-h-screen bg-black text-white text-center">
      <h1 className="md:mt-[170px] mt-36 h1 px-5 mb-4">
        {t('notFound.title')}
      </h1>
      <CldImage
        src="/crunchypix/page_not_found_cat"
        alt="404 Cat"
        format="avif"
        priority
        fetchPriority="high"
        width={700}
        height={700}
        className="object-contain md:my-4 my-2"
      />
      <div className="md:px-10 px-5 mb-40">
        <p className="p mt-4 ">{t('notFound.description')}</p>
        <p className="p half italic mt-2">{t('notFound.info')}</p>
      </div>
    </div>
  );
};

export default Custom404;
