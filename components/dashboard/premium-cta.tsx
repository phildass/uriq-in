import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TOTAL_PRICE } from "@/lib/utils/pricing";

type PremiumCtaProps = {
  benchmarkMessage: string;
};

export function PremiumCta({ benchmarkMessage }: PremiumCtaProps) {
  return (
    <Card className="border-accent-indigo/20 bg-accent-soft/40">
      <CardHeader>
        <CardTitle className="text-accent-indigo">Unlock full breakdown</CardTitle>
        <CardDescription className="text-base-text/80">
          Your baseline IQ estimate is ready. Unlock Mensa-level module insights, exam mapping,
          and daily brain-boosting anecdotes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="rounded-lg border border-base-border bg-white/80 px-3 py-2 text-xs text-base-muted">
          {benchmarkMessage}
        </p>
        <p className="text-sm text-base-text">
          Premium: Rs 99/year + 18% GST ={" "}
          <span className="font-semibold">Rs {TOTAL_PRICE.toFixed(2)}</span>
        </p>
        <Link
          href="/paywall"
          className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-95"
        >
          Unlock Premium
        </Link>
      </CardContent>
    </Card>
  );
}
