import { motion } from "framer-motion";
import { robustSections } from "@/constants";
import { RobustSection } from "@/app/common.types";
import { useTranslation } from "react-i18next";
import { Tilt } from "react-tilt";
import { ColorfulBorder } from "./ColorfulBorder";

const RobustSection = ({ title, description, icon }: RobustSection) => {
  const { t } = useTranslation(["translation"]);
  return (
    <>
      <div className=" shadow-card">
        <Tilt>
          <ColorfulBorder>
            <motion.div className=" flex justify-evenly items-center w-[250px] h-[300px] flex-col rounded-xl bg-transparent p-4 relative overflow-hidden cursor-pointer">
              <div className="absolute inset-0" />
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
                <h2 className="font-medium lg:text-[22px] sm:text-[20px] xs:text-[18px] text-[16px]  mt-4 text-stone-200">
                  {t(title)}
                </h2>
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
                <p className="text-center text-[14px] mt-2 text-stone-200 whitespace-normal">
                  {t(description)}
                </p>
              </motion.div>
            </motion.div>
          </ColorfulBorder>{" "}
        </Tilt>
      </div>
    </>
  );
};

const Robust = () => {
  return (
    <div className=" flex flex-wrap justify-center gap-10 w-full p-8 ">
      {robustSections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: index * 0.3 }}
        >
          <RobustSection {...section} />
        </motion.div>
      ))}
    </div>
  );
};

export default Robust;
