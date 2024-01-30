"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import WebProject from "./components/WebProject";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    return <p>Couldn't find a portfolio item.</p>;
  }

  return <WebProject Item={selectedItem} />;
};

export default PortfolioPage;
