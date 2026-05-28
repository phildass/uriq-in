import Link from "next/link";
import { ArrowRight, Brain, ShieldCheck, Timer } from "lucide-react";
import MobileShell from "@/components/layout/mobile-shell";
import { MODULES } from "@/lib/modules/colors";

export default function LandingPage() {
  return (
    <MobileShell>
      <section className="space-y-8">
        <header className="space-y-4">
          <p className="text-sm tracking-wide text-base-muted">uriq.in</p>
          <h1 className="text-3xl font-bold leading-tight text-base-text">
            Precision IQ training for exams and careers
          </h1>
          <p className="text-sm leading-6 text-base-muted">
            Clean canvas, strategic colour — start as a guest, sign up only when you want to
            save progress.
          </p>
        </header>

        <div className="rounded-xl2 border border-surface-border bg-base-card p-4 shadow-soft">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-base-muted">
            No login required
          </p>
          <Link
            href="/quiz/quick"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-module-logic px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Quick IQ Test (5 questions)
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-xs text-base-muted">
            Or take the full{" "}
            <Link href="/quiz/baseline" className="font-medium text-base-text underline-offset-2 hover:underline">
              10-question baseline
            </Link>
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-base-muted">Exam modules</p>
          <div className="grid grid-cols-1 gap-2">
            {(["logic", "math", "verbal"] as const).map((key) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-xl border border-surface-border bg-surface px-3 py-2.5"
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${MODULES[key].accent}`} />
                <span className="text-sm font-medium text-base-text">{MODULES[key].label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: Brain, t: "Mensa-level logic modules" },
            { icon: Timer, t: "Millisecond response benchmarking" },
            { icon: ShieldCheck, t: "Exam-oriented aptitude mapping" },
          ].map(({ icon: Icon, t }) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-xl border border-surface-border bg-base-card p-3"
            >
              <Icon className="h-4 w-4 text-base-muted" />
              <span className="text-sm text-base-text">{t}</span>
            </div>
          ))}
        </div>
      </section>
    </MobileShell>
  );
}
