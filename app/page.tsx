"use client";
import { Analytics } from "@vercel/analytics/react";
import { getCookie } from "cookies-next";
import Section from "@/components/Section";
import { sectionsData } from "@/constants/sections";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
