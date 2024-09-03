import IconButton from '@/components/Buttons/IconButton';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ShareButtons = () => {
  const [shareUrl, setShareUrl] = useState('');
  const pathname = usePathname();
  const { t } = useTranslation('blog');

  useEffect(() => {
    const url = `${window.location.origin}${pathname}`;
    setShareUrl(url);
    console.log(url, 'social url');
  }, [pathname]);
  return (
    <div className="flex justify-between items-center">
      <span className="max-xs:hidden bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-lg">
        {t('blog-post.share.share')}
      </span>
      <div className="flex items-center justify-center ml-2">
        <div
          className="btn btn-sm btn-ghost px-1 "
          aria-label={t('blog-post.share.twitter')}
        >
          <IconButton
            size={22}
            icon={{
              id: 1,
              type: 'twitter',
              link: `https://twitter.com/intent/tweet?url=${shareUrl}`,
            }}
          />
        </div>
        <div
          className="btn btn-sm btn-ghost px-1 "
          aria-label={t('blog-post.share.linkedin')}
        >
          <IconButton
            tooltipDirection={'top'}
            size={22}
            icon={{
              id: 2,
              type: 'linkedin',
              link: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`,
            }}
          />
        </div>
        <div
          className="btn btn-sm btn-ghost px-1 "
          aria-label={t('blog-post.share.facebook')}
        >
          <IconButton
            size={22}
            icon={{
              id: 3,
              type: 'facebook',
              link: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;
