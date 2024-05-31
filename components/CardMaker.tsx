import { CardSections } from '@/app/common.types'
import { useTranslation } from 'react-i18next'
import ColorfulBorder from './ColorfulBorder'
import IconButton from './Buttons/IconButton'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { memo } from 'react'

const areEqual = (prevProps: CardMakerProops, nextProps: CardMakerProops) => {
  return (
    prevProps.cardSections === nextProps.cardSections &&
    prevProps.cardHeight === nextProps.cardHeight &&
    prevProps.cardWidth === nextProps.cardWidth &&
    prevProps.className === nextProps.className &&
    prevProps.translatePath === nextProps.translatePath
  )
}

interface CardMakerProops {
  cardSections: CardSections
  cardHeight?: number
  cardWidth?: number
  className?: string
  translatePath: string
}

const CardMaker = memo(
  ({
    cardSections,
    cardHeight = 340,
    cardWidth = 260,
    className,
    translatePath,
  }: CardMakerProops) => {
    const { t } = useTranslation([translatePath])
    return (
      <div className="rounded-lg shadow-2xl cursor-none">
        <ColorfulBorder enabled={cardSections.colorFulBorder ?? false}>
          <div
            className={`${className} flex justify-start gap-8 items-start flex-col p-12 relative overflow-hidden cursor-none`}
            style={{ width: cardWidth, height: cardHeight }}
          >
            <>
              <div className="flex flex-col w-full gap-12 justify-start items-start">
                {cardSections.icon && <IconButton icon={cardSections.icon} />}
                {cardSections.title && (
                  <h2
                    className={`overflow-hidden h-[auto] font-medium lg:text-[22px] sm:text-[20px] text-[18px] text-cool-gray-50 text-center`}
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
                      <IoIosArrowDroprightCircle className="mr-2 text-log-col" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
              )}
            </>
          </div>
        </ColorfulBorder>
      </div>
    )
  },
  areEqual,
)
CardMaker.displayName = 'CardMaker'
export default CardMaker
