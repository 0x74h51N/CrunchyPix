'use client';
import CustomLink from '@/components/CustomLink';
import { generateSpans } from '@/components/GenerateSpans';
import LoadingComponent from '@/components/Loading/Loading';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import useDragHandler from '@/hooks/useDragHandler';
import useSupabaseFetch from '@/hooks/useSupabaseFetch';
import { ProjectPageProps, ProjectPageSchema } from '@/lib/schemas';
import { RootState } from '@/store';
import { fadeIn, polygonIn, slideIn, textVariant } from '@/utils/motion';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import { useSelector } from 'react-redux';
import breaks from 'remark-breaks';
import CatalogueViewer from './CatalogueViewer/CatalogueViewer';
import ImageBoxes from './ImageBoxes';
import ProjectInfo from './ProjectInfo';
import TopImage from './TopImage';
import Ticks from './ticks';

const Project = ({ id }: { id: string }) => {
  const [Item, setItem] = useState<ProjectPageProps>();
  const { i18n, t } = useTranslation('portfolio');
  const isTouchDevice = useSelector((state: RootState) => state.isTouch.touch);
  const storedItems = useSelector((state: RootState) => state.portfolio.items);
  const { handleMouseLeave } = useClickableHandlers();
  const { hoverEnd } = useDragHandler();
  const filters = useMemo(() => [{ column: 'project_id', value: id }], [id]);
  const { data, loading, error } = useSupabaseFetch<ProjectPageProps>(
    'portfolio_schema',
    'project_page',
    '*, project_card(*)',
    ProjectPageSchema,
    filters,
  );
  const pageTitle = t('meta.title');
  if (error) {
    console.log(error);
  }
  useEffect(() => {
    hoverEnd();
    handleMouseLeave();
    if (data) {
      setItem(data.find((item) => item.lang === i18n.language));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="flexCenter min-w-[100svw] min-h-[100svh] overflow-hidden !select-none">
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
            className="flex flex-col items-center h-full w-full max-w-[1300px] min-h-[100svh] md:py-20 py-14 sm:px-8 px-4 delay-700 duration-1000"
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
                    <span className="absolute h2 bold cool !text-zinc-800 md:-top-1 top-0 left-0 bg-log-col -rotate-6 hover:rotate-0 transition-all duration-500 ease-in-out rounded-md px-1 py-0">
                      {Item.description.charAt(0)}
                    </span>
                    <Markdown
                      remarkPlugins={[breaks]}
                      className="h4 lg:ml-[39px] md:ml-9 xs:ml-8 ml-6"
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
                    className="lg:w-2/3 sm:w-full w-auto xl:pr-0 lg:pr-24 max-sm:mb-6 max-sm:ml-6"
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
};
Project.displayName = 'Project';
export default Project;
