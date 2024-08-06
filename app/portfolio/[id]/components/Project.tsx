'use client';
import { RootState } from '@/store';
import { useTranslation } from 'react-i18next';
import { fadeIn, polygonIn, slideIn, textVariant } from '@/utils/motion';
import { motion } from 'framer-motion';
import { memo, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';
import { generateSpans } from '@/components/GenerateSpans';
import TopImage from './TopImage';
import Ticks from './ticks';
import ProjectInfo from './ProjectInfo';
import CatalogueViewer from './CatalogueViewer/CatalogueViewer';
import CustomLink from '@/components/CustomLink';
import ImageBoxes from './ImageBoxes';
import { ProjectPageProps, ProjectPageSchema } from '@/schemas';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import LoadingComponent from '@/components/Loading/Loading';
import useDragHandler from '@/hooks/useDragHandler';

const Project = memo(({ id }: { id: string }) => {
  const [Item, setItem] = useState<ProjectPageProps>();
  const { i18n, t } = useTranslation('portfolio');
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const storedItems = useSelector((state: RootState) => state.portfolio.items);

  const { hoverEnd } = useDragHandler();

  const { data, loading, error } = useSupabaseFetch<ProjectPageProps>(
    'portfolio_schema',
    'project_page',
    '*, project_card(*)',
    ProjectPageSchema,
    [{ column: 'project_id', value: id }],
  );
  const pageTitle = t('meta.title');
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    hoverEnd();
    if (data) {
      setItem(data.find((item) => item.lang === i18n.language));
    }
  }, [data, i18n.language]);

  useEffect(() => {
    if (Item?.lang === i18n.language) {
      document.title = `${pageTitle} | ${Item.title}`;
    }
  }, [Item, i18n.language, pageTitle]);

  const storeItem = useMemo(() => {
    return Item && storedItems.find((a) => a._id === Item.project_id);
  }, [Item, storedItems]);

  const iconsArray = useMemo(
    () => (storeItem && storeItem.icons ? Object.values(storeItem.icons) : []),
    [storeItem],
  );

  return (
    <div className="flexCenter min-w-[100svw] min-h-[100svh] overflow-hidden">
      {loading ? (
        <LoadingComponent />
      ) : (
        Item &&
        storedItems && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 'some' }}
            variants={polygonIn('screen', 'easeInOut', 0, 0)}
            className="flex flex-col items-center h-full w-full max-w-[1300px] min-h-[100svh] md:py-20 py-14 px-8 delay-700 duration-1000"
          >
            <TopImage id={Item.project_id} icons={iconsArray} />
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 'some',
              }}
              className="lg:relative flex flex-wrap w-full h-auto lg:min-h-[590px] md:items-start md:justify-between justify-start items-center lg:mt-14 sm:mt-6 mt-4"
            >
              <div className="lg:w-2/3 w-full lg:pr-[120px] ">
                {Item.title2 && (
                  <motion.h2
                    variants={textVariant(0)}
                    className="h1 half mb-4 delay-[1000ms] duration-[1500ms]"
                  >
                    {isTouchDevice
                      ? Item.title2
                      : generateSpans({
                          text: Item.title2,
                          colorType: 'vibrantColors',
                        })}
                  </motion.h2>
                )}
                {Item.description && (
                  <motion.div
                    variants={textVariant(0)}
                    className="relative flex flex-row delay-[1200ms] duration-[1500ms]"
                  >
                    <span className="absolute h2 bold cool top-0 left-0 bg-log-col -rotate-6 hover:rotate-0 transition-all duration-500 ease-in-out rounded-md px-3 py-1">
                      {Item.description.charAt(0)}
                    </span>
                    <Markdown
                      remarkPlugins={[breaks]}
                      className="h4 lg:ml-14 xs:ml-12 ml-10"
                    >
                      {Item.description.slice(1).replace(/\\n/g, '\n')}
                    </Markdown>
                  </motion.div>
                )}
                {Item.description2 && (
                  <motion.div
                    variants={textVariant(0)}
                    className="p lg:mt-8 mt-4 delay-[1500ms] duration-[1500ms]"
                  >
                    <Markdown
                      remarkPlugins={[breaks]}
                      components={{ a: CustomLink }}
                    >
                      {Item.description2.replace(/\\n/g, '\n')}
                    </Markdown>
                  </motion.div>
                )}
              </div>
              <div className="flex sm:flex-row flex-col max-sm:gap-8 w-full mt-5">
                {Item.ticks && (
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 'some' }}
                    variants={polygonIn('down', 'spring', 1.2, 2)}
                    className="lg:w-2/3 sm:w-full w-auto xl:pr-0 lg:pr-24 max-sm:mb-6"
                  >
                    <Ticks ticks={Item.ticks} />
                  </motion.div>
                )}
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 'some' }}
                  variants={slideIn('right', 'spring', 0, 0)}
                  className="lg:absolute right-0 lg:top-0 flex self-center delay-[1500ms] duration-[1500ms]"
                >
                  {Item.project_card && (
                    <ProjectInfo
                      Tech={storeItem?.tech ?? []}
                      ProjectInfo={Item.project_card[0]}
                      key={Item.project_id}
                    />
                  )}
                </motion.div>
              </div>
            </motion.div>
            {storeItem?.catalogue ? (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 'some' }}
                variants={fadeIn('up', 'spring', 0, 0)}
                className="w-full my-14 cursor-none delay-[1500ms] duration-[1500ms]"
              >
                <CatalogueViewer Item={storeItem.catalogue} />
              </motion.div>
            ) : (
              <ImageBoxes _id={Item.project_id} />
            )}
            {Item.techDescription && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.h3
                  variants={polygonIn('up', 'spring', 0, 0)}
                  className="h3 self-start delay-[1500ms] duration-[1500ms]"
                >
                  {t('page.techTitle')}
                </motion.h3>
                <motion.div
                  variants={textVariant(0)}
                  className="p mt-4 w-full delay-[1000ms] duration-[1500ms]"
                >
                  <Markdown remarkPlugins={[breaks]}>
                    {Item.techDescription.replace(/\\n/g, '\n')}
                  </Markdown>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )
      )}
    </div>
  );
});
Project.displayName = 'Project';
export default memo(Project);
