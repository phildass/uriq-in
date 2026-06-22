import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOGO_URL } from "@/lib/config/brand";
import { LanguagePicker } from "@/components/language/language-picker";

export function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto min-h-screen max-w-md border-x border-zinc-100 bg-zinc-50 shadow-sm">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-200/80 bg-white/90 px-4 py-3 backdrop-blur">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={LOGO_URL}
              alt="uriq.in logo"
              width={28}
              height={28}
              className="rounded-md"
              unoptimized={LOGO_URL.startsWith("http")}
            />
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-slate-900">uriq.in</span>
              <span className="block text-[10px] font-medium tracking-wide text-indigo-600">
                Your IQ
              </span>
            </div>
          </Link>
          <LanguagePicker />
        </header>
        <main className="px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
