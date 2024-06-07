import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

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
