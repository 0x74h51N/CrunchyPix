import Rooting from "@/components/rooting";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="mt-24">
        <Rooting />
      </nav>
      <main>{children}</main>
    </>
  );
}
