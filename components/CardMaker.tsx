import ColorfulBorder from './ColorfulBorder';
import IconButton from './Buttons/IconButton';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import { Key, memo } from 'react';
import { CardsTypes, IconProps } from '@/schemas';

const areEqual = (prevProps: CardMakerProps, nextProps: CardMakerProps) => {
  return (
    prevProps.cardSections === nextProps.cardSections &&
    prevProps.cardHeight === nextProps.cardHeight &&
    prevProps.cardWidth === nextProps.cardWidth &&
    prevProps.className === nextProps.className
  );
};

interface CardMakerProps {
  cardSections: CardsTypes;
  cardHeight: number;
  cardWidth: number;
  className: string;
}
const createIcon = (type: string): IconProps => ({
  type,
  size: 60,
  color: '#eeb30d',
});
const CardMaker = memo(
  ({
    cardSections,
    cardHeight = 340,
    cardWidth = 260,
    className,
  }: CardMakerProps) => {
    return (
      <ColorfulBorder>
        <div
          className={`${className} flex justify-start gap-8 items-start flex-col p-12 relative overflow-hidden cursor-none`}
          style={{ width: cardWidth, height: cardHeight }}
        >
          <div className="flex flex-col w-full gap-12 justify-start items-start">
            <IconButton icon={createIcon(cardSections.icon_name)} />
            <h2
              className={`overflow-hidden h-[auto] font-medium lg:text-[22px] sm:text-[20px] text-[18px] text-cool-gray-50 text-center`}
            >
              {cardSections.title}
            </h2>
          </div>
          {cardSections.list && (
            <ul className="flex flex-col items-start ">
              {cardSections.list.map((item: string, index: Key | number) => (
                <li
                  className="flex items-center text-cool-gray-200 mt-3"
                  key={index}
                >
                  <IoIosArrowDroprightCircle className="mr-2 text-log-col" />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ColorfulBorder>
    );
  },
  areEqual,
);
CardMaker.displayName = 'CardMaker';
export default CardMaker;
