"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, Zap } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/quiz/quick", label: "Test", icon: Zap },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-surface-border bg-base-card/95 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-md w-full items-stretch justify-around px-4 pb-[env(safe-area-inset-bottom)] pt-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "tap-target flex flex-1 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition",
                active ? "text-base-text" : "text-base-muted"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  active && href === "/quiz/quick" && "text-module-logic",
                  active && href === "/learn" && "text-module-verbal",
                  active && href === "/dashboard" && "text-module-math"
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
