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
  FaTwitter,
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
import { SiFreelancer } from 'react-icons/si';
import useClickableHandlers from '@/hooks/useClickableHandlers';
import { IconProps } from '@/schemas';

const iconComponents: { [key: string]: IconType } = {
  github: FaGithub,
  web: FaGlobe,
  telegram: FaTelegram,
  instagram: FaInstagram,
  mail: FaEnvelope,
  twitter: FaTwitter,
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
  freelancer: SiFreelancer,
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

  if (iconType && IconComponent) {
    return (
      <div
        data-tip={icon.alt}
        className={`cursor-none tooltip tooltip-${tooltipDirection} tooltip-crunchy`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={icon.link && icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-none"
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
