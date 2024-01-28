"use client";
import { PortfolioItemProps } from "../common.types";
import { portfolioPageItems } from "@/constants/portfolioItems";
import PortfolioItem from "./components/PortfolioItem";
import { polygonIn } from "@/utils/motion";
import { motion } from "framer-motion";

const Portfolio = () => {
  return (
    <section>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        variants={polygonIn("screen", "easeInOut", 0.5, 1.5)}
        className=" h-auto w-auto flex flex-col justify-center items-center min-w-screen mt-8 mb-40"
      >
        <div className="flex flex-wrap justify-center items-center max-w-[1500px] md:gap-12 gap-6 py-10">
          {portfolioPageItems.map((item: PortfolioItemProps, index: number) => (
            <PortfolioItem
              _id={item._id}
              key={index}
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.title}
              projectType={item.projectType}
              slideImage={""}
              slideDescription={""}
              width={630}
              height={500}
              isSlide={false}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Portfolio;
