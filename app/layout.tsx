import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppI18nProvider } from "@/utils/i18Provider";
import { AppReduxProvider } from "@/store/provider";

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
            <Navbar />
            <main>{children}</main>
            <Analytics />
            <Footer />
          </AppI18nProvider>
        </AppReduxProvider>
      </body>
    </html>
  );
}
