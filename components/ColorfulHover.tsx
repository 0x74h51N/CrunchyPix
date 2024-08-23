import { ColorfulHoverType } from '@/types/common.types';
import { getRandomColor } from '@/utils/getRandomColor';
import { useAnimation, motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import IconButton from './Buttons/IconButton';

/**
 * `ColorfulHover` is a React component that changes its text or icon color to a random color
 * when hovered over, using Framer Motion for smooth animations. This component can be used
 * for both text and icon elements, and it allows customization of the color change behavior
 * through various props.
 *
 * @param {string} [char] - The character or text to display inside the component. If `span` is true, this will be rendered inside a <span> element.
 * @param {IconProps} [icon] - The icon to display inside the component. This will be rendered inside an `IconButton` component if provided.
 * @param {React.CSSProperties} [style] - Optional inline styles to apply to the component.
 * @param {string} [className] - Optional CSS class names to apply to the component.
 * @param {boolean} [span] - If true, the content will be wrapped in a <span> element; otherwise, it will be wrapped in a <div> element.
 * @param {ColorType} [_colorType='themeColors'] - Defines the color type to be used for generating random colors. It can be set to 'random', 'themeColors', or any other custom type defined in the application.
 * @param {number} [randomCount=6] - The number of random colors to generate when `_colorType` is set to 'random'.
 * @param {string} [zeroColor='#FFFFFF'] - The default color of the text or icon when not hovered.
 *
 * @returns {JSX.Element} - A React element that animates its color on hover.
 */
export const ColorfulHover = ({
  char,
  icon,
  style,
  className,
  span,
  _colorType = 'themeColors',
  randomCount = 6,
  zeroColor = '#FFFFFF',
}: ColorfulHoverType) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered((prev) => !prev);
  };

  useEffect(() => {
    const color = isHovered
      ? getRandomColor(
          _colorType === 'random'
            ? { colorType: 'random', randomCount: randomCount }
            : { colorType: _colorType },
        )
      : zeroColor;

    controls.start({
      color,
      transition: { duration: isHovered ? 0.1 : 2 },
    });
  }, [isHovered, controls, _colorType, randomCount, zeroColor]);

  if (span) {
    return (
      <motion.span
        className={`cursor-none pointer-events-auto ${className}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        animate={controls}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    );
  } else {
    return (
      <motion.div
        className={`cursor-none pointer-events-auto ${className}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        animate={controls}
        style={style}
      >
        {icon && <IconButton icon={icon} tooltipDirection="right" />}
      </motion.div>
    );
  }
};
