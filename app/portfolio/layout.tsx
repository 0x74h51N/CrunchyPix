import { portfolioPageItems } from "@/constants/portfolioItems";
import OtherProjects from "./components/OtherProjects";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <OtherProjects />
    </>
  );
}

export async function generateStaticParams() {
  const paths = portfolioPageItems.map((item) => ({
    params: { id: item._id.toLowerCase().replace(/\s+/g, "") },
  }));

  return paths;
}
