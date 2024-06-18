import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { AppI18nProvider } from '@/i18n/i18Provider';
import { AppReduxProvider } from '@/store/provider';
import CustomCursor from '@/components/CustomCursor';
import { ArrowToTop } from '@/components/Buttons/ArrowToTop';
import AllRoutes from '@/components/RooteTitles/AllRoutes';
import CookieConsent from '@/components/Cookies/CookiesConsent';
import Cookies from '@/components/Cookies/Cookies';
import { getLocale } from '@/i18n/server';
import { generatePageMetadata } from '../lib/metadata';
import { PortfolioItemProps, PortfolioItemSchema } from '@/schemas';
import PortfolioDataStore from '@/components/PortfolioDataStore';
import { fetchSupabaseData } from '@/lib/utils/fetchSupabaseData';

const inter = Inter({ subsets: ['latin'] });
export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata('home');
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang={getLocale()}>
      <body className="lg:overflow-x-hidden">
        <AppI18nProvider>
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
