"use client";
import { PortfolioItemProps } from "../common.types";
import { portfolioPageItems } from "@/constants/portfolioPageItems";
import PortfolioItem from "../../components/PortfolioItem";

const Portfolio = () => {
  return (
    <section>
      <div className=" h-auto w-auto flex flex-col justify-center items-center min-w-screen">
        <div className="flex flex-wrap justify-center items-center max-w-[1500px] gap-8">
          {portfolioPageItems.map((item: PortfolioItemProps, index: number) => (
            <PortfolioItem
              _id={item._id}
              key={index}
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.title}
              projectType={item.projectType}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
