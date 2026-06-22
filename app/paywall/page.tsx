import Link from "next/link";
import MobileShell from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import {
  BASE_PRICE_INR,
  GST_AMOUNT,
  PRICING_LABEL,
  TOTAL_PRICE_INR,
} from "@/lib/utils/pricing";
import { FREE_BADGE_COUNT, PREMIUM_BADGE_COUNT } from "@/lib/badges";

export default function PaywallPage() {
  return (
    <MobileShell>
      <section className="space-y-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
            Your IQ Premium
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-base-text">The Mastermind Arena</h1>
          <p className="mt-2 text-sm text-base-muted">
            Unlock {PREMIUM_BADGE_COUNT - FREE_BADGE_COUNT} premium badges, Mensa modules, exam
            tracks, and Intel Intel feed.
          </p>
        </div>

        <div className="rounded-xl2 border border-base-border bg-base-card p-4 shadow-soft">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold text-base-text">₹{BASE_PRICE_INR}</span>
            <span className="text-sm text-base-muted">/year</span>
          </div>
          <p className="mt-2 text-sm text-base-muted">
            + 18% GST (₹{GST_AMOUNT.toFixed(2)}) ={" "}
            <strong>₹{TOTAL_PRICE_INR.toFixed(2)}</strong> all-inclusive
          </p>
          <p className="mt-1 text-xs text-base-muted">{PRICING_LABEL}</p>

          <ul className="mt-4 space-y-2 text-sm text-base-text">
            <li>· Full Mensa-level IQ breakdown</li>
            <li>· UPSC, Banking & Corporate aptitude mapping</li>
            <li>· Social benchmarking micro-banners</li>
            <li>· Intel Intel daily brain-boost feed</li>
            <li>· {PREMIUM_BADGE_COUNT} total collectible badges</li>
          </ul>

          <a
            href="https://aienter.in/payment/uriq"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Pay ₹{TOTAL_PRICE_INR.toFixed(2)} via UPI
          </a>
          <p className="mt-2 text-center text-[10px] text-base-muted">
            Razorpay / PhonePe · Secure Indian payments
          </p>
        </div>

        <Link href="/">
          <Button variant="ghost" className="w-full">
            Continue Free
          </Button>
        </Link>
      </section>
    </MobileShell>
  );
}
