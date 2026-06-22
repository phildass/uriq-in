"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getGuestProfile } from "@/lib/guest/storage";
import type { GuestProfile } from "@/lib/guest/types";

export function GuestProfileCard() {
  const [profile, setProfile] = useState<GuestProfile | null>(null);

  useEffect(() => {
    setProfile(getGuestProfile());
  }, []);

  if (!profile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Guest mode</CardTitle>
          <CardDescription>
            Take the quick test to save progress on this device — no account required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/quiz/quick"
            className="inline-flex w-full justify-center rounded-xl bg-module-logic px-4 py-3 text-sm font-semibold text-white"
          >
            Start Quick IQ Test
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Guest progress</CardTitle>
        <CardDescription>Saved locally · syncs when you sign up</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-base-muted">Last score</span>
          <span className="font-semibold text-base-text">
            {profile.lastScorePercent != null ? `${profile.lastScorePercent}%` : "—"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-muted">Questions answered</span>
          <span className="font-semibold text-base-text">{profile.totalAnswered}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-base-muted">Sessions</span>
          <span className="font-semibold text-base-text">{profile.sessions.length}</span>
        </div>
        <Link
          href="/signup"
          className="mt-2 inline-flex w-full justify-center rounded-xl bg-module-math px-4 py-3 text-sm font-semibold text-white"
        >
          Sign up to merge progress
        </Link>
      </CardContent>
    </Card>
  );
}
