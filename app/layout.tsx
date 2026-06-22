import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { AppChrome } from "@/components/layout/app-chrome";
import { TestSiteMarquee } from "@/components/layout/test-site-marquee";
import { LanguageProvider } from "@/components/providers/language-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "uriq.in — Your IQ",
  description:
    "Your IQ. Measured. Mastered. Played. Gamified IQ testing and exam prep for Indian aspirants aged 13–60.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <LanguageProvider>
          <TestSiteMarquee />
          <AppChrome>{children}</AppChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
