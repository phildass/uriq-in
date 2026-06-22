export type StringKey =
  | "discoverIq"
  | "yourIq"
  | "tagline"
  | "audience"
  | "dailySpark"
  | "startBaseline"
  | "pricingNote"
  | "passRule"
  | "badges"
  | "dashboard"
  | "premium"
  | "unlockPremium"
  | "viewBadges"
  | "playAgain"
  | "passed"
  | "failed"
  | "score"
  | "streak"
  | "language";

export const STRINGS: Record<StringKey, string> = {
  discoverIq: "Discover Your IQ Score",
  yourIq: "Your IQ",
  tagline: "Your IQ. Measured. Mastered. Played.",
  audience: "Built for Indian aspirants · Ages 13–60",
  dailySpark: "Daily Spark · 10-question baseline",
  startBaseline: "Start Baseline Test",
  pricingNote: "Free baseline. Premium unlocks full breakdown.",
  passRule: "Score 50% or above to pass and win a badge.",
  badges: "Badge Wall",
  dashboard: "Your Dashboard",
  premium: "Premium",
  unlockPremium: "Unlock Premium",
  viewBadges: "View Badges",
  playAgain: "Play Again",
  passed: "Passed! Badge unlocked.",
  failed: "Keep going — 50% is the pass mark.",
  score: "Score",
  streak: "Day Streak",
  language: "Language",
};
