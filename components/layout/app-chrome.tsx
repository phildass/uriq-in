"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Footer } from "@/components/layout/footer";

const HIDE_CHROME_PREFIXES = ["/quiz/quick"];

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDE_CHROME_PREFIXES.some((p) => pathname?.startsWith(p));

  return (
    <>
      {!hideChrome ? <Navbar /> : null}
      <div
        className={
          hideChrome ?
            "min-h-screen pt-[var(--site-banner-h)]"
          : "min-h-screen pt-[var(--site-chrome-top)]"
        }
      >
        <div className="mx-auto max-w-md w-full">{children}</div>
      </div>
      {!hideChrome ? <Footer /> : null}
      {!hideChrome ? <BottomNav /> : null}
    </>
  );
}
