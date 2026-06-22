import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { categoryToModule, type ModuleKey } from "@/lib/modules/colors";
import { QUICK_TEST_QUESTIONS, type QuickQuestion } from "@/lib/mock/quick-test";

type QuestionPoolRow = {
  id: string;
  category: "Spatial" | "Quantitative" | "Verbal" | "Logic";
  question_data: { prompt?: string; text?: string } | string;
  options: string[] | { options?: string[] };
  correct_option: string;
};

function normalizeQuestion(row: QuestionPoolRow): QuickQuestion | null {
  const prompt =
    typeof row.question_data === "string" ?
      row.question_data
    : (row.question_data?.prompt ?? row.question_data?.text ?? "");

  const options =
    Array.isArray(row.options) ?
      row.options
    : (Array.isArray(row.options?.options) ? row.options.options : []);

  if (!prompt || options.length < 2) return null;

  const correctIndex = options.findIndex((opt) => opt === row.correct_option);
  if (correctIndex < 0) return null;

  const moduleKey: ModuleKey = categoryToModule(row.category);
  const mappedCategory =
    row.category === "Quantitative" ? "Quantitative"
    : row.category === "Verbal" ? "Verbal"
    : "Logic";

  return {
    id: row.id,
    module: moduleKey,
    category: mappedCategory,
    prompt,
    options,
    correctIndex,
  };
}

export async function GET() {
  try {
    const hasEnv =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    if (!hasEnv) {
      return NextResponse.json({ questions: QUICK_TEST_QUESTIONS, source: "mock" });
    }

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("questions_pool")
      .select("id, category, question_data, options, correct_option")
      .eq("difficulty", "Baseline")
      .limit(20);

    if (error || !data?.length) {
      return NextResponse.json({ questions: QUICK_TEST_QUESTIONS, source: "mock" });
    }

    const normalized = (data as QuestionPoolRow[])
      .map(normalizeQuestion)
      .filter((q): q is QuickQuestion => Boolean(q))
      .slice(0, 5);

    if (!normalized.length) {
      return NextResponse.json({ questions: QUICK_TEST_QUESTIONS, source: "mock" });
    }

    return NextResponse.json({ questions: normalized, source: "questions_pool" });
  } catch {
    return NextResponse.json({ questions: QUICK_TEST_QUESTIONS, source: "mock" });
  }
}
