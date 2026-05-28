import Link from "next/link";
import MobileShell from "@/components/layout/mobile-shell";
import { QuickTestFlow } from "@/components/quiz/quick-test-flow";

export default function QuickTestPage() {
  return (
    <MobileShell withNavPadding={false}>
      <section className="space-y-4">
        <header className="space-y-1">
          <Link href="/" className="text-xs text-base-muted hover:underline">
            uriq.in
          </Link>
          <h1 className="text-2xl font-semibold text-base-text">Quick IQ Test</h1>
          <p className="text-sm text-base-muted">
            5 questions · No login · Swipe or tap to move
          </p>
        </header>
        <QuickTestFlow />
      </section>
    </MobileShell>
  );
}
