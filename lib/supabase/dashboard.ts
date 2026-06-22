import type { DashboardData } from "@/lib/mock/dashboard";
import { MOCK_DASHBOARD } from "@/lib/mock/dashboard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Future Supabase fetch — returns mock when env is missing or query fails.
 */
export async function fetchDashboardFromSupabase(
  userId?: string
): Promise<DashboardData | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  try {
    const supabase = await createSupabaseServerClient();

    const [{ data: anecdotes }, { data: user }] = await Promise.all([
      supabase.from("daily_anecdotes").select("*").order("published_date", { ascending: false }).limit(5),
      userId
        ? supabase.from("users").select("*").eq("id", userId).maybeSingle()
        : Promise.resolve({ data: null }),
    ]);

    if (!anecdotes?.length) {
      return null;
    }

    return {
      ...MOCK_DASHBOARD,
      user: user ?? MOCK_DASHBOARD.user,
      anecdotes: anecdotes.map((row) => ({
        id: row.id,
        title: row.title,
        content_body: row.content_body,
        category: row.category,
        published_date: row.published_date,
      })),
    };
  } catch {
    return null;
  }
}
