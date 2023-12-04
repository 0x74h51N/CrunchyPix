import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { AppI18nProvider } from "@/utils/i18Provider";
import { AppReduxProvider } from "@/store/provider";
import PageTracker from "@/components/PageTracker";
import { Suspense } from "react";
import LoadingComponent from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrunchyPix",
  description: "Unleash the Power of Web Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Suspense fallback={<LoadingComponent />}>
          <AppReduxProvider>
            <AppI18nProvider>
              <PageTracker />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </AppI18nProvider>
          </AppReduxProvider>
        </Suspense>
      </body>
    </html>
  );
}
