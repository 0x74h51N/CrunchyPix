'use client';
import { JSX, memo, useEffect, useState } from 'react';
import breaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';
import CustomLink from '../CustomLink';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/motion';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { useTranslation } from 'react-i18next';
import {
  setCookiesConsent,
  getCookieConsent,
} from '@/app/actions/setCookiesConsent';

const CookieConsent = () => {
  const { t } = useTranslation('index');
  const [showConsent, setShowConsent] = useState(true);
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();

  const handleAccept = async () => {
    await setCookiesConsent();
    setShowConsent(true);
    handleMouseLeave();
  };

  useEffect(() => {
    const getCookie = async () => {
      const response = await getCookieConsent();
      if (response !== 'true') {
        setShowConsent(false);
      }
    };

    getCookie();
  }, []);

  if (showConsent) {
    return null;
  } else {
    return (
      <div
        id="cookie-consent"
        className="fixed inset-0 flex flex-col items-center justify-end py-0 lg:py-10 z-[599] h-full w-full pointer-events-none"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 'some' }}
          variants={fadeIn('up', 'spring', 3, 1)}
          className="bg-neutral-900/70 navbar xl:rounded-lg overflow-visible shadow-xl w-full xl:max-w-[1000px] h-auto z-50 "
        >
          <div className="md:px-8 md:py-4 p-6 flex justify-between w-full items-center max-lg:flex-col z-50 lg:gap-8 gap-4">
            <div className="flex flex-col">
              <h1 className="p">{t('cookies.title')}</h1>
              <div className="p text-sm! mt-1 pointer-events-auto">
                <ReactMarkdown
                  components={{
                    a: ({
                      children,
                      ...props
                    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                      <CustomLink href={props.href as string}>
                        {children as JSX.Element}
                      </CustomLink>
                    ),
                  }}
                  remarkPlugins={[breaks]}
                >
                  {t('cookies.description')}
                </ReactMarkdown>
              </div>
            </div>
            <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="btn btn-lg md:w-30 bg-neutral-400 hover:bg-green-700/40 text-white sm:text-sm text-[12px] font-bold py-2 px-4 rounded  active:bg-green-800 z-50 pointer-events-auto whitespace-nowrap"
              onClick={handleAccept}
            >
              {t('cookies.accept')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
};

export default memo(CookieConsent);
