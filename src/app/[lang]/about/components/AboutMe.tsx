'use client';

import Dropdown from '@/components/Buttons/Dropdown';
import CustomLink from '@/components/CustomLink';
import { generateSpans } from '@/components/GenerateSpans';
import LoadingComponent from '@/components/Loading/Loading';
import FullScreenSlider from '@/components/Slider/FullScreenSlider/FullScreenSlider';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { SectionsSchema, SectionsTypes, TranslationTypes } from '@/lib/schemas';
import { Option, slide } from '@/lib/types/common.types';
import filterByLanguage from '@/lib/utils/filterByLanguage';
import { RootState } from '@/store';
import { polygonIn } from '@/utils/motion';
import { motion } from 'framer-motion';
import { JSX, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import breaks from 'remark-breaks';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Accordiona from './Accordiona';
import VerticalTimeline from './timeline/VerticalTimeline';

const AboutMe = () => {
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const { t, i18n } = useTranslation('about');
  const [selectedOption, setSelectedOption] = useState('normal');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { data, loading, error } = useSupabaseFetch<SectionsTypes>(
    'about_me',
    'narrative',
    `*, translations(*, sub_sections(*))`,
    SectionsSchema,
  );

  const options = useMemo<Option[]>(() => {
    const optionsObj = t('page.options', { returnObjects: true }) as Record<
      string,
      string
    >;
    return Object.entries(optionsObj).map(([key, value]) => ({
      key,
      value,
      disabledTip: key === 'full' && t('page.list-tip'),
    })) as Option[];
  }, [t]);

  const photos = useMemo<slide[]>(() => {
    if (!data) return [];
    const i = data.findIndex((d) => d.name === 'photos');
    if (i === -1) return [];
    const maxLength = data[i].id;
    const result: slide[] = [];
    for (let idx = 840; idx <= maxLength; idx++) {
      result.push({ imageUrl: `crunchypix/photos/000${idx}` });
    }
    return result;
  }, [data]);

  const { filteredData, faqs } = useMemo<{
    filteredData?: TranslationTypes;
    faqs?: TranslationTypes;
  }>(() => {
    if (!data) return {};
    const filteredDat = filterByLanguage({
      items: data,
      language: i18n.language,
      localPath: 'translations',
    });
    if (!filteredDat) return {};
    const i = filteredDat.findIndex((item) => item.name === selectedOption);
    const fI = filteredDat.findIndex((item) => item.name === 'faqs');
    return {
      filteredData: filteredDat[i]?.translations[0],
      faqs: filteredDat[fI]?.translations[0],
    };
  }, [data, selectedOption, i18n.language]);

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
      <div className="flexCenter min-w-[100svw] min-h-[100svh] overflow-hidden relative !select-none !cursor-none">
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
              className="self-start h-12 relative mb-4 w-[152px] pr-4 z-20 transform brightness-100 hover:brightness-150 transition-brightness ease-in-out duration-500 tooltip tooltip-right before:bg-nav-col"
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
                    className="h3 mt-20 self-start tooltip tooltip-top before:left-20 before:bg-nav-col"
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
