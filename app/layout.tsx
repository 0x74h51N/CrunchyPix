import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppI18nProvider } from "@/utils/i18Provider";
import { AppReduxProvider } from "@/store/provider";
import PageTracker from "@/components/PageTracker";
import { Suspense } from "react";

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
    <html lang="en">
      <body>
        <AppReduxProvider>
          <AppI18nProvider>
            <Suspense fallback={null}>
              <PageTracker />
            </Suspense>
            <Navbar />
            <main>{children}</main>
            <section>
              <Footer />
            </section>
          </AppI18nProvider>
        </AppReduxProvider>
      </body>
    </html>
  );
}
