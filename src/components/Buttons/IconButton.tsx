'use client';
import { IconType } from 'react-icons';
import {
  FaDesktop,
  FaMobileAlt,
  FaCode,
  FaPaintBrush,
  FaGithub,
  FaGlobe,
  FaTelegram,
  FaInstagram,
  FaEnvelope,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaLinkedinIn,
  FaCoffee,
  FaBook,
  FaHeart,
  FaSearch,
  FaPuzzlePiece,
  FaLightbulb,
  FaRocket,
  FaBroom,
  FaSync,
  FaBolt,
  FaFile,
  FaChartBar,
  FaCodepen,
  FaFreeCodeCamp,
} from 'react-icons/fa';
import { MdAccessibility, MdTouchApp } from 'react-icons/md';
import { DiResponsive } from 'react-icons/di';
import { TfiLayoutAccordionList } from 'react-icons/tfi';
import { SiBluesky } from 'react-icons/si';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { IconProps } from '@/lib/schemas';
import { FaXTwitter } from 'react-icons/fa6';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

const iconComponents: { [key: string]: IconType } = {
  github: FaGithub,
  web: FaGlobe,
  telegram: FaTelegram,
  instagram: FaInstagram,
  mail: FaEnvelope,
  twitter: FaXTwitter,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedinIn: FaLinkedinIn,
  coffee: FaCoffee,
  book: FaBook,
  heart: FaHeart,
  desktop: FaDesktop,
  mobile: FaMobileAlt,
  code: FaCode,
  brush: FaPaintBrush,
  search: FaSearch,
  puzzle: FaPuzzlePiece,
  light: FaLightbulb,
  rocket: FaRocket,
  broom: FaBroom,
  sync: FaSync,
  bold: FaBolt,
  file: FaFile,
  touch: MdTouchApp,
  access: MdAccessibility,
  responsive: DiResponsive,
  layout: TfiLayoutAccordionList,
  chart: FaChartBar,
  bsky: SiBluesky,
  codepen: FaCodepen,
  freecodecamp: FaFreeCodeCamp,
};

const IconButton = ({
  icon,
  size,
  tooltipDirection = 'top',
}: {
  icon: IconProps;
  size?: number;
  tooltipDirection?: string;
}) => {
  const iconType = icon.type && icon.type.toLowerCase();
  const IconComponent = icon.type && iconType && iconComponents[iconType];
  const { handleMouseEnter, handleMouseLeave } = useClickableHandlers();
  const isBlog = useSelector((state: RootState) => state.pathSlice.isBlogPage);

  if (iconType && IconComponent) {
    return (
      <div
        data-tip={icon.alt}
        className={`tooltip tooltip-${tooltipDirection} tooltip-crunchy !cursor-none`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={icon.link && icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className={isBlog ? 'cursor-pointer' : '!cursor-none'}
        >
          <IconComponent
            size={icon.size ? icon.size : size}
            color={icon.color}
          />
        </a>
      </div>
    );
  }

  console.error(`Invalid icon type: ${icon.type}`);
  return null;
};

export default IconButton;
