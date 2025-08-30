import { Providers } from '@/components/Providers';
import { Locales, supportedLocales } from '@/i18n/settings';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generatePageMetadata } from '../../lib/metadata';
import { getTheme } from '../actions/setThemeAction';
import '../styles/globals.css';
import { generateStaticParams as generatePoliciesStaticParams } from './policies/[id]/page';
import { generateStaticParams as generatePortfolioStaticParams } from './portfolio/[id]/page';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('home');
}

export function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  const policiesStaticParams = await generatePoliciesStaticParams();
  const portfolioStaticParams = await generatePortfolioStaticParams();
  const staticParams = [...portfolioStaticParams, ...policiesStaticParams];
  const theme = (await getTheme()) || 'dark';

  return (
    <html lang={lang as Locales} data-theme={theme}>
      <body
        className={`repeatingLines max-w-[100vw] overflow-x-hidden ${inter.className}`}
      >
        <Providers staticParams={staticParams} lang={lang as Locales}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
