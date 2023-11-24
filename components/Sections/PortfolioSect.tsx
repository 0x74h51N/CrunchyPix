"use client";
import { useSelector } from "react-redux";
import PhoneFrame from "../PhoneFrame";
import CarouselSlider from "../Slider/CarouselSlider";
import FullScreenSlider from "../Slider/FullScreenSlider";
import SlideModal from "../Slider/SlideModal";
import { projectSlides } from "@/constants";
import { motion } from "framer-motion";
import { generateSpans } from "../GenerateSpans";
import { slideIn, textVariant } from "@/utils/motion";

const PortfolioSect = () => {
  return (
    <div className="h-auto min-h-screen flex flex-col items-center justify-center w-full">
      <motion.div
        variants={textVariant(0)}
        className="flex flex-col text-center"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h1
          variants={slideIn("up", "spring", 0.5, 1.6)}
          initial="hidden"
          whileInView="show"
          className="text-stone-200 font-black md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[60px] z-0"
        >
          {generateSpans({
            text: "Portfolio",
            colorType: "vibrantColors",
          })}
        </motion.h1>
      </motion.div>
      <div className="w-full h-auto min-w-[100sv] z-10">
        <CarouselSlider slides={projectSlides} />
      </div>
      <div className="z-50">
        <SlideModal />
      </div>
      {/* <div className="flex flex-col items-start justify-start overflow-auto w-full h-full"><PhoneFrame>
        <FullScreenSlider className="w-full h-full object-cover rounded-[42px]" />
      </PhoneFrame></div> */}
    </div>
  );
};

export default PortfolioSect;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
