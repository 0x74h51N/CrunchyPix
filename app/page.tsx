import Section from "@/components/Section";
import { sectionsData } from "@/constants";

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
