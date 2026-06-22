import MobileShell from "@/components/layout/mobile-shell";

export default function PremiumQuizPage() {
  return (
    <MobileShell>
      <section className="space-y-3 rounded-xl2 border border-base-border bg-base-card p-4 shadow-soft">
        <h1 className="text-2xl font-semibold text-base-text">Mastermind Arena</h1>
        <p className="text-sm leading-6 text-base-muted">
          Premium rounds with social benchmarking and detailed analytics.
        </p>
      </section>
    </MobileShell>
  );
}
