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
    <motion.div
      variants={slideIn(
        "down",
        "spring",
        isMobile ? 0.5 : index * cardChildDelay + cardDelay,
        0.6
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: "all" }}
      className="m-0"
    >
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
            whileInView="show"
            viewport={{ once: true, amount: 0.7 }}
            className={`flex justify-evenly items-center  ${cardHeight} ${cardWidth} flex-col bg-transparent p-4 relative overflow-hidden cursor-pointer`}
          >
            <>
              <motion.div
                variants={polygonIn(
                  "down",
                  "spring",
                  isMobile && cardSections.description
                    ? 1
                    : index * textChildDelay + textDelay,
                  0.6
                )}
                className="flex justify-center items-center"
              >
                {cardSections.icon && <IconButton icon={cardSections.icon} />}
                {cardSections.image && (
                  <Image
                    src={cardSections.image}
                    alt={cardSections.image}
                    width={imageWidth}
                    height={imageHeight}
                    quality={100}
                  />
                )}
              </motion.div>
              {cardSections.title && (
                <motion.h2
                  variants={fadeIn(
                    "down",
                    "spring",
                    isMobile ? 1 : index * textChildDelay + textDelay,
                    0.6
                  )}
                  className={`overflow-hidden h-[auto] font-medium lg:text-[20px] sm:text-[18px] text-[16px] ${
                    cardSections.image ? "mt-0 " : "mt-4"
                  } text-cool-gray-100 text-center`}
                >
                  {t(cardSections.title)}
                </motion.h2>
              )}
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
            </>
          </motion.div>
        </ColorfulBorder>
      </Tilt>
    </motion.div>
  );
};

export default CardMaker;
