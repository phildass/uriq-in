import { BRAND } from "@/lib/config/brand";

export type BadgeTier = "locked" | "bronze" | "silver" | "gold";
export type BadgeTierLevel = "free" | "premium";

export type BadgeDefinition = {
  id: string;
  name: string;
  description: string;
  tier: BadgeTierLevel;
  emoji: string;
  testId?: string;
};

export const PASS_THRESHOLD = BRAND.passThreshold;

export const FREE_BADGE_COUNT = 12;
export const PREMIUM_BADGE_COUNT = 34;
export const PREMIUM_ONLY_BADGE_COUNT = PREMIUM_BADGE_COUNT - FREE_BADGE_COUNT;

export const BADGES: BadgeDefinition[] = [
  // Free (12)
  { id: "first-spark", name: "First Spark", description: "Complete your first test", tier: "free", emoji: "✨" },
  { id: "daily-baseline-pass", name: "Daily Baseline Pass", description: "Pass the 10-question baseline", tier: "free", emoji: "🎯", testId: "baseline" },
  { id: "logic-passed", name: "Logic Passed", description: "Pass the Logic module", tier: "free", emoji: "🧩", testId: "logic" },
  { id: "patterns-passed", name: "Patterns Passed", description: "Pass the Patterns module", tier: "free", emoji: "🔷", testId: "patterns" },
  { id: "verbal-passed", name: "Verbal Passed", description: "Pass the Verbal module", tier: "free", emoji: "📖", testId: "verbal" },
  { id: "triple-threat", name: "Triple Threat", description: "Pass all 3 category modules", tier: "free", emoji: "🏅" },
  { id: "speed-starter", name: "Speed Starter", description: "Finish faster than peer average", tier: "free", emoji: "⚡" },
  { id: "strong-mind", name: "Strong Mind", description: "Score 75% or above on any free test", tier: "free", emoji: "💪" },
  { id: "perfect-spark", name: "Perfect Spark", description: "Score 100% on baseline", tier: "free", emoji: "🌟", testId: "baseline" },
  { id: "streak-3", name: "3-Day Streak", description: "Pass any test 3 days in a row", tier: "free", emoji: "🔥" },
  { id: "streak-7", name: "7-Day Streak", description: "Pass any test 7 days in a row", tier: "free", emoji: "🔥" },
  { id: "free-graduate", name: "Free Graduate", description: "Pass baseline + all 3 modules", tier: "free", emoji: "🎓" },

  // Premium-only (22)
  { id: "mensa-logic", name: "Mensa Logic", description: "Pass Mensa Logic module", tier: "premium", emoji: "🧠", testId: "logic-mensa" },
  { id: "mensa-spatial", name: "Mensa Spatial", description: "Pass Mensa Spatial module", tier: "premium", emoji: "🎨", testId: "patterns-mensa" },
  { id: "mensa-verbal", name: "Mensa Verbal", description: "Pass Mensa Verbal module", tier: "premium", emoji: "📝", testId: "verbal-mensa" },
  { id: "mensa-quant", name: "Mensa Quant", description: "Pass Mensa Quant module", tier: "premium", emoji: "🔢", testId: "quant-mensa" },
  { id: "exam-upsc", name: "UPSC Ready", description: "Pass UPSC aptitude track", tier: "premium", emoji: "🏛️", testId: "upsc" },
  { id: "exam-banking", name: "Banking Aptitude", description: "Pass Banking track", tier: "premium", emoji: "🏦", testId: "banking" },
  { id: "exam-corporate", name: "Corporate Clearance", description: "Pass Corporate track", tier: "premium", emoji: "💼", testId: "corporate" },
  { id: "mensa-master-logic", name: "Logic Master", description: "Score 75%+ on Mensa Logic", tier: "premium", emoji: "👑" },
  { id: "mensa-master-spatial", name: "Spatial Master", description: "Score 75%+ on Mensa Spatial", tier: "premium", emoji: "👑" },
  { id: "mensa-master-verbal", name: "Verbal Master", description: "Score 75%+ on Mensa Verbal", tier: "premium", emoji: "👑" },
  { id: "mensa-master-quant", name: "Quant Master", description: "Score 75%+ on Mensa Quant", tier: "premium", emoji: "👑" },
  { id: "social-top50", name: "Top 50 Today", description: "Rank among top 50 fastest today", tier: "premium", emoji: "🚀" },
  { id: "social-top10", name: "Top 10%", description: "Speed in top 10% of peers", tier: "premium", emoji: "📈" },
  { id: "social-top5", name: "Top 5% Speed", description: "Speed matches top 5% corporate candidates", tier: "premium", emoji: "🏆" },
  { id: "arena-5", name: "5-Round Streak", description: "Pass 5 premium rounds in a row", tier: "premium", emoji: "🎮" },
  { id: "arena-10", name: "10-Round Streak", description: "Pass 10 premium rounds in a row", tier: "premium", emoji: "🎮" },
  { id: "arena-30", name: "30-Day Premium", description: "30-day premium play streak", tier: "premium", emoji: "📅" },
  { id: "speed-logic", name: "Logic Speed Demon", description: "Fastest Logic completion", tier: "premium", emoji: "💨" },
  { id: "speed-spatial", name: "Spatial Speed Demon", description: "Fastest Spatial completion", tier: "premium", emoji: "💨" },
  { id: "speed-verbal", name: "Verbal Speed Demon", description: "Fastest Verbal completion", tier: "premium", emoji: "💨" },
  { id: "mastermind", name: "Mastermind", description: "Pass all Mensa + exam tracks", tier: "premium", emoji: "🧿" },
  { id: "uriq-legend", name: "uriq Legend", description: "100% on Mensa + 30-day streak", tier: "premium", emoji: "⭐" },
];

export type UserBadge = {
  badgeId: string;
  tier: BadgeTier;
  earnedAt: string;
};

export type TestResult = {
  testId: string;
  scorePercent: number;
  passed: boolean;
  timeTakenMs: number;
  completedAt: string;
};

export function isPass(scorePercent: number): boolean {
  return scorePercent >= PASS_THRESHOLD;
}

export function scoreToBadgeTier(scorePercent: number): BadgeTier {
  if (scorePercent >= 100) return "gold";
  if (scorePercent >= 75) return "silver";
  if (scorePercent >= PASS_THRESHOLD) return "bronze";
  return "locked";
}

export function getBadgeById(id: string): BadgeDefinition | undefined {
  return BADGES.find((b) => b.id === id);
}

export function getFreeBadges(): BadgeDefinition[] {
  return BADGES.filter((b) => b.tier === "free");
}

export function getPremiumBadges(): BadgeDefinition[] {
  return BADGES.filter((b) => b.tier === "premium");
}

const STORAGE_KEY = "uriq_user_progress";

export type UserProgress = {
  badges: UserBadge[];
  testResults: TestResult[];
  streakDays: number;
  lastPassDate: string | null;
  isPremium: boolean;
};

export function getDefaultProgress(): UserProgress {
  return { badges: [], testResults: [], streakDays: 0, lastPassDate: null, isPremium: false };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UserProgress) : getDefaultProgress();
  } catch {
    return getDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function awardBadgesFromResult(
  progress: UserProgress,
  result: TestResult,
  peerAvgMs: number
): UserProgress {
  const next = { ...progress, testResults: [...progress.testResults, result] };
  const today = new Date().toISOString().slice(0, 10);

  const upsert = (badgeId: string, tier: BadgeTier) => {
    const existing = next.badges.find((b) => b.badgeId === badgeId);
    const tierOrder: BadgeTier[] = ["locked", "bronze", "silver", "gold"];
    if (existing) {
      if (tierOrder.indexOf(tier) > tierOrder.indexOf(existing.tier)) {
        existing.tier = tier;
        existing.earnedAt = new Date().toISOString();
      }
    } else if (tier !== "locked") {
      next.badges.push({ badgeId, tier, earnedAt: new Date().toISOString() });
    }
  };

  if (result.passed) {
    upsert("first-spark", "bronze");

    const tier = scoreToBadgeTier(result.scorePercent);
    const testBadgeMap: Record<string, string> = {
      baseline: "daily-baseline-pass",
      logic: "logic-passed",
      patterns: "patterns-passed",
      verbal: "verbal-passed",
    };
    if (testBadgeMap[result.testId]) upsert(testBadgeMap[result.testId], tier);
    if (result.testId === "baseline" && result.scorePercent === 100) upsert("perfect-spark", "gold");
    if (result.scorePercent >= 75) upsert("strong-mind", tier);
    if (result.timeTakenMs < peerAvgMs) upsert("speed-starter", "bronze");

    // Streak
    if (next.lastPassDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().slice(0, 10);
      next.streakDays = next.lastPassDate === yStr ? next.streakDays + 1 : 1;
      next.lastPassDate = today;
    }
    if (next.streakDays >= 3) upsert("streak-3", "bronze");
    if (next.streakDays >= 7) upsert("streak-7", "silver");

    const passedModules = new Set(
      next.testResults.filter((r) => r.passed).map((r) => r.testId)
    );
    if (["logic", "patterns", "verbal"].every((m) => passedModules.has(m))) {
      upsert("triple-threat", "silver");
    }
    if (passedModules.has("baseline") && ["logic", "patterns", "verbal"].every((m) => passedModules.has(m))) {
      upsert("free-graduate", "gold");
    }
  }

  return next;
}

export function countEarnedBadges(progress: UserProgress, premium: boolean): number {
  const allowed = premium ? BADGES : getFreeBadges();
  const allowedIds = new Set(allowed.map((b) => b.id));
  return progress.badges.filter((b) => allowedIds.has(b.badgeId) && b.tier !== "locked").length;
}
