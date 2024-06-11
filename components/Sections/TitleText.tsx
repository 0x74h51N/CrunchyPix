import { slideIn, textVariant } from '@/utils/motion';
import { motion } from 'framer-motion';
import React, { memo, useMemo } from 'react';
import { generateSpans } from '../GenerateSpans';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { SectionsTypes } from '@/schemas';
import useFilteredData from '@/hooks/useFilteredData';

const getClassNames = (
  sectName: string,
  baseClass: string,
  altClass: string,
) => {
  let classNames = baseClass;
  if (sectName.includes('design') || sectName.includes('code')) {
    classNames = altClass;
    if (sectName.includes('design')) {
      classNames += ` xl:text-right`;
    }
  }
  return classNames;
};

const TitleText = ({ sectName }: { sectName: string }) => {
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
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
  const variants =
    sectName.includes('design') || sectName.includes('code')
      ? undefined
      : sectName.includes('logo')
        ? slideIn('up', 'spring', 0.6, 1.4)
        : slideIn('left', 'spring', 0.8, 1);
  return (
    <>
      <motion.h1 variants={variants}>
        <div className={h2Class}>
          {isMobile || isTablet
            ? section[0].translations[0].intro
            : generateSpans({
                text: section[0].translations[0].intro,
                colorType: 'vibrantColors',
                zeroColor: '#737373',
              })}
        </div>
        <div className={titleClass}>
          {isMobile || isTablet
            ? section[0].translations[0].title
            : generateSpans({
                text: section[0].translations[0].title,
                colorType: 'vibrantColors',
              })}
        </div>
      </motion.h1>
      {section[0].translations[0].description &&
        section[0].translations[0].description !== 'NULL' && (
          <>
            <motion.p variants={textVariant(1)} className={pClass}>
              {section[0].translations[0].description}
            </motion.p>
            ,
          </>
        )}
    </>
  );
};

export default memo(TitleText);
