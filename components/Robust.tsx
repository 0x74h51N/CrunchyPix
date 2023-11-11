import { motion } from "framer-motion";
import { robustSections } from "@/constants";
import { RobustSection } from "@/app/common.types";

const RobustSection = ({ title, description, icon }: RobustSection) => {
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
      className="flex flex-col items-center justify-center rounded-xl bg-gray-800 p-6 relative overflow-hidden border-2 border-neutral-400"
      style={{ minWidth: "300px", width: "300px", height: "350px" }}
    >
      <div className="absolute inset-0 bg-cover bg-blur" />
      {icon}
      <h2 className="text-2xl font-bold mt-4 text-gray-300">{title}</h2>
      <p className="text-center mt-2 text-gray-300">{description}</p>
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
          transition={{ duration: 1, delay: index * 0.5 }}
        >
          <RobustSection {...section} />
        </motion.div>
      ))}
    </div>
  );
};

export default Robust;
