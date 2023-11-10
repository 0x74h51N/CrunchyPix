import { motion } from "framer-motion";
import { FaDesktop, FaMobile, FaCode, FaPaintBrush } from "react-icons/fa";
import { robustSections } from "@/constants";
import { RobustSection } from "@/app/common.types";
import { ColorfulBorder } from "./ColorfulBorder";

const RobustSection = ({ title, description, icon }: RobustSection) => {
  const getIconComponent = () => {
    switch (icon) {
      case "FaDesktop":
        return <FaDesktop size={50} color={"#4caf50"} />;
      case "FaMobile":
        return <FaMobile size={50} color={"#2196f3"} />;
      case "FaCode":
        return <FaCode size={50} color={"#ff5722"} />;
      case "FaPaintBrush":
        return <FaPaintBrush size={50} color={"#e91e63"} />;
      default:
        return null;
    }
  };

  return (
    <ColorfulBorder>
      <motion.div
        initial={{ scale: 0, opacity: 0, translateY: -20 }}
        whileInView={{ scale: 1, opacity: 1, translateY: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
        }}
        whileTap={{ scale: 0.8 }}
        className="flex flex-col items-center justify-center rounded-xl bg-gray-800 p-6 relative overflow-hidden"
        style={{ minWidth: "300px", width: "300px", height: "300px" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-blur"
          style={{ backgroundImage: `url('/background-image.jpg')` }}
        />
        {getIconComponent()}
        <h2 className="text-2xl font-bold mt-4 text-white">{title}</h2>
        <p className="text-center mt-2 text-gray-300">{description}</p>
      </motion.div>
    </ColorfulBorder>
  );
};

const Robust = () => {
  return (
    <div className="flex flex-row max-lg:flex-col items-center gap-10 justify-around w-full p-8">
      {robustSections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.5 }}
        >
          <RobustSection {...section} />
        </motion.div>
      ))}
    </div>
  );
};

export default Robust;
