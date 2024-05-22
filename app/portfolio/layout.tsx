import { portfolioPageItems } from "@/constants/portfolioItems";
import { generatePageMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('portfolio');
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export async function generateStaticParams() {
  const paths = portfolioPageItems.map((item) => ({
    params: { id: item._id.toLowerCase().replace(/\s+/g, "") },
  }));

  return paths;
}
