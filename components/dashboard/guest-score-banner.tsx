"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getGuestProfile } from "@/lib/guest/storage";

export function GuestScoreBanner() {
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    const profile = getGuestProfile();
    setScore(profile?.lastScorePercent ?? null);
  }, []);

  if (score === null) return null;

  return (
    <div className="rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm">
      <span className="text-base-muted">Guest quick test: </span>
      <span className="font-semibold text-base-text">{score}%</span>
      <span className="text-base-muted"> · </span>
      <Link href="/profile" className="font-medium text-module-logic underline-offset-2 hover:underline">
        View local progress
      </Link>
    </div>
  );
}
