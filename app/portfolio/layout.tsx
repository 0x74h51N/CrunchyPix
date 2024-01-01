import Rooting from "@/components/Rooting";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="mt-8">
        <Rooting />
      </nav>
      <main>{children}</main>
    </>
  );
}
