import MobileShell from "@/components/layout/mobile-shell";

export default function BaselineQuizPage() {
  return (
    <MobileShell>
      <section className="space-y-3 rounded-xl2 border border-base-border bg-base-card p-4 shadow-soft">
        <h1 className="text-2xl font-semibold text-base-text">Daily Spark Baseline</h1>
        <p className="text-sm leading-6 text-base-muted">
          10 rapid questions across logic, patterns, and verbal ability.
        </p>
      </section>
    </MobileShell>
  );
}
