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
import { IoIosArrowDroprightCircle } from "react-icons/io";
interface CardMakerProops {
  cardSections: CardSections;
  cardIndex?: number;
  textChildDelay?: number;
  textDelay?: number;
  cardHeight?: string;
  cardWidth?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const CardMaker = ({
  cardSections,
  cardIndex = 0,
  textChildDelay = 0.25,
  textDelay = 0,
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
      glareEnable={isMobile || isTablet ? false : cardSections.glare ?? true}
      glarePosition={"all"}
      glareMaxOpacity={0.2}
      glareBorderRadius="10px"
      className="bg-cool-gray-800 rounded-lg shadow-2xl"
    >
      <ColorfulBorder enabled={cardSections.colorFulBorder ?? false}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className={`flex dotted-background justify-start gap-8 items-start ${cardHeight} ${cardWidth} flex-col p-12 relative overflow-hidden cursor-pointer`}
        >
          <>
            {cardSections.image && (
              <motion.div
                variants={polygonIn(
                  "down",
                  "spring",
                  isMobile && cardSections.description
                    ? 0.5
                    : cardIndex * textChildDelay + textDelay,
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
                  variants={slideIn(
                    "down",
                    "spring",
                    isMobile ? 0.4 : cardIndex * textChildDelay + textDelay,
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
                  isMobile ? 0.5 : cardIndex * 0.5 + 0.7,
                  0.6
                )}
                className="overflow-hidden h-[130px] flex items-center text-center xs:text-[14px] text-[12px] mt-2 text-cool-gray-200 whitespace-normal"
              >
                {t(cardSections.description)}
              </motion.p>
            )}
            {cardSections.list && (
              <ul className="flex flex-col items-start ">
                {cardSections.list.map((item, index) => (
                  <motion.li
                    variants={polygonIn(
                      "down",
                      "spring",
                      cardIndex * textChildDelay + textDelay + index / 2,
                      1
                    )}
                    className="flex items-center text-cool-gray-200 mt-3"
                    key={index}
                  >
                    <IoIosArrowDroprightCircle className="mr-2" />
                    {t(item)}
                  </motion.li>
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
