import { ColorfulHover } from './ColorfulHover';
import { ColorfulHoverType } from '@/lib/types/common.types';
import { IconProps } from '@/lib/schemas';
import IconButton from './Buttons/IconButton';
import { Fragment } from 'react';

type SocialIconProp = {
  iconPack: IconProps[];
  row?: boolean;
  colorful?: boolean;
};

export const SocialIcons = ({
  iconPack,
  _colorType,
  randomCount = 6,
}: SocialIconProp & ColorfulHoverType) => {
  const iconRadius = 210;
  const totalIcons = iconPack.length;
  const angleIncrement = Math.PI / 2 / totalIcons;
  return (
    <div className="relative w-full h-full flexCenter max-md:flex-row-reverse">
      {iconPack.map((icon: IconProps, index: number) => {
        const angle = index * angleIncrement;
        const x = iconRadius * Math.cos(angle);
        const y = -iconRadius * Math.sin(angle);

        const iconStyle: React.CSSProperties = {
          position: 'absolute',
          transform: `translate(${x}px, ${y}px)`,
          fontSize: '50px',
          color: 'white',
        };
        const mobileStyle: React.CSSProperties = {
          color: 'white',
        };

        return (
          <Fragment key={icon.alt + ' key'}>
            <ColorfulHover
              icon={icon}
              style={iconStyle}
              key={index}
              span={false}
              _colorType={_colorType}
              randomCount={randomCount}
              className="w-9 h-9 max-md:hidden"
            />
            <div
              className={`md:hidden flexCenter w-12 h-12 cursor-none pointer-events-auto sm:mt-8 mt-0 sm:ml-2 ml-0 sm:text-[40px] text-[30px]`}
              style={mobileStyle}
              key={index + ' mobile ' + icon.type}
            >
              {<IconButton icon={icon} key={index + ' mobile icon'} />}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
