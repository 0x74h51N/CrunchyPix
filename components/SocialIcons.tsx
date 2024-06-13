import { ColorfulHover } from './ColorfulHover';
import { ColorfulHoverType } from '@/app/common.types';
import { IconProps } from '@/schemas';
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
  const iconRadius = 250;
  const totalIcons = iconPack.length;
  const angleIncrement = Math.PI / 2 / totalIcons;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {iconPack.map((icon: IconProps, index: number) => {
        const angle = index * angleIncrement;
        const x = iconRadius * Math.cos(angle);
        const y = -iconRadius * Math.sin(angle);

        const iconStyle: React.CSSProperties = {
          position: 'absolute' as 'absolute',
          transform: `translate(${x}px, ${y}px)`,
          fontSize: '50px',
          color: 'white',
        };
        const mobileStyle: React.CSSProperties = {
          color: 'white',
        };

        return (
          <Fragment key={icon.alt}>
            <ColorfulHover
              icon={icon}
              style={iconStyle}
              key={index}
              span={false}
              _colorType={_colorType}
              randomCount={randomCount}
              className="w-9 h-9 max-lg:hidden"
            />
            <div
              className={`lg:hidden w-12 h-12 cursor-none pointer-events-auto flex justify-center items-center md:mt-12 mt-0 md:text-[40px] text-[30px]`}
              style={mobileStyle}
              key={index + ' mobile'}
            >
              {icon && <IconButton icon={icon} key={index + ' mobile icon'} />}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};
