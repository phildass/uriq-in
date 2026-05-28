import Link from "next/link";
import { GuestScoreBanner } from "@/components/dashboard/guest-score-banner";
import { ExamAnalytics } from "@/components/dashboard/exam-analytics";
import { IntelFeed } from "@/components/dashboard/intel-feed";
import { IqSummary } from "@/components/dashboard/iq-summary";
import { PremiumCta } from "@/components/dashboard/premium-cta";
import { FullProfileSection } from "@/components/profile/full-profile-section";
import MobileShell from "@/components/layout/mobile-shell";
import { Badge } from "@/components/ui/badge";
import { getDashboardData } from "@/lib/dashboard/get-dashboard";
import { displayName, fetchProfileByUserId } from "@/lib/supabase/profiles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getDashboardData(user?.id ?? null);
  const profile = user ? await fetchProfileByUserId(user.id, supabase) : null;
  const name = displayName(profile, user?.email ?? data.user.email);
  const isPremium = data.user.subscription_status === "premium";

  return (
    <MobileShell>
      <div className="space-y-4">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm tracking-wide text-base-muted">uriq.in</p>
            <Badge variant={isPremium ? "default" : "outline"}>
              {isPremium ? "Premium" : "Free"}
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold text-base-text">
            {user ? `Hi, ${name}` : "Your dashboard"}
          </h1>
          <p className="text-sm text-base-muted">
            {user ?
              "Performance from your profile and latest sessions."
            : "Guest preview — register to sync scores to Supabase."}
          </p>
          {profile?.last_score_percent != null ?
            <p className="text-sm font-medium text-base-text">
              Last score: {profile.last_score_percent}%
              {profile.baseline_iq_estimate != null ?
                ` · Baseline IQ est. ${profile.baseline_iq_estimate}`
              : ""}
            </p>
          : null}
        </header>

        <GuestScoreBanner />

        <IqSummary
          estimate={data.baselineIqEstimate}
          peerHighlight={data.peerHighlight}
          categories={data.categoryBreakdown}
          locked={!isPremium}
        />

        <ExamAnalytics metrics={data.examMetrics} locked={!isPremium} />

        {!isPremium ? <PremiumCta benchmarkMessage={data.recentBenchmark} /> : null}

        <FullProfileSection />

        <IntelFeed anecdotes={data.anecdotes} />

        <div className="flex gap-2 text-center text-xs text-base-muted">
          <Link href="/quiz/quick" className="underline-offset-2 hover:underline">
            Quick test
          </Link>
          <span aria-hidden>·</span>
          <Link href="/profile" className="underline-offset-2 hover:underline">
            Full profile
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
