import type { ReactNode } from "react";

type MobileShellProps = {
  children: ReactNode;
  /** Set false on full-screen flows (e.g. active quiz) */
  withNavPadding?: boolean;
};

export default function MobileShell({ children, withNavPadding = true }: MobileShellProps) {
  return (
    <main className="min-h-screen bg-base-bg">
      <div className={`container-mobile py-6 ${withNavPadding ? "pb-nav-safe" : "pb-6"}`}>
        {children}
      </div>
    </main>
  );
}
