import { LIVE_SUMMARY_SYSTEM_PROMPT } from "@/lib/ai/prompts";

type SummaryInput = {
  module: string;
  mistakes: number;
  averageTimeMs: number;
};

export async function summarizePerformance(input: SummaryInput) {
  return {
    prompt: LIVE_SUMMARY_SYSTEM_PROMPT,
    draft: `In ${input.module}, you stayed focused and kept a strong pace. With a small reduction in repeated mistake patterns, your interview and exam decision speed will improve noticeably.`,
  };
}
