import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { AppI18nProvider } from '@/i18n/i18Provider';
import { AppReduxProvider } from '@/store/provider';
import CustomCursor from '@/components/CustomCursor';
import { ArrowToTop } from '@/components/Buttons/ArrowToTop';
import AllRoutes from '@/components/RooteTitles/AllRoutes';
import CookieConsent from '@/components/Cookies/CookiesConsent';
import Cookies from '@/components/Cookies/Cookies';
import { generatePageMetadata } from '../../lib/metadata';
import PortfolioDataStore from '@/components/PortfolioDataStore';
import { Locales, supportedLocales } from '@/i18n/settings';
import { dir } from 'i18next';

const inter = Inter({ subsets: ['latin'] });
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
  return (
    <html lang={lang} dir={dir(lang)}>
      <body className="lg:overflow-x-hidden">
        <AppI18nProvider lang={lang}>
          <AppReduxProvider>
            <CustomCursor />
            <CookieConsent />
            <PortfolioDataStore />
            <Navbar />
            <AllRoutes />
            <Cookies />
            {children}
            <Footer />
            <ArrowToTop />
          </AppReduxProvider>
        </AppI18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
