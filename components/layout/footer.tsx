import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-base-card/90">
      <div className="mx-auto w-full max-w-md px-4 py-4 pb-nav-safe">
        <div className="flex items-center justify-between text-xs text-base-muted">
          <span>© {new Date().getFullYear()} uriq.in</span>
          <span>India + International Users</span>
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs">
          <Link href="/privacy-policy" className="text-base-text underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-base-text underline-offset-2 hover:underline"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
