import { Locales } from '@/i18n/settings';
import { generatePortfolioMetadata } from '@/lib/portfolioMetaData';
import { PortfolioItemProps, PortfolioItemSchema } from '@/lib/schemas';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';
import { notFound } from 'next/navigation';
import Project from './components/Project';

type Params = Promise<{ id: string; lang: Locales }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { id, lang } = await params;
  if (typeof id !== 'string') {
    notFound();
  }

  const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
    'portfolio_schema',
    'portfolio_items',
    '*, project_page(*)',
    PortfolioItemSchema,
    [{ column: '_id', value: id }],
  ).catch(() => notFound());

  const projectData = portfolioItems?.[0].project_page?.find(
    (p) => p.lang === lang,
  );

  if (!projectData) {
    notFound();
  }

  return await generatePortfolioMetadata({
    id,
    page: 'portfolio',
    lang,
    projectData: projectData,
  });
}

export default async function Page(props: { params: Params }) {
  try {
    const params = await props.params;
    const id = params.id;
    if (!params || typeof id !== 'string') {
      notFound();
    }

    const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
      'portfolio_schema',
      'portfolio_items',
      '*',
      PortfolioItemSchema,
      undefined,
    );

    const portfolioItem = portfolioItems!.find((item) => item._id === id);
    if (!portfolioItem) {
      notFound();
    }

    return <Project id={id} />;
  } catch (error) {
    console.error('Error portfolio item on page:', error);
    notFound();
  }
}

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
      'portfolio_schema',
      'portfolio_items',
      '*',
      PortfolioItemSchema,
    );
    return portfolioItems!.map((item) => ({ id: item._id }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}
