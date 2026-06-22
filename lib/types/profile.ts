export type ProfileRow = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  subscription_status: "free" | "premium";
  subscription_expires_at: string | null;
  baseline_iq_estimate: number | null;
  last_score_percent: number | null;
  created_at?: string;
  updated_at?: string;
};

export type ProfileUpsert = Pick<
  ProfileRow,
  "id" | "first_name" | "last_name" | "phone" | "email"
>;
