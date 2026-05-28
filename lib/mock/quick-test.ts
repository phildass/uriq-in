import type { ModuleKey } from "@/lib/modules/colors";

export type QuickQuestion = {
  id: string;
  module: ModuleKey;
  category: "Logic" | "Quantitative" | "Verbal";
  prompt: string;
  options: string[];
  correctIndex: number;
};

export const QUICK_TEST_QUESTIONS: QuickQuestion[] = [
  {
    id: "q1",
    module: "logic",
    category: "Logic",
    prompt: "Which number completes the pattern? 2, 6, 12, 20, __",
    options: ["28", "30", "32", "34"],
    correctIndex: 1,
  },
  {
    id: "q2",
    module: "math",
    category: "Quantitative",
    prompt: "A train covers 120 km in 2 hours. What is its speed in km/h?",
    options: ["40", "50", "60", "70"],
    correctIndex: 2,
  },
  {
    id: "q3",
    module: "verbal",
    category: "Verbal",
    prompt: "Choose the word closest in meaning to 'Concise'.",
    options: ["Verbose", "Brief", "Confused", "Loud"],
    correctIndex: 1,
  },
  {
    id: "q4",
    module: "logic",
    category: "Logic",
    prompt: "If all Bloops are Razzies, and some Razzies are Lazzies, which must be true?",
    options: [
      "All Lazzies are Bloops",
      "Some Bloops may be Lazzies",
      "No Bloops are Lazzies",
      "All Bloops are Lazzies",
    ],
    correctIndex: 1,
  },
  {
    id: "q5",
    module: "math",
    category: "Quantitative",
    prompt: "What is 15% of 200?",
    options: ["20", "25", "30", "35"],
    correctIndex: 2,
  },
];
