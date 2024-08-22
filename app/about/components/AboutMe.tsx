'use client';

import FullScreenSlider from '@/components/Slider/FullScreenSlider/FullScreenSlider';
import { polygonIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Accordiona from './Accordiona';
import { generateSpans } from '@/components/GenerateSpans';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import VerticalTimeline from './timeline/VerticalTimeline';
import useDragHandler from '@/hooks/useDragHandler';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Option, slide } from '@/types/common.types';
import Dropdown from '@/components/Buttons/Dropdown';
import CustomLink from '@/components/CustomLink';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { SectionsSchema, SectionsTypes, TranslationTypes } from '@/schemas';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import i18next, { getLocale } from '@/i18n/client';
import LoadingComponent from '@/components/Loading/Loading';

const AboutMe = () => {
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const { hoverEnd } = useDragHandler();
  const { i18n, t } = useTranslation('about');
  const [selectedOption, setSelectedOption] = useState('normal');
  const [filteredData, setFilteredData] = useState<TranslationTypes>();
  const [faqs, setFaqs] = useState<TranslationTypes>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState<slide[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  const { data, loading, error } = useSupabaseFetch<SectionsTypes>(
    'about_me',
    'narrative',
    `*, translations(*, sub_sections(*))`,
    SectionsSchema,
  );

  useEffect(() => {
    hoverEnd();
    const language = i18next.language;
    const optionsObj = t('page.options', { returnObjects: true }) as string[];
    setOptions(
      Object.entries(optionsObj).map(([key, value]) => ({
        key: key,
        value: value,
        disabledTip: key === 'full' && t('page.list-tip'),
      })) as Option[],
    );
    if (data) {
      const i = data.findIndex((i) => i.name === 'photos');
      const maxLength = data[i].id;
      for (let i = 840; i <= maxLength; i++) {
        const img = {
          imageUrl: `crunchypix/photos/000${i}`,
        };
        setPhotos((prevPhotos) => [...prevPhotos, img]);
      }

      const filteredDat = filterByLanguage({
        items: data,
        language,
        localPath: 'translations',
      });

      if (filteredDat) {
        const i = filteredDat.findIndex((item) => item.name === selectedOption);
        const fI = filteredDat.findIndex((item) => item.name === 'faqs');
        setFilteredData(filteredDat[i].translations[0]);
        setFaqs(filteredDat[fI].translations[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedOption, i18next.language]);

  const sortedFaqs = useMemo(() => {
    if (faqs) {
      return faqs.sub_sections!.slice().sort((a, b) => a.id - b.id);
    }
    return [];
  }, [faqs]);

  if (error) {
    console.log(error);
  }
  return (
    <>
      <div className="flexCenter min-w-[100svw] min-h-[100svh] overflow-hidden relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 'some' }}
          variants={polygonIn('screen', 'easeInOut', 0.7, 0.8)}
          className=" flex flex-col items-center justify-between lg:w-[1300px] max-w-full min-h-[1900px] md:py-20 py-14 lg:px-10 px-6"
        >
          <div className="flex flex-col items-start h-full w-full">
            {filteredData && !loading ? (
              <h1 className="h1 self-start">
                {isTouchDevice
                  ? filteredData.title
                  : generateSpans({
                      text: filteredData.title,
                      colorType: 'vibrantColors',
                    })}
              </h1>
            ) : (
              <LoadingComponent />
            )}
            <div
              data-tip={t('page.mode')}
              className="self-start h-12 relative mb-4 w-[152px] pr-4 z-20 transform brightness-100 hover:brightness-150 transition-brightness ease-in-out duration-500 tooltip tooltip-right"
            >
              <Dropdown
                setSelectedOption={setSelectedOption}
                selectedOption={selectedOption}
                options={options}
                defaultValue={
                  options.find((opt) => opt.key === selectedOption)?.value
                }
                classes="absolute top-0 left-0 p flex items-end transition-height ease-in-out duration-500 w-full"
                liClass={
                  'px-3 py-1 first:border-t first:border-t-1 border-cool-gray-700'
                }
                openClass={'h-[220px] py-4'}
                closeClass={'h-full p-0 '}
                ulClasses="pt-7 w-full"
              />
            </div>
            <div className="h-full w-full max-sm:flex max-sm:flex-col-reverse ">
              <div className="flex lg:w-[500px] sm:max-w-[450px] lg:!h-[780px] !h-[700px] w-full sm:float-right md:ml-14 sm:ml-4 mb-4 max-sm:mt-8 max-lg:self-center">
                {photos.length > 0 && (
                  <FullScreenSlider
                    slides={photos}
                    className="w-full h-full object-cover md:rounded-2xl rounded-xl"
                  />
                )}
              </div>
              {selectedOption !== 'timeline' && filteredData && !loading && (
                <div className="p">
                  <ReactMarkdown
                    components={{ a: CustomLink }}
                    remarkPlugins={[breaks]}
                  >
                    {filteredData.description?.replace(/\\n/g, '\n')}
                  </ReactMarkdown>
                </div>
              )}
              {selectedOption === 'timeline' && (
                <div className="mt-8 w-full">
                  <VerticalTimeline events={filteredData!.sub_sections!} />
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full gap-8 items-end">
            <div className="flex flex-col w-full">
              {!loading && faqs && (
                <>
                  <h3
                    data-tip={t('page.faqsLong')}
                    className="h3 mt-20 self-start tooltip tooltip-top before:left-16 before:bg-nav-col"
                  >
                    {t('page.faqs')}
                  </h3>
                  <hr className="mb-4" />
                  {sortedFaqs.map((item, index) => (
                    <Accordiona
                      key={index}
                      title={item.title!}
                      description={item.description!}
                      activeIndex={activeIndex}
                      setActiveIndex={setActiveIndex}
                      index={index}
                    />
                  ))}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutMe;
