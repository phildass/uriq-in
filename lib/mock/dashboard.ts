/**
 * Mock dashboard payload — mirrors Supabase tables:
 * users, user_responses (aggregated), questions_pool (categories), daily_anecdotes
 *
 * Wire `getDashboardData()` to Supabase when env vars are set.
 */

export type SubscriptionStatus = "free" | "premium";

export type CategoryName = "Spatial" | "Quantitative" | "Verbal" | "Logic";

export type AnecdoteCategory = "History" | "Neuroscience" | "Interview Trick";

export type CategoryBreakdown = {
  category: CategoryName;
  percentile: number;
  avgTimeMs: number;
  correctRate: number;
};

export type ExamMetric = {
  id: string;
  label: string;
  score: number;
  targetExams: string[];
};

export type DailyAnecdote = {
  id: string;
  title: string;
  content_body: string;
  category: AnecdoteCategory;
  published_date: string;
};

export type DashboardUser = {
  id: string;
  email: string;
  subscription_status: SubscriptionStatus;
  subscription_expires_at: string | null;
};

export type DashboardData = {
  user: DashboardUser;
  baselineIqEstimate: number;
  peerHighlight: string;
  categoryBreakdown: CategoryBreakdown[];
  examMetrics: ExamMetric[];
  anecdotes: DailyAnecdote[];
  recentBenchmark: string;
};

export const MOCK_DASHBOARD: DashboardData = {
  user: {
    id: "mock-user-001",
    email: "demo@uriq.in",
    subscription_status: "free",
    subscription_expires_at: null,
  },
  baselineIqEstimate: 118,
  peerHighlight:
    "You scored faster than 74% of peers in Spatial Logic this week.",
  categoryBreakdown: [
    { category: "Spatial", percentile: 74, avgTimeMs: 8420, correctRate: 0.8 },
    { category: "Logic", percentile: 61, avgTimeMs: 11200, correctRate: 0.7 },
    { category: "Verbal", percentile: 58, avgTimeMs: 9800, correctRate: 0.65 },
    { category: "Quantitative", percentile: 52, avgTimeMs: 12400, correctRate: 0.6 },
  ],
  examMetrics: [
    {
      id: "numerical",
      label: "Numerical Estimation",
      score: 72,
      targetExams: ["Banking", "SSC", "Corporate"],
    },
    {
      id: "di",
      label: "Data Interpretation",
      score: 68,
      targetExams: ["UPSC CSAT", "CAT", "Corporate"],
    },
    {
      id: "logic",
      label: "Logical Deduction",
      score: 76,
      targetExams: ["UPSC", "Law entrances", "Consulting"],
    },
  ],
  anecdotes: [
    {
      id: "a1",
      title: "Feynman on clarity",
      content_body:
        "Explain a hard idea in plain language. Gaps you cannot simplify are gaps in your own understanding.",
      category: "History",
      published_date: "2026-05-28",
    },
    {
      id: "a2",
      title: "Neuroplasticity in practice",
      content_body:
        "Short daily problem sets build flexible reasoning pathways better than occasional marathon sessions.",
      category: "Neuroscience",
      published_date: "2026-05-27",
    },
    {
      id: "a3",
      title: "Lateral thinking in interviews",
      content_body:
        "When stuck, invert the constraint: ask what must be false if every option feels plausible.",
      category: "Interview Trick",
      published_date: "2026-05-26",
    },
  ],
  recentBenchmark:
    "Your speed matches the top 5% of candidates clearing corporate aptitude rounds.",
};

