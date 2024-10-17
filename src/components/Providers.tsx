'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppReduxProvider } from '@/store/provider';
import { ReactNode } from 'react';
import { AppI18nProvider } from '@/i18n/i18Provider';
import { ArrowToTop } from './Buttons/ArrowToTop';
import CustomCursor from './CustomCursor';
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import PortfolioDataStore from './PortfolioDataStore';
import AllRoutes from './RooteTitles/AllRoutes';
import CookieConsent from '@/components/Cookies/CookiesConsent';
import { Locales } from '@/i18n/settings';

const queryClient = new QueryClient();

export const Providers = ({
  children,
  staticParams,
  lang,
}: {
  children: ReactNode;
  staticParams: {
    id: string;
  }[];
  lang: Locales;
}) => {
  return (
    <AppI18nProvider lang={lang}>
      <AppReduxProvider>
        <QueryClientProvider client={queryClient}>
          <CustomCursor />
          <CookieConsent />
          <PortfolioDataStore />
          <Navbar />
          <AllRoutes staticParams={staticParams} />
          {children}
          <Footer />
          <ArrowToTop />
        </QueryClientProvider>
      </AppReduxProvider>
    </AppI18nProvider>
  );
};
