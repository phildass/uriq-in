import { NextResponse } from "next/server";

/**
 * POST body: exportGuestForMerge(profile) from localStorage
 * Merges guest sessions into Supabase when auth is wired.
 */
export async function POST(request: Request) {
  const payload = await request.json();

  // TODO: authenticate user, upsert user_responses from payload.sessions
  return NextResponse.json({
    ok: true,
    message: "Guest merge placeholder — connect Supabase auth + user_responses",
    received: {
      guestId: payload?.guestId,
      sessions: payload?.sessions?.length ?? 0,
    },
  });
}
