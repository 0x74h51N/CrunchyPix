'use client';

import IconButton from '@/components/Buttons/IconButton';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const ProgressAndShare = () => {
  const [progress, setProgress] = useState(0);
  const [shareUrl, setShareUrl] = useState('');
  const pathname = usePathname();
  const { t } = useTranslation('blog');

  useEffect(() => {
    const url = `${window.location.origin}${pathname}`;
    setShareUrl(url);
    console.log(url, 'social url');
  }, [pathname]);

  useEffect(() => {
    const blogPostElement = document.getElementById('blog-section');
    const handleScroll = () => {
      if (blogPostElement) {
        const windowHeight = window.innerHeight;
        const documentHeight = blogPostElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY - 750;
        const newProgress = (scrollTop / documentHeight) * 100;
        setProgress(newProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className=" bg-base-300 p-2">
      <div className="fixed z-[250] top-0 left-0 right-0 progress w-full h-1 mb-2 bg-primary">
        <div
          className="progress progress-success bg-log-col h-1"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <div className="flex justify-between items-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-lg">
          {t('blog-post.share.share')}
        </span>
        <div className="flex items-center justify-center">
          <div
            className="flex items-center p-2 tooltip tooltip-bottom tooltip-accent hover:text-log-col"
            aria-label={t('blog-post.share.twitter')}
          >
            <IconButton
              size={27}
              icon={{
                id: 1,
                type: 'twitter',
                link: `https://twitter.com/intent/tweet?url=${shareUrl}`,
              }}
            />
          </div>
          <div
            className="flex items-center p-2 tooltip tooltip-bottom tooltip-accent hover:text-log-col"
            aria-label={t('blog-post.share.linkedin')}
          >
            <IconButton
              tooltipDirection={'top'}
              size={27}
              icon={{
                id: 2,
                type: 'linkedin',
                link: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`,
              }}
            />
          </div>
          <div
            className="flex items-center p-2 tooltip tooltip-bottom tooltip-accent hover:text-log-col"
            aria-label={t('blog-post.share.facebook')}
          >
            <IconButton
              size={27}
              icon={{
                id: 3,
                type: 'facebook',
                link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAndShare;
