import type { GuestAnswer, GuestProfile, GuestSession } from "@/lib/guest/types";

const STORAGE_KEY = "uriq_guest_profile";

function emptyProfile(): GuestProfile {
  const guestId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `guest-${Date.now()}`;

  return {
    guestId,
    createdAt: new Date().toISOString(),
    sessions: [],
    totalCorrect: 0,
    totalAnswered: 0,
    lastScorePercent: null,
  };
}

export function getGuestProfile(): GuestProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GuestProfile;
  } catch {
    return null;
  }
}

export function saveGuestProfile(profile: GuestProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function getOrCreateGuestProfile(): GuestProfile {
  const existing = getGuestProfile();
  if (existing) return existing;
  const profile = emptyProfile();
  saveGuestProfile(profile);
  return profile;
}

export function startGuestSession(): GuestSession {
  const session: GuestSession = {
    sessionId:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `sess-${Date.now()}`,
    startedAt: new Date().toISOString(),
    completedAt: null,
    answers: [],
    streak: 0,
    quickTestCompleted: false,
  };
  return session;
}

export function recordGuestAnswer(
  session: GuestSession,
  answer: GuestAnswer
): GuestSession {
  const streak = answer.isCorrect ? session.streak + 1 : 0;
  return {
    ...session,
    streak,
    answers: [...session.answers, answer],
  };
}

export function completeGuestSession(
  profile: GuestProfile,
  session: GuestSession
): GuestProfile {
  const correct = session.answers.filter((a) => a.isCorrect).length;
  const total = session.answers.length;
  const completed: GuestSession = {
    ...session,
    completedAt: new Date().toISOString(),
    quickTestCompleted: true,
  };

  const updated: GuestProfile = {
    ...profile,
    sessions: [...profile.sessions, completed],
    totalCorrect: profile.totalCorrect + correct,
    totalAnswered: profile.totalAnswered + total,
    lastScorePercent: total > 0 ? Math.round((correct / total) * 100) : null,
  };

  saveGuestProfile(updated);
  return updated;
}

export function exportGuestForMerge(profile: GuestProfile) {
  return {
    guestId: profile.guestId,
    totalCorrect: profile.totalCorrect,
    totalAnswered: profile.totalAnswered,
    lastScorePercent: profile.lastScorePercent,
    sessions: profile.sessions,
  };
}
