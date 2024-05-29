"use client";
import { RootState } from "@/store";
import { useTranslation } from "react-i18next";
import { fadeIn, polygonIn, slideIn, textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { generateSpans } from "@/components/GenerateSpans";
import { PortfolioItemProps } from "@/app/common.types";
import TopImage from "./TopImage";
import Ticks from "./ticks";
import ProjectInfo from "./ProjectInfo";
import CatalogueViewer from "./CatalogueViewer/CatalogueViewer";
import CustomLink from "@/components/CustomLink";
import ImageBoxes from "./ImageBoxes";
import useClickableHandlers from "@/hooks/useClickableHandlers";
import useDragHandler from "@/hooks/useDragHandler";

const Project = memo(({ Item }: { Item: PortfolioItemProps }) => {
  const { hoverEnd } = useDragHandler();
  const { handleMouseLeave } = useClickableHandlers();
  useEffect(() => {
    hoverEnd();
    handleMouseLeave();
  }, []);
  const { t } = useTranslation("portfolio");
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);


  return (
    <div className="flexCenter min-w-[100svw] min-h-[100svh] overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        variants={polygonIn("screen", "easeInOut", 0.7, 0.8)}
        className="flex flex-col items-center h-full w-full max-w-[1300px] min-h-[100svh] md:py-20 py-14 px-8"
      >
        {Item.imageTop && (
          <TopImage
            imageTop={Item.imageTop}
            imageTopMobile={Item.imageTopMobile && Item.imageTopMobile}
            imageAlt={Item.imageAlt}
            icons={Item.icons && Item.icons}
          />
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: isTablet|| isMobile ? 'some' : 0.65,
          }}
          className="lg:relative flex flex-wrap w-full h-auto lg:min-h-[590px] md:items-start md:justify-between justify-start items-center lg:mt-14 sm:mt-6 mt-4"
        >
          <div className="lg:w-2/3 w-full lg:pr-[120px] ">
            {Item.title2 && (
              <motion.h2 variants={textVariant(1)} className="h1 half mb-4">
                {isMobile || isTablet
                  ? t(Item.title2)
                  : generateSpans({
                      text: t(Item.title2),
                      colorType: "vibrantColors",
                    })}
              </motion.h2>
            )}
            {Item.description && (
              <motion.div
                variants={textVariant(1.5)}
                className="relative flex flex-row"
              >
                <span className="absolute h2 bold cool top-0 left-0 bg-log-col -rotate-6 hover:rotate-0 transition-all duration-500 ease-in-out rounded-md px-3 py-1">
                  {t(Item.description).charAt(0)}
                </span>
                <Markdown
                  remarkPlugins={[breaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="h4 lg:ml-14 xs:ml-12 ml-10"
                >
                  {t(Item.description).slice(1)}
                </Markdown>
              </motion.div>
            )}
            {Item.description2 && (
              <motion.div variants={textVariant(2)} className="p lg:mt-8 mt-4">
                <Markdown
                  remarkPlugins={[breaks]}
                  rehypePlugins={[rehypeRaw]}
                  components={{ a: CustomLink }}
                >
                  {t(Item.description2)}
                </Markdown>
              </motion.div>
            )}
          </div>
          <div className="flex sm:flex-row flex-col max-sm:gap-8 w-full mt-5">
            {Item.ticks && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount:'some'}}
                variants={polygonIn("down", "spring", isMobile? 0.85 : 1.8, 2)}
                className="lg:w-2/3 sm:w-full w-auto xl:pr-0 lg:pr-24 max-sm:mb-6"
              >
                <Ticks ticks={Item.ticks} />
              </motion.div>
            )}
            {Item.ProjectInfo && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 'some'}}
                variants={slideIn("right", "spring", 1.5, 1.5)}
                className="lg:absolute right-0 lg:top-0"
              >
                <ProjectInfo ProjectInfo={Item.ProjectInfo} key={Item._id} />
              </motion.div>
            )}
          </div>
        </motion.div>
        {Item.imageBoxes && (
          <ImageBoxes imageBoxes={Item.imageBoxes} _id={Item._id} />
        )}
        {Item.catalogue && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            variants={fadeIn("up", "spring", 2.5, 2)}
            className="w-full my-14 cursor-none"
          >
            <CatalogueViewer Item={Item.catalogue} />
          </motion.div>
        )}
        {Item.techDescription && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true}}
          >
            <motion.h3 variants={textVariant(1.5)} className="h3 self-start">
              {t("page.techTitle")}
            </motion.h3>
            <motion.div
              variants={polygonIn("down", "spring", 1.8, 2.2)}
              className="p mt-4 w-full "
            >
              <Markdown remarkPlugins={[breaks]} rehypePlugins={[rehypeRaw]}>
                {t(Item.techDescription)}
              </Markdown>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});
Project.displayName = "Project";
export default memo(Project);
