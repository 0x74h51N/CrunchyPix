import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Cookies from '@/components/Cookies/Cookies';
import { generatePageMetadata } from '../../lib/metadata';
import { Locales, supportedLocales } from '@/i18n/settings';
import { generateStaticParams as generatePortfolioStaticParams } from './portfolio/[id]/page';
import { generateStaticParams as generatePoliciesStaticParams } from './policies/[id]/page';
import { getTheme } from '../actions/setThemeAction';
import { Providers } from '@/components/Providers';

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

const RootLayout = async ({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locales };
}) => {
  const policiesStaticParams = await generatePoliciesStaticParams();
  const portfolioStaticParams = await generatePortfolioStaticParams();
  const staticParams = [...portfolioStaticParams, ...policiesStaticParams];
  const theme = (await getTheme()) || 'dark';
  return (
    <html lang={lang} data-theme={theme}>
      <body className={inter.className}>
        <Cookies />
        <Providers staticParams={staticParams} lang={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
