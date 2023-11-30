"use client";
import CarouselSlider from "../Slider/Portfolio Slider/CarouselSlider";
import SlideModal from "../Slider/Portfolio Slider/Child/SlideModal";
import { projectSlides } from "@/constants/projectSlides";
import { motion } from "framer-motion";
import { generateSpans } from "../GenerateSpans";
import { slideIn } from "@/utils/motion";

const PortfolioSect = () => {
  return (
    <div className="h-auto flex flex-col items-center justify-center w-full">
      <div className="flex flex-col text-center">
        <motion.h1
          variants={slideIn("up", "spring", 0.5, 1.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "all" }}
          className="text-stone-200 font-black md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[60px] z-auto"
        >
          {generateSpans({
            text: "Portfolio",
            colorType: "vibrantColors",
            zeroColor: "#FFFFFF",
          })}
        </motion.h1>
      </div>
      <div className="w-full h-auto min-w-[100sv] z-0">
        <CarouselSlider slides={projectSlides} />
      </div>
      <div className="z-50">
        <SlideModal />
      </div>
    </div>
  );
};

export default PortfolioSect;
