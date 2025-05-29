import FsLoading from '@/components/Loading/FsLoading';
import dynamic from 'next/dynamic';

import { generatePageMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { Locales } from '@/i18n/settings';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('portfolio');
}

const PortfolioItemsTable = dynamic(
  () => import('./components/PortfolioItemsTable'),
  { ssr: true, loading: () => <FsLoading /> },
);
const Portfolio = async ({
  params,
}: {
  params: Promise<{ lang: Locales }> | undefined;
}) => {
  const resolvedParams = params ? await params : { lang: 'en' as Locales };
  const { lang } = resolvedParams;
  return (
    <div className="flex justify-center items-start w-full min-h-[100svh] !select-none !cursor-none">
      <PortfolioItemsTable lang={lang} />
    </div>
  );
};

export default Portfolio;
