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
} from "react-icons/fa";

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
};

const IconButton = ({ icon }: { icon: Icon }) => {
  const iconType = icon.type.toLowerCase();

  const IconComponent = iconComponents[iconType];

  if (!IconComponent) {
    console.error(`Invalid icon type: ${icon.type}`);
    return null;
  }

  return (
    <a
      href={icon.link && icon.link}
      target="_blank"
      rel="noopener noreferrer"
      className=""
    >
      <IconComponent size={icon.size} color={icon.color} />
    </a>
  );
};

export default IconButton;
