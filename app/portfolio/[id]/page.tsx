"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { polygonIn, textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProjectInfo from "./components/ProjectInfo";
import Image from "next/image";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { generateSpans } from "@/components/GenerateSpans";
import Ticks from "./components/ticks";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  useEffect(() => {
    const handleInitialized = () => {
      dispatch(setIsTranslationsLoaded(true));
    };

    if (i18n.isInitialized) {
      handleInitialized();
    } else {
      i18n.on("initialized", handleInitialized);
    }

    return () => {
      i18n.off("initialized", handleInitialized);
    };
  }, [dispatch]);

  if (!isTranslationsLoadedRedux) {
    return null;
  }
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    return <p>Couldn't find a portfolio item.</p>;
  }

  return (
    <div className="flexCenter min-w-[100svw] min-h-[100svh]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        variants={polygonIn("screen", "easeInOut", 0.5, 1)}
        className=" flex flex-col items-center h-full w-full max-w-[1300px] min-h-[100svh] p-10 pb-40 px-10"
      >
        {selectedItem.imageTop && (
          <div className="w-full h-[650px]">
            <Image
              width={1850}
              height={1850}
              quality={100}
              loading="lazy"
              src={selectedItem.imageTop}
              alt={selectedItem.imageAlt}
              className="w-full h-full object-center object-cover bg-gradient-to-br from-neutral-900 to-slate-700"
            />
          </div>
        )}
        <div className="flex self-start md:mt-16 mt-4">
          {selectedItem.title2 && (
            <h2 className="h1 half mb-6">
              {isMobile || isTablet
                ? t(selectedItem.title2)
                : generateSpans({
                    text: t(selectedItem.title2),
                    colorType: "vibrantColors",
                  })}
            </h2>
          )}
        </div>
        <div className="lg:relative flex flex-wrap w-full h-auto md:items-start md:justify-between justify-start items-center ">
          <div className="lg:w-2/3 w-full lg:pr-[120px] ">
            {selectedItem.description && (
              <motion.div
                variants={textVariant(1)}
                className="relative flex flex-row "
              >
                <span className="absolute h2 bold cool top-0 left-0 bg-log-col -rotate-6 hover:rotate-0 transition-all duration-500 ease-in-out rounded-md px-3 py-1">
                  {t(selectedItem.description).charAt(0)}
                </span>
                <Markdown
                  remarkPlugins={[breaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="h4 lg:ml-14 xs:ml-12 ml-10"
                >
                  {t(selectedItem.description).slice(1)}
                </Markdown>
              </motion.div>
            )}
            {selectedItem.description2 && (
              <motion.p variants={textVariant(1.5)} className="p mt-4">
                {t(selectedItem.description2)}
              </motion.p>
            )}
          </div>
          <div className="flex sm:flex-row flex-col max-sm:items-center max-sm:gap-8 w-full mt-6">
            {selectedItem.ticks && (
              <motion.div
                variants={polygonIn("down", "spring", 2, 1)}
                className=" lg:w-2/3 sm:w-full w-auto xl:pr-0 lg:pr-24 flex max-sm:mb-6"
              >
                <Ticks ticks={selectedItem.ticks} />
              </motion.div>
            )}
            <div className="lg:absolute right-0 lg:top-1 top-8">
              {selectedItem.ProjectInfo && (
                <ProjectInfo
                  ProjectInfo={selectedItem.ProjectInfo}
                  key={selectedItem._id}
                />
              )}
            </div>
          </div>
        </div>
        <motion.div className="flex md:flex-row flex-col items-center justify-between w-full h-auto my-36 max-md:mt-20 gap-6">
          {selectedItem.imageBoxes &&
            selectedItem.imageBoxes.map((image: string, index: number) => (
              <Image
                width={1000}
                height={1000}
                src={image}
                alt={selectedItem.imageAlt}
                key={index}
                className="flex max-w-[400px] w-full h-auto max-md:min-h-[400px] object-contain bg-gradient-to-br to-neutral-900 from-log-col"
              />
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PortfolioPage;
