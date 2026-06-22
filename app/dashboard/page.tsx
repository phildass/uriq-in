"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Button } from "@/components/ui/button";
import { loadProgress, type UserProgress } from "@/lib/badges";
import { useLanguage } from "@/components/providers/language-provider";

export default function DashboardPage() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const latest = progress?.testResults.at(-1);
  const score = latest?.scorePercent ?? 0;

  return (
    <MobileShell>
      <div className="space-y-5">
        <h1 className="text-xl font-semibold text-slate-900">{t("dashboard")}</h1>

        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="blur-sm select-none">
            <p className="text-sm text-slate-500">Baseline IQ Estimate</p>
            <p className="mt-2 text-4xl font-semibold text-slate-900">{score + 42}</p>
            <p className="mt-2 text-sm text-slate-600">
              Spatial Logic: faster than 74% of peers
            </p>
            <p className="mt-1 text-sm text-slate-600">Verbal: UPSC-ready band</p>
            <p className="mt-1 text-sm text-slate-600">Logic: Banking aptitude match</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 p-4 text-center backdrop-blur-[2px]">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Your baseline IQ estimate is ready.
              </p>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                You scored faster than 74% of peers in Spatial Logic. Unlock your full Mensa-level
                breakdown, exam aptitude mapping, and daily Intel Intel feed.
              </p>
              <Link href="/paywall" className="mt-4 inline-block">
                <Button>{t("unlockPremium")}</Button>
              </Link>
            </div>
          </div>
        </div>

        <Link href="/badges">
          <Button variant="secondary" className="w-full">
            {t("viewBadges")}
          </Button>
        </Link>
      </div>
    </MobileShell>
  );
}
