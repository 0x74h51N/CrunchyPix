import { motion } from "framer-motion";
import { RobustSection } from "@/app/common.types";
import { useTranslation } from "react-i18next";
import { ColorfulBorder } from "./ColorfulBorder";
import IconButton from "./IconButton";
import { fadeIn } from "@/utils/motion";

const RobustSection = ({
  robustSections,
}: {
  robustSections: RobustSection[];
}) => {
  const { t } = useTranslation(["translation"]);

  return (
    <div className="flex flex-wrap justify-center gap-10 w-auto">
      {robustSections.map((section, index) => (
        <motion.div
          key={section.title}
          variants={fadeIn("down", "spring", index * 0.5, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="m-0"
        >
          <ColorfulBorder>
            <motion.div className="flex justify-evenly items-center w-[260px] h-[350px] flex-col bg-transparent p-4 relative overflow-hidden cursor-pointer">
              <div className="absolute inset-0" />
              <div className="flex justify-center items-center">
                {section.icon && <IconButton icon={section.icon} />}
              </div>
              <motion.div
                variants={fadeIn("down", "spring", index * 0.65, 0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="overflow-hidden h-[auto]"
              >
                <motion.h2 className="font-medium lg:text-[20px] sm:text-[18px] xs:text-[16px] text-[14px] mt-4 text-cool-gray-100 text-center">
                  {t(section.title)}
                </motion.h2>
              </motion.div>
              <motion.div
                variants={fadeIn("up", "spring", index * 0.4, 0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className="overflow-hidden h-[130px] flex items-center"
              >
                <p className="text-center text-[14px] mt-2 text-cool-gray-200 whitespace-normal">
                  {t(section.description)}
                </p>
              </motion.div>
            </motion.div>
          </ColorfulBorder>
        </motion.div>
      ))}
    </div>
  );
};

export default RobustSection;
