import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { AppI18nProvider } from "@/i18n/i18Provider";
import { AppReduxProvider } from "@/store/provider";
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";
import CustomCursor from "@/components/Cookies/CustomCursor";
import { ArrowToTop } from "@/components/Buttons/ArrowToTop";
import Rooting from "@/components/Rooting";
import CookieConsent from "@/components/Cookies/CookiesConsent";
import Cookies from "@/components/Cookies";
import PageTracker from "@/components/PageTracker";
import { createTranslation, getLocale } from "@/i18n/server";

const inter = Inter({ subsets: ["latin"] });
export async function generateMetadata(): Promise<Metadata> {
  const { t } = await createTranslation('home');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    authors: [{ name: "Tahsin Önemli", url: "https://github.com/0x74h51N" }],
  };
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={getLocale()}>
      <body className="lg:overflow-x-hidden">
        <Suspense fallback={<LoadingComponent />}>
          <AppReduxProvider>
            <AppI18nProvider>
              <PageTracker />
              <CustomCursor />
              <CookieConsent />
              <Navbar />
              <Rooting />
              <Cookies />
              <main>{children}</main>
              <Footer />
              <ArrowToTop />
            </AppI18nProvider>
          </AppReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
