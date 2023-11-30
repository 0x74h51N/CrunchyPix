import { motion } from "framer-motion";
import { RobustSection } from "@/app/common.types";
import { useTranslation } from "react-i18next";
import { ColorfulBorder } from "./ColorfulBorder";
import IconButton from "./IconButton";
import { fadeIn, staggerContainer, textVariant } from "@/utils/motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { text } from "stream/consumers";

const RobustSection = ({
  robustSections,
}: {
  robustSections: RobustSection[];
}) => {
  const { t } = useTranslation(["translation"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);

  return (
    <div className="flex flex-wrap justify-center gap-10 w-auto">
      {robustSections.map((section, index) => (
        <motion.div
          key={section.title}
          variants={fadeIn("down", "spring", isMobile ? 0.3 : index * 0.5, 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "all" }}
          className="m-0"
        >
          <ColorfulBorder>
            <motion.div
              variants={staggerContainer(2, 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: "all" }}
              className="flex justify-evenly items-center w-[260px] h-[350px] flex-col bg-transparent p-4 relative overflow-hidden cursor-pointer"
            >
              <motion.div
                variants={fadeIn(
                  "down",
                  "spring",
                  isMobile ? 0.6 : index * 0.6,
                  0.6
                )}
                className="flex justify-center items-center"
              >
                {section.icon && <IconButton icon={section.icon} />}
              </motion.div>
              <motion.div variants={textVariant(0.5)}>
                <motion.h2
                  variants={fadeIn(
                    "down",
                    "spring",
                    isMobile ? 0.6 : index * 0.6,
                    0.6
                  )}
                  className="overflow-hidden h-[auto] font-medium lg:text-[20px] sm:text-[18px] text-[16px]  mt-4 text-cool-gray-100 text-center"
                >
                  {t(section.title)}
                </motion.h2>
                <motion.p
                  variants={fadeIn(
                    "up",
                    "spring",
                    isMobile ? 0.6 : index * 0.6,
                    0.6
                  )}
                  className="overflow-hidden h-[130px] flex items-center text-center xs:text-[14px] text-[12px] mt-2 text-cool-gray-200 whitespace-normal"
                >
                  {t(section.description)}
                </motion.p>
              </motion.div>
            </motion.div>
          </ColorfulBorder>
        </motion.div>
      ))}
    </div>
  );
};

export default RobustSection;
