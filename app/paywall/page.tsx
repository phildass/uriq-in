"use client";

import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import {
  BASE_PRICE_INR,
  GST_AMOUNT,
  PRICING_LABEL,
  TOTAL_PRICE_INR,
} from "@/lib/utils/pricing";
import { PREMIUM_BADGE_COUNT, FREE_BADGE_COUNT } from "@/lib/badges";
import { useLanguage } from "@/components/providers/language-provider";

export default function PaywallPage() {
  const { t } = useLanguage();

  function handlePay() {
    alert(
      "UPI payment placeholder (Razorpay/PhonePe).\nConfigure RAZORPAY_KEY_ID to enable live payments."
    );
  }

  return (
    <MobileShell>
      <div className="space-y-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
            {t("yourIq")} Premium
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">The Mastermind Arena</h1>
          <p className="mt-2 text-sm text-slate-600">
            Unlock {PREMIUM_BADGE_COUNT - FREE_BADGE_COUNT} premium badges, Mensa modules, exam
            tracks, and Intel Intel feed.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold text-slate-900">₹{BASE_PRICE_INR}</span>
            <span className="text-sm text-slate-500">/year</span>
          </div>
          <p className="mt-2 text-sm text-slate-600">
            + 18% GST (₹{GST_AMOUNT.toFixed(2)}) ={" "}
            <strong>₹{TOTAL_PRICE_INR.toFixed(2)}</strong> all-inclusive
          </p>
          <p className="mt-1 text-xs text-slate-500">{PRICING_LABEL}</p>

          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            <li>· Full Mensa-level IQ breakdown</li>
            <li>· UPSC, Banking & Corporate aptitude mapping</li>
            <li>· Social benchmarking micro-banners</li>
            <li>· Intel Intel daily brain-boost feed</li>
            <li>· {PREMIUM_BADGE_COUNT} total collectible badges</li>
          </ul>

          <Button className="mt-5 w-full" onClick={handlePay}>
            Pay ₹{TOTAL_PRICE_INR.toFixed(2)} via UPI
          </Button>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            Razorpay / PhonePe · Secure Indian payments
          </p>
        </div>

        <Link href="/">
          <Button variant="ghost" className="w-full">
            Continue Free
          </Button>
        </Link>
      </div>
    </MobileShell>
  );
}
