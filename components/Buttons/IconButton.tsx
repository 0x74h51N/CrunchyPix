import { Icon } from "@/app/common.types";
import { IconType } from "react-icons";
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
} from "react-icons/fa";
import { MdAccessibility, MdTouchApp } from "react-icons/md";
import { DiResponsive } from "react-icons/di";

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
  paintbrush: FaPaintBrush,
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
};

const IconButton = ({ icon }: { icon: Icon }) => {
  const iconType = icon.type.toLowerCase();

  const IconComponent = iconComponents[iconType];

  if (!IconComponent) {
    console.error(`Invalid icon type: ${icon.type}`);
    return null;
  }

  return (
    <div className="relative group">
      <a
        href={icon.link && icon.link}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <IconComponent size={icon.size} color={icon.color} />
        {icon.alt && (
          <span className="absolute self-center left-10 top-10 rounded-md border-spacing-1 border-cool-gray-700 border-2  w-auto p-1 text-center text-white text-xs bg-cool-gray-400 opacity-0 transition-opacity group-hover:opacity-80 duration-300 pointer-events-none">
            {icon.alt}
          </span>
        )}
      </a>
    </div>
  );
};

export default IconButton;
