import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Links } from '@/lib/types/common.types';
import { memo } from 'react';
import clsx from 'clsx';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface FooterColumnProps {
  Links: Links[];
  selectedLink?: string;
}

const FooterColumn = ({ Links, selectedLink }: FooterColumnProps) => {
  const { t } = useTranslation(['index']);
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  return (
    <div className="footer_column">
      <ul
        className={clsx(
          'flex font-normal',
          isBlog ? 'gap-4' : 'flex-col gap-2',
        )}
      >
        {Links.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className={clsx(
              'hover:text-log-col hover:scale-110 relative group transition-all duration-1000 ease-in-out transform origin-bottom whitespace-nowrap',
              selectedLink === link.href && link.href !== '/'
                ? 'text-log-col'
                : '',
              !isBlog && 'cursor-none',
            )}
          >
            {t(link.text)}
            <span
              className={clsx(
                'absolute -bottom-1 left-0 h-0.5 bg-log-col',
                selectedLink === link.href && link.href !== '/'
                  ? 'w-full'
                  : 'w-0 transition-all duration-1000 ease-in-out group-hover:w-full',
                !isBlog && 'cursor-none',
              )}
            ></span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default memo(FooterColumn);
