import MobileShell from "@/components/layout/mobile-shell";
import { TOTAL_PRICE } from "@/lib/utils/pricing";

export default function PaywallPage() {
  return (
    <MobileShell>
      <section className="space-y-4 rounded-xl2 border border-base-border bg-base-card p-4 shadow-soft">
        <h1 className="text-2xl font-semibold text-base-text">Unlock Premium</h1>
        <p className="text-sm leading-6 text-base-muted">
          Get full Mensa-level insights, exam mapping, and the Intel Intel feed.
        </p>
        <div className="rounded-xl border border-base-border bg-zinc-50 p-3 text-sm">
          Rs 99/year + 18% GST = <span className="font-semibold">Rs {TOTAL_PRICE.toFixed(2)}</span>
        </div>

        <a
          href="https://aienter.in/payment/uriq"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Enrol Now / Pay
        </a>
      </section>
    </MobileShell>
  );
}
