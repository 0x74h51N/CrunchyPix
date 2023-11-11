import { motion } from "framer-motion";
import { robustSections } from "@/constants";
import { RobustSection } from "@/app/common.types";
import { useTranslation } from "react-i18next";

const RobustSection = ({ title, description, icon }: RobustSection) => {
  const { t } = useTranslation(["translation"]);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, translateY: -20 }}
      whileInView={{ scale: 1, opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
      }}
      whileTap={{ scale: 0.8 }}
      className="flex flex-col items-center justify-center rounded-xl bg-gray-800 p-6 relative overflow-hidden border-2 border-neutral-400 cursor-pointer"
      style={{ minWidth: "300px", width: "300px", height: "350px" }}
    >
      <div className="absolute inset-0 bg-cover bg-blur" />
      {icon}
      <motion.div
        initial={{
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        }}
        animate={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        transition={{ delay: 1, duration: 0.5 }}
        className="overflow-hidden h-auto"
      >
        <h2 className="text-2xl font-bold mt-4 text-gray-300">{t(title)}</h2>
      </motion.div>
      <motion.div
        initial={{
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        }}
        animate={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="overflow-hidden h-auto"
      >
        <p className="text-center mt-2 text-gray-300 whitespace-break-spaces">
          {t(description)}
        </p>
      </motion.div>
    </motion.div>
  );
};

const Robust = () => {
  return (
    <div className="flex flex-row max-lg:flex-col items-center gap-10 justify-around w-full p-8 ">
      {robustSections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.3 }}
        >
          <RobustSection {...section} />
        </motion.div>
      ))}
    </div>
  );
};

export default Robust;
