/**
 * AI question batch ingestion skeleton.
 * Run: npx tsx scripts/ingest-questions.ts
 *
 * Prompts OpenAI/Anthropic to generate structured JSON for questions_pool.
 * Do NOT invoke live AI per user question — batch ingest only.
 */

const BATCH_SIZE = 100;
const TARGET_TOTAL = 1000;

const SYSTEM_PROMPT = `Generate highly accurate IQ/aptitude questions for Indian exam aspirants.
Return JSON array only. Each object must match:
{ category: "Spatial"|"Quantitative"|"Verbal"|"Logic", difficulty: "Baseline"|"Mensa",
  question_data: { type: "text"|"matrix", prompt: string, matrix?: string[][] },
  options: string[4], correct_option: number, explanation: string, average_solve_time_seconds: number }
Zero hallucinations. Verify logic before output.`;

async function ingestBatch(batchIndex: number) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log(`[batch ${batchIndex}] Skipped — set OPENAI_API_KEY`);
    return [];
  }

  // TODO: call OpenAI API, validate JSON, insert into Supabase questions_pool
  console.log(`[batch ${batchIndex}] Would generate ${BATCH_SIZE} questions`);
  return [];
}

async function main() {
  const batches = Math.ceil(TARGET_TOTAL / BATCH_SIZE);
  console.log(`uriq.in question ingestion — target ${TARGET_TOTAL} questions`);
  console.log(SYSTEM_PROMPT.slice(0, 80) + "...");

  for (let i = 0; i < batches; i++) {
    await ingestBatch(i + 1);
  }

  console.log("Done. Wire Supabase insert + validation before production.");
}

main();
