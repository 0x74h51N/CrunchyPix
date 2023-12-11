import { CardSections } from "@/app/common.types";
import { useTranslation } from "react-i18next";
import { ColorfulBorder } from "./ColorfulBorder";
import IconButton from "./Buttons/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { memo } from "react";
interface CardMakerProops {
  cardSections: CardSections;
  cardHeight?: number;
  cardWidth?: number;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
}

const CardMaker = memo(
  ({
    cardSections,
    cardHeight = 340,
    cardWidth = 260,
    imageWidth = 100,
    imageHeight = 100,
    className,
  }: CardMakerProops) => {
    const { t } = useTranslation(["translation"]);
    const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
    const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
    const tiltEnabled = cardSections.tilt ?? true;
    const glareEnabled = cardSections.glare ?? true;
    return (
      <Tilt
        tiltEnable={!isMobile && !isTablet ? tiltEnabled : false}
        tiltReverse
        gyroscope={true}
        glareEnable={!isMobile && !isTablet ? glareEnabled : false}
        glarePosition={"all"}
        glareMaxOpacity={0.2}
        glareBorderRadius="10px"
        className="bg-cool-gray-800 rounded-lg shadow-2xl cursor-none"
      >
        <ColorfulBorder enabled={cardSections.colorFulBorder ?? false}>
          <div
            className={`${className} flex dotted-background justify-start gap-8 items-start flex-col p-12 relative overflow-hidden cursor-none`}
            style={{ width: cardWidth, height: cardHeight }}
          >
            <>
              {cardSections.image && (
                <div className="flex flex-col justify-center items-start">
                  <Image
                    src={cardSections.image}
                    alt={cardSections.image}
                    width={imageWidth}
                    height={imageHeight}
                    quality={100}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="flex flex-col w-full gap-12 justify-start items-start">
                {cardSections.icon && <IconButton icon={cardSections.icon} />}
                {cardSections.title && (
                  <h2
                    className={` overflow-hidden h-[auto] font-medium lg:text-[22px] sm:text-[20px] text-[18px] text-cool-gray-50 text-center`}
                  >
                    {t(cardSections.title)}
                  </h2>
                )}
              </div>
              {cardSections.description && (
                <p className="overflow-hidden h-[130px] flex items-center text-center xs:text-[14px] text-[12px] mt-2 text-cool-gray-200 whitespace-normal">
                  {t(cardSections.description)}
                </p>
              )}
              {cardSections.list && (
                <ul className="flex flex-col items-start ">
                  {cardSections.list.map((item, index) => (
                    <li
                      className="flex items-center text-cool-gray-200 mt-3"
                      key={index}
                    >
                      <IoIosArrowDroprightCircle className="mr-2" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              )}
            </>
          </div>
        </ColorfulBorder>
      </Tilt>
    );
  }
);

export default CardMaker;
