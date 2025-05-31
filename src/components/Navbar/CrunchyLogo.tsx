'use client';
import Image from 'next/image';
import TypingText from '../typeText';
import { memo } from 'react';
import clsx from 'clsx';

const CrunchyLogo = ({
  smallNav = false,
  loadingMode = false,
  theme = 'dark',
}: {
  smallNav?: boolean;
  loadingMode?: boolean;
  theme?: 'dark' | 'light';
}) => {
  return (
    <>
      <Image
        src={
          theme && theme === 'light' ? '/logo_left-b.svg' : '/logo_leftw.svg'
        }
        width={100}
        height={100}
        alt="Crunchypix"
        priority
        className={clsx(
          'h-auto hover:scale-105 transition-all duration-700 ease-in-out pb-3',
          smallNav
            ? 'w-[12.5px]'
            : 'navImage lg:w-[32.5px] md:w-[27.5px] w-[18.5px]',
        )}
      />
      {smallNav ? null : (
        <div
          className={clsx(
            'flex items-center logo_text lg:mt-0 -mt-1 lg:-ml-2 -ml-1 text-stone-50 hover:scale-105 transition-all duration-700 ease-in-out',
            smallNav
              ? 'text-[25px]'
              : 'text-[30px] md:text-[45px] lg:text-[55px]',
          )}
        >
          <TypingText
            text="Crunchy"
            typingSpeed={50}
            reverseDelay={400}
            loadingMode={loadingMode}
          />
          <span className="mt-12 -ml-1">
            <TypingText
              text="Pix"
              typingSpeed={70}
              delay={400}
              textClass={`text-log-col`}
              loadingMode={loadingMode}
            />
          </span>
        </div>
      )}
      <Image
        src={'/logo-right.svg'}
        width={100}
        height={100}
        alt="Crunchypix"
        priority
        className={clsx(
          'h-auto hover:scale-105 transition-all duration-700 ease-in-out',
          smallNav
            ? 'mt-2 w-[19.3px]'
            : 'navImage lg:translate-y-6 translate-y-[22px] -translate-x-2 lg:w-[50px] md:w-[40px] w-[28px]',
        )}
      />
    </>
  );
};

export default memo(CrunchyLogo);
