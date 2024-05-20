"use client";
import Section from "@/components/Section";
import { sectionsData } from "@/constants/sections";

const Home = () => {
  return (
    <>
      <div>
        <Section sectionsData={sectionsData}></Section>
      </div>
    </>
  );
};

export default Home;
