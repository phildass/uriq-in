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

const BATCH_SIZE = 100;
const TARGET_TOTAL = 1000;

async function generateQuestionsBatch(targetCount = TARGET_TOTAL): Promise<GeneratedQuestion[]> {
  // Placeholder: wire to OpenAI/Anthropic SDK and persist into Supabase.
  // Keep generation batched to control cost and review quality before insertion.
  console.log("Using prompt:", INGESTION_SYSTEM_PROMPT);
  console.log(`Generate and validate ${targetCount} questions in batches of ${BATCH_SIZE}.`);
  return [];
}

generateQuestionsBatch().then((questions) => {
  console.log(`Prepared ${questions.length} questions for ingestion.`);
});
