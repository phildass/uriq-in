import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { AppChrome } from "@/components/layout/app-chrome";
import { TestSiteMarquee } from "@/components/layout/test-site-marquee";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "uriq.in",
  description: "Gamified IQ & aptitude prep platform",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <TestSiteMarquee />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
