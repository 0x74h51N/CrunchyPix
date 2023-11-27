"use client";
import CarouselSlider from "../Slider/Portfolio Slider/CarouselSlider";
import SlideModal from "../Slider/Portfolio Slider/Child/SlideModal";
import { projectSlides } from "@/constants/projectSlides";
import { motion } from "framer-motion";
import { generateSpans } from "../GenerateSpans";
import { slideIn, textVariant } from "@/utils/motion";
import { slide } from "@/app/common.types";
import { codeString } from "@/constants/codeString";
import ContactSlide from "../Slider/FullScreenSlider/Childeren/ContactSlide";
import TypingText from "../typeText";

const PortfolioSect = () => {
  const sampleSlides: slide[] = [
    {
      imageUrl: "/slider-0.jpg",
      title: "slides.0.title",
      description: "slides.0.description",
    },
    {
      imageUrl: "/slide-1_.jpg",
      title: "slides.1.title",
      description: "slides.1.description",
    },
    {
      title: "slides.2.title",
      description: "slides.2.description",
      children: <ContactSlide active={false} />,
    },
    {
      children: <TypingText text={codeString} />,
    },
  ];

  return (
    <div className="h-auto min-h-[100svh] flex flex-col items-center justify-center w-full">
      <motion.div
        variants={textVariant(0)}
        className="flex flex-col text-center"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.h1
          variants={slideIn("up", "spring", 0.5, 1.6)}
          initial="hidden"
          whileInView="show"
          className="text-stone-200 font-black md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[60px] z-auto"
        >
          {generateSpans({
            text: "Portfolio",
            colorType: "vibrantColors",
          })}
        </motion.h1>
      </motion.div>
      <div className="w-full h-auto min-w-[100sv] z-0">
        <CarouselSlider slides={projectSlides} />
      </div>
      <div className="z-50">
        <SlideModal />
      </div>
      {/* <div className="flex flex-col items-start justify-start overflow-auto w-full h-full">
        <PhoneFrame>
          <FullScreenSlider
            slides={sampleSlides}
            className="w-full h-full object-cover rounded-[42px]"
          />
        </PhoneFrame>
      </div> */}
    </div>
  );
};

export default PortfolioSect;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
