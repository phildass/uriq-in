import { INGESTION_SYSTEM_PROMPT } from "@/lib/ai/prompts";

type GeneratedQuestion = {
  category: "Spatial" | "Quantitative" | "Verbal" | "Logic";
  difficulty: "Baseline" | "Mensa";
  question_data: Record<string, unknown>;
  options: string[];
  correct_option: string;
  explanation: string;
  average_solve_time_seconds: number;
};

async function generateQuestionsBatch(targetCount = 1000): Promise<GeneratedQuestion[]> {
  // Placeholder: wire to OpenAI/Anthropic SDK and persist into Supabase.
  // Keep generation batched to control cost and review quality before insertion.
  console.log("Using prompt:", INGESTION_SYSTEM_PROMPT);
  console.log(`Generate and validate ${targetCount} question objects.`);
  return [];
}

generateQuestionsBatch().then((questions) => {
  console.log(`Prepared ${questions.length} questions for ingestion.`);
});
