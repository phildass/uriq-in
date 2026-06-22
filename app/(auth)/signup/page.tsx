"use client";

import { useEffect } from "react";
import MobileShell from "@/components/layout/mobile-shell";
import { exportGuestForMerge, getGuestProfile } from "@/lib/guest/storage";

export default function SignupPage() {
  useEffect(() => {
    const profile = getGuestProfile();
    if (!profile) return;

    const payload = exportGuestForMerge(profile);
    void fetch("/api/guest/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }, []);

  return (
    <MobileShell>
      <section className="space-y-4 rounded-xl2 border border-surface-border bg-base-card p-4 shadow-soft">
        <h1 className="text-2xl font-semibold text-base-text">Create your account</h1>
        <p className="text-sm leading-6 text-base-muted">
          Sign up to save benchmarks, streaks, and premium analytics. Guest progress from this
          device will sync automatically (merge API placeholder until Supabase auth is live).
        </p>
        <button
          type="button"
          className="w-full rounded-xl bg-module-math px-4 py-3 text-sm font-semibold text-white"
        >
          Continue with email (coming soon)
        </button>
      </section>
    </MobileShell>
  );
}
