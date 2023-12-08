import { motion } from "framer-motion";
import { CardSections } from "@/app/common.types";
import { useTranslation } from "react-i18next";
import { ColorfulBorder } from "./ColorfulBorder";
import IconButton from "./Buttons/IconButton";
import { fadeIn, polygonIn, slideIn } from "@/utils/motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Tilt from "react-parallax-tilt";
import Image from "next/image";

interface CardMakerProops {
  cardSections: CardSections;
  index?: number;
  cardChildDelay?: number;
  cardDelay?: number;
  textChildDelay?: number;
  textDelay?: number;
  cardHeight?: string;
  cardWidth?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const CardMaker = ({
  cardSections,
  index = 1,
  cardChildDelay = 0.4,
  cardDelay = 0.3,
  textChildDelay = 0.5,
  textDelay = 0.7,
  cardHeight = "h-[340px]",
  cardWidth = "w-[260px]",
  imageWidth = 100,
  imageHeight = 100,
}: CardMakerProops) => {
  const { t } = useTranslation(["translation"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);

  return (
    <Tilt
      tiltEnable={isMobile || isTablet ? false : cardSections.tilt ?? true}
      tiltReverse
      gyroscope={true}
      glareEnable={isMobile || isTablet ? false : cardSections.tilt ?? true}
      glarePosition={"all"}
      glareMaxOpacity={0.5}
    >
      <ColorfulBorder enabled={cardSections.colorFulBorder ?? true}>
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true, amount: 0.5 }}
          className={`flex justify-start gap-8 items-start ${cardHeight} ${cardWidth} flex-col bg-transparent p-12 relative overflow-hidden cursor-pointer`}
        >
          <>
            {cardSections.image && (
              <motion.div
                variants={polygonIn(
                  "down",
                  "spring",
                  isMobile && cardSections.description
                    ? 1
                    : index * textChildDelay + textDelay,
                  0.6
                )}
                className="flex flex-col justify-center items-start"
              >
                <Image
                  src={cardSections.image}
                  alt={cardSections.image}
                  width={imageWidth}
                  height={imageHeight}
                  quality={100}
                  loading="lazy"
                />
              </motion.div>
            )}
            <div className="flex flex-col w-full gap-12 justify-start items-start">
              {cardSections.icon && <IconButton icon={cardSections.icon} />}
              {cardSections.title && (
                <motion.h2
                  variants={fadeIn(
                    "down",
                    "spring",
                    isMobile ? 1 : index * textChildDelay + textDelay,
                    0.6
                  )}
                  className={`overflow-hidden h-[auto] font-medium lg:text-[22px] sm:text-[20px] text-[18px] text-cool-gray-50 text-center`}
                >
                  {t(cardSections.title)}
                </motion.h2>
              )}
            </div>
            {cardSections.description && (
              <motion.p
                variants={fadeIn(
                  "up",
                  "spring",
                  isMobile ? 1 : index * 0.5 + 0.7,
                  0.6
                )}
                className="overflow-hidden h-[130px] flex items-center text-center xs:text-[14px] text-[12px] mt-2 text-cool-gray-200 whitespace-normal"
              >
                {t(cardSections.description)}
              </motion.p>
            )}
            {cardSections.list && (
              <ul className="list-disc pl-5">
                {cardSections.list.map((item, index) => (
                  <li className="text-cool-gray-200 mt-3" key={index}>
                    {t(item)}
                  </li>
                ))}
              </ul>
            )}
          </>
        </motion.div>
      </ColorfulBorder>
    </Tilt>
  );
};

export default CardMaker;
