import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { AppI18nProvider } from '@/i18n/i18Provider';
import { AppReduxProvider } from '@/store/provider';
import { Suspense } from 'react';
import LoadingComponent from '@/components/Loading';
import CustomCursor from '@/components/CustomCursor';
import { ArrowToTop } from '@/components/Buttons/ArrowToTop';
import AllRoutes from '@/components/RooteTitles/AllRoutes';
import CookieConsent from '@/components/Cookies/CookiesConsent';
import Cookies from '@/components/Cookies/Cookies';
import PageTracker from '@/components/PageTracker';
import { getLocale } from '@/i18n/server';
import { generatePageMetadata } from '../lib/metadata';

const inter = Inter({ subsets: ['latin'] });
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('home');
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={getLocale()}>
      <body className="lg:overflow-x-hidden">
        <Suspense
          fallback={
            <div className="absolute top-0 left-0 w-full min-h-full overflow-hidden z-50 bg-black">
              <LoadingComponent />
            </div>
          }
        >
          <AppI18nProvider>
            <AppReduxProvider>
              <PageTracker />
              <CustomCursor />
              <CookieConsent />
              <Navbar />
              <AllRoutes />
              <Cookies />
              <main>{children}</main>
              <Footer />
              <ArrowToTop />
            </AppReduxProvider>
          </AppI18nProvider>
        </Suspense>
      </body>
    </html>
  );
}
