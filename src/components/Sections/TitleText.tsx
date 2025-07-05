import React, { memo, useMemo } from 'react';
import { generateSpans } from '../GenerateSpans';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SectionsTypes } from '@/lib/schemas';
import useFilteredData from '@/hooks/useFilteredData';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant } from '@/utils/motion';

const getClassNames = (
  sectName: string,
  baseClass: string,
  altClass: string,
) => {
  let classNames = baseClass;
  if (sectName.includes('design') || sectName.includes('code')) {
    classNames = altClass;
    if (sectName.includes('design')) {
      classNames += ' xl:text-right';
    }
  }
  return classNames;
};

const TitleText = ({ sectName }: { sectName: string }) => {
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const section = useFilteredData<SectionsTypes>(
    (state: RootState) => state.section.items,
    {
      key: 'name',
      value: sectName,
    },
  );
  const titleClass = useMemo(
    () => getClassNames(sectName, 'h1', 'sect-h1'),
    [sectName],
  );
  const h2Class = useMemo(
    () => getClassNames(sectName, 'h2', 'sect-h2'),
    [sectName],
  );
  const pClass = useMemo(
    () => getClassNames(sectName, 'mt-4 p max-w-3xl', 'sect-p'),
    [sectName],
  );
  if (!sectName.length || !section[0].translations.length) {
    return null;
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={staggerContainer(1.2, 0)}
    >
      <motion.h1 variants={fadeIn('up', 'spring', 0.5, 1.2)}>
        <div className={h2Class}>
          {isTouchDevice
            ? section[0].translations[0].intro
            : generateSpans({
                text: section[0].translations[0].intro,
                colorType: 'vibrantColors',
                zeroColor: '#737373',
              })}
        </div>
        <div className={titleClass}>
          {isTouchDevice
            ? section[0].translations[0].title
            : generateSpans({
                text: section[0].translations[0].title,
                colorType: 'vibrantColors',
              })}
        </div>
      </motion.h1>
      {section[0].translations[0].description &&
        section[0].translations[0].description !== 'NULL' && (
          <motion.p variants={textVariant(0.7, 0.9)} className={`${pClass}`}>
            {section[0].translations[0].description}
          </motion.p>
        )}
    </motion.div>
  );
};

export default memo(TitleText);
