"use client";

import { useEffect, useState } from "react";
import {
  BADGES,
  countEarnedBadges,
  FREE_BADGE_COUNT,
  getFreeBadges,
  loadProgress,
  PREMIUM_BADGE_COUNT,
  type BadgeTier,
  type UserProgress,
} from "@/lib/badges";
import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRICING_LABEL } from "@/lib/utils/pricing";

const TIER_STYLES: Record<BadgeTier, string> = {
  locked: "opacity-40 grayscale",
  bronze: "ring-amber-300/60",
  silver: "ring-slate-300/80",
  gold: "ring-yellow-400/80",
};

export function BadgeWall() {
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) return null;

  const earnedFree = countEarnedBadges(progress, false);
  const earnedPremium = countEarnedBadges(progress, true);
  const showPremium = progress.isPremium;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-900">Your Badge Collection</h2>
        <p className="mt-1 text-sm text-slate-600">
          Pass each test with ≥50% to unlock badges. Free: {earnedFree}/{FREE_BADGE_COUNT} ·
          Premium: {earnedPremium}/{PREMIUM_BADGE_COUNT}
        </p>
      </div>

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-slate-700">Free Badges ({FREE_BADGE_COUNT})</h3>
        <div className="grid grid-cols-2 gap-3">
          {getFreeBadges().map((badge) => {
            const earned = progress.badges.find((b) => b.badgeId === badge.id);
            const tier: BadgeTier = earned?.tier ?? "locked";
            return (
              <div
                key={badge.id}
                className={cn(
                  "rounded-xl border border-zinc-200 bg-white p-3 ring-2 ring-transparent",
                  TIER_STYLES[tier]
                )}
              >
                <div className="text-2xl">{badge.emoji}</div>
                <p className="mt-1 text-xs font-semibold text-slate-900">{badge.name}</p>
                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">{badge.description}</p>
                {tier !== "locked" && (
                  <p className="mt-1 text-[10px] capitalize text-indigo-600">{tier}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-sm font-medium text-slate-700">
          Premium Badges ({PREMIUM_BADGE_COUNT - FREE_BADGE_COUNT} more)
        </h3>
        {!showPremium && (
          <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/50 p-4 text-center">
            <p className="text-sm text-indigo-900">Unlock {PREMIUM_BADGE_COUNT - FREE_BADGE_COUNT} premium badges</p>
            <p className="mt-1 text-xs text-indigo-700">{PRICING_LABEL}</p>
            <Link href="/paywall" className="mt-3 inline-block">
              <Button className="w-full">Go Premium</Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          {BADGES.filter((b) => b.tier === "premium").map((badge) => {
            const earned = progress.badges.find((b) => b.badgeId === badge.id);
            const tier: BadgeTier = earned?.tier ?? "locked";
            return (
              <div
                key={badge.id}
                className={cn(
                  "rounded-xl border border-zinc-200 bg-white p-3 ring-2 ring-transparent",
                  !showPremium && "blur-[2px]",
                  TIER_STYLES[tier]
                )}
              >
                <div className="text-2xl">{badge.emoji}</div>
                <p className="mt-1 text-xs font-semibold text-slate-900">{badge.name}</p>
                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
