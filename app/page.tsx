"use client";

import Link from "next/link";
import { ArrowRight, Brain, Medal, Timer, Trophy } from "lucide-react";
import MobileShell from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { BadgeChip } from "@/components/ui/progress";
import { useLanguage } from "@/components/providers/language-provider";
import { PRICING_LABEL } from "@/lib/utils/pricing";
import { FREE_BADGE_COUNT, PREMIUM_BADGE_COUNT } from "@/lib/badges";
import { getFreeModules } from "@/lib/quiz/modules";

export default function HomePage() {
  const { t } = useLanguage();
  const modules = getFreeModules();

  return (
    <MobileShell>
      <section className="space-y-8">
        <header className="space-y-3">
          <BadgeChip>Daily Spark · Pass ≥50% to win badges</BadgeChip>
          <h1 className="text-3xl font-semibold leading-tight text-slate-900">
            <span className="text-indigo-600">{t("yourIq")}</span>
            <span className="block text-2xl text-slate-800">Measured. Mastered. Played.</span>
          </h1>
          <p className="text-sm leading-6 text-slate-500">{t("audience")}</p>
          <p className="text-sm leading-6 text-slate-600">{t("tagline")}</p>
        </header>

        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="mb-3 text-xs text-slate-500">{t("dailySpark")}</p>
          <Link href="/quiz/baseline">
            <Button className="w-full gap-2">
              {t("discoverIq")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-3 text-xs text-slate-500">
            {t("pricingNote")} · {PRICING_LABEL}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            { icon: Brain, text: "Mensa-inspired puzzles — addictive, challenging" },
            { icon: Timer, text: "Millisecond benchmarking vs Indian peers" },
            { icon: Medal, text: `${FREE_BADGE_COUNT} free badges · ${PREMIUM_BADGE_COUNT} total with Premium` },
            { icon: Trophy, text: "UPSC, Banking & Corporate exam mapping" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3"
            >
              <Icon className="h-4 w-4 shrink-0 text-indigo-600" />
              <span className="text-sm text-slate-700">{text}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <h2 className="text-sm font-medium text-slate-800">Free Game Modules</h2>
          <div className="grid grid-cols-1 gap-2">
            {modules
              .filter((m) => m.id !== "baseline")
              .map((m) => (
                <Link
                  key={m.id}
                  href={`/quiz/${m.id}`}
                  className="rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-slate-800 transition hover:border-indigo-200"
                >
                  <span className="font-medium">{m.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">{m.description}</span>
                </Link>
              ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Link href="/badges" className="flex-1">
            <Button variant="outline" className="w-full">
              {t("viewBadges")}
            </Button>
          </Link>
          <Link href="/paywall" className="flex-1">
            <Button variant="outline" className="w-full">
              {t("premium")}
            </Button>
          </Link>
        </div>
      </section>
    </MobileShell>
  );
}
