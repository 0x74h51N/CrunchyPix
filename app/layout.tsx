import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { AppI18nProvider } from '@/i18n/i18Provider';
import { AppReduxProvider } from '@/store/provider';
import { Suspense } from 'react';
import CustomCursor from '@/components/CustomCursor';
import { ArrowToTop } from '@/components/Buttons/ArrowToTop';
import AllRoutes from '@/components/RooteTitles/AllRoutes';
import CookieConsent from '@/components/Cookies/CookiesConsent';
import Cookies from '@/components/Cookies/Cookies';
import { getLocale } from '@/i18n/server';
import { generatePageMetadata } from '../lib/metadata';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import PortfolioDataStore from '@/components/PortfolioDataStore';
import { fetchSupabaseData } from '@/lib/fetchSupabaseData';
import LoadingComponent from '@/components/Loading';

const inter = Inter({ subsets: ['latin'] });
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('home');
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const portfolioItems = await fetchSupabaseData<PortfolioItemProps>(
    'portfolio_items',
    '*',
    PortfolioItemSchema,
  );
  return (
    <html lang={getLocale()}>
      <body className="lg:overflow-x-hidden">
        <AppI18nProvider>
          <AppReduxProvider>
            <Suspense
              fallback={
                <div className="absolute top-0 left-0 w-[100dvw] h-[100dvh] overflow-hidden z-50 bg-black">
                  <LoadingComponent />
                </div>
              }
            >
              <CustomCursor />
              <CookieConsent />
              <PortfolioDataStore portfolioItems={portfolioItems} />
              <Navbar />
              <AllRoutes />
              <Cookies />
              <main>{children}</main>
              <Footer />
              <ArrowToTop />
            </Suspense>
          </AppReduxProvider>
        </AppI18nProvider>
      </body>
    </html>
  );
};

export default Layout;
