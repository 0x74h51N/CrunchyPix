'use client';
import { polygonIn, slideIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useDragHandler from '@/hooks/useDragHandler';
import ProjectSlide from './ProjectSlide';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { memo, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const OtherProjects = () => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const { t } = useTranslation('portfolio');
  const portfolioItems = useSelector(
    (state: RootState) => state.portfolio.items,
  );
  useEffect(() => {
    const urlParts = pathname.split('/');
    const currentChildPage = urlParts[2];
    if (!currentChildPage || currentChildPage === '') {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [pathname]);
  const { hoverStart, hoverEnd } = useDragHandler();
  return show ? (
    <div className="flexCenter w-auto h-auto min-w-[100svw] overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 'some' }}
        variants={polygonIn('screen', 'spring', 1, 1.8)}
        className="w-full max-w-[1300px] h-auto mb-24 px-8 "
        onHoverStart={hoverStart}
        onHoverEnd={hoverEnd}
      >
        <motion.div variants={slideIn('up', 'easeInOut', 1.6, 1)}>
          <h2 className="h1 half w-full mb-2 text-center">
            {t('page.otherProjects')}
          </h2>
        </motion.div>
        <ProjectSlide Items={portfolioItems} />
      </motion.div>
    </div>
  ) : null;
};

export default memo(OtherProjects);
