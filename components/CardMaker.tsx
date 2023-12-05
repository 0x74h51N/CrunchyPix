import { motion } from "framer-motion";
import { CardSections } from "@/app/common.types";
import { useTranslation } from "react-i18next";
import { ColorfulBorder } from "./ColorfulBorder";
import IconButton from "./Buttons/IconButton";
import { fadeIn, polygonIn, slideIn, staggerContainer } from "@/utils/motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Tilt from "react-parallax-tilt";

const CardMaker = ({ cardSections }: { cardSections: CardSections[] }) => {
  const { t } = useTranslation(["translation"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  return (
    <div className="flex flex-wrap justify-center gap-10 w-auto">
      {cardSections.map((section, index) => (
        <motion.div
          key={section.title}
          variants={slideIn(
            "down",
            "spring",
            isMobile ? 0.5 : index * 0.4 + 0.3,
            0.6
          )}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "all" }}
          className="m-0"
        >
          <Tilt
            tiltEnable={isMobile || isTablet ? false : true}
            tiltReverse
            gyroscope={true}
            glareEnable={isMobile || isTablet ? false : true}
            glarePosition={"all"}
            glareMaxOpacity={0.5}
          >
            <ColorfulBorder>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.9 }}
                className="flex justify-evenly items-center w-[260px] h-[340px] flex-col bg-transparent p-4 relative overflow-hidden cursor-pointer"
              >
                <motion.div
                  variants={polygonIn(
                    "down",
                    "spring",
                    isMobile ? 0.6 : index * 0.5 + 0.7,
                    0.6
                  )}
                  className="flex justify-center items-center"
                >
                  {section.icon && <IconButton icon={section.icon} />}
                </motion.div>
                <motion.h2
                  variants={fadeIn(
                    "down",
                    "spring",
                    isMobile ? 0.6 : index * 0.5 + 0.7,
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
                    isMobile ? 0.6 : index * 0.5 + 0.7,
                    0.6
                  )}
                  className="overflow-hidden h-[130px] flex items-center text-center xs:text-[14px] text-[12px] mt-2 text-cool-gray-200 whitespace-normal"
                >
                  {t(section.description)}
                </motion.p>
              </motion.div>
            </ColorfulBorder>
          </Tilt>
        </motion.div>
      ))}
    </div>
  );
};

export default CardMaker;
