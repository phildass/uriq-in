import type { ProfileRow, ProfileUpsert } from "@/lib/types/profile";
import { createSupabaseClient } from "@/lib/supabase/client";

export async function upsertProfileClient(profile: ProfileUpsert) {
  const supabase = createSupabaseClient();
  return supabase.from("profiles").upsert(
    {
      ...profile,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" }
  );
}

export async function fetchProfileByUserId(
  userId: string,
  serverClient?: Awaited<
    ReturnType<typeof import("@/lib/supabase/server").createSupabaseServerClient>
  >
): Promise<ProfileRow | null> {
  const supabase = serverClient ?? createSupabaseClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error || !data) return null;
  return data as ProfileRow;
}

export function displayName(profile: ProfileRow | null, fallbackEmail?: string) {
  if (profile?.first_name) {
    const last = profile.last_name ? ` ${profile.last_name}` : "";
    return `${profile.first_name}${last}`.trim();
  }
  return fallbackEmail?.split("@")[0] ?? "Guest";
}
