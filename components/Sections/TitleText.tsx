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
    <>
      <h1>
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
      </h1>
      {section[0].translations[0].description &&
        section[0].translations[0].description !== 'NULL' && (
          <p className={pClass}>{section[0].translations[0].description}</p>
        )}
    </>
  );
};

export default memo(TitleText);
