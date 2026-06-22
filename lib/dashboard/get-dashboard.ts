import { MOCK_DASHBOARD, type DashboardData } from "@/lib/mock/dashboard";
import { fetchProfileByUserId } from "@/lib/supabase/profiles";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getDashboardData(userId?: string | null): Promise<DashboardData> {
  const hasEnv =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!hasEnv) {
    return MOCK_DASHBOARD;
  }

  try {
    const supabase = await createSupabaseServerClient();
    let uid = userId;

    if (!uid) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      uid = user?.id ?? null;
    }

    if (!uid) {
      return MOCK_DASHBOARD;
    }

    const profile = await fetchProfileByUserId(uid, supabase);

    if (!profile) {
      return {
        ...MOCK_DASHBOARD,
        user: {
          ...MOCK_DASHBOARD.user,
          id: uid,
        },
      };
    }

    const [{ data: anecdotes }] = await Promise.all([
      supabase
        .from("daily_anecdotes")
        .select("*")
        .order("published_date", { ascending: false })
        .limit(5),
    ]);

    return {
      ...MOCK_DASHBOARD,
      user: {
        id: profile.id,
        email: profile.email ?? MOCK_DASHBOARD.user.email,
        subscription_status: profile.subscription_status ?? "free",
        subscription_expires_at: profile.subscription_expires_at,
      },
      baselineIqEstimate:
        profile.baseline_iq_estimate ?? MOCK_DASHBOARD.baselineIqEstimate,
      peerHighlight:
        profile.last_score_percent != null
          ? `Your latest session score: ${profile.last_score_percent}% — keep building streak momentum.`
          : MOCK_DASHBOARD.peerHighlight,
      anecdotes:
        anecdotes?.length ?
          anecdotes.map((row) => ({
            id: row.id,
            title: row.title,
            content_body: row.content_body,
            category: row.category,
            published_date: row.published_date,
          }))
        : MOCK_DASHBOARD.anecdotes,
    };
  } catch {
    return MOCK_DASHBOARD;
  }
}
