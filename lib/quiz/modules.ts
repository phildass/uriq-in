export type QuestionType = "text" | "matrix";

export type Question = {
  id: string;
  type: QuestionType;
  category: "Logic" | "Patterns" | "Verbal" | "Quantitative";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  matrix?: string[][];
};

export type TestModule = {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  questionCount: number;
  questions: Question[];
};

const logicQuestions: Question[] = [
  {
    id: "l1", type: "text", category: "Logic",
    prompt: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops definitely Lazzies?",
    options: ["Yes", "No", "Cannot determine", "Only some"],
    correctIndex: 0,
    explanation: "Classic syllogism — if A⊂B and B⊂C, then A⊂C.",
  },
  {
    id: "l2", type: "text", category: "Logic",
    prompt: "Which number completes the series: 2, 6, 12, 20, 30, ?",
    options: ["38", "40", "42", "44"],
    correctIndex: 2,
    explanation: "Differences are +4, +6, +8, +10, +12 → 30+12=42.",
  },
  {
    id: "l3", type: "text", category: "Logic",
    prompt: "A is taller than B. C is shorter than B. Who is shortest?",
    options: ["A", "B", "C", "Cannot tell"],
    correctIndex: 2,
    explanation: "A > B > C, so C is shortest.",
  },
  {
    id: "l4", type: "text", category: "Logic",
    prompt: "If CODE = 3+15+4+5 = 27 (A=1…), what is GAME?",
    options: ["24", "26", "28", "30"],
    correctIndex: 1,
    explanation: "G(7)+A(1)+M(13)+E(5) = 26.",
  },
  {
    id: "l5", type: "text", category: "Logic",
    prompt: "Which does not belong: Square, Circle, Triangle, Cube?",
    options: ["Square", "Circle", "Triangle", "Cube"],
    correctIndex: 3,
    explanation: "Cube is 3D; others are 2D shapes.",
  },
];

const patternQuestions: Question[] = [
  {
    id: "p1", type: "matrix", category: "Patterns",
    prompt: "Which shape completes the pattern?",
    options: ["▲", "●", "■", "◆"],
    correctIndex: 0,
    explanation: "Shapes rotate: ■ → ● → ▲ in sequence.",
    matrix: [["■", "●", "?"], ["●", "▲", "■"], ["▲", "■", "●"]],
  },
  {
    id: "p2", type: "text", category: "Patterns",
    prompt: "Complete: AZ, BY, CX, ?",
    options: ["DW", "EV", "DU", "EW"],
    correctIndex: 0,
    explanation: "First letter advances A→B→C→D; second retreats Z→Y→X→W.",
  },
  {
    id: "p3", type: "matrix", category: "Patterns",
    prompt: "Find the missing element in the grid.",
    options: ["2", "4", "6", "8"],
    correctIndex: 1,
    explanation: "Each row sums to 12.",
    matrix: [["3", "5", "4"], ["6", "2", "4"], ["1", "?", "7"]],
  },
  {
    id: "p4", type: "text", category: "Patterns",
    prompt: "1, 1, 2, 3, 5, 8, ?",
    options: ["11", "12", "13", "14"],
    correctIndex: 2,
    explanation: "Fibonacci: 5+8=13.",
  },
  {
    id: "p5", type: "text", category: "Patterns",
    prompt: "Mirror of 5 is still 5. Mirror of 6 looks like 9. What is mirror of 18?",
    options: ["81", "18", "88", "89"],
    correctIndex: 0,
    explanation: "Reverse the digits: 18 → 81.",
  },
];

const verbalQuestions: Question[] = [
  {
    id: "v1", type: "text", category: "Verbal",
    prompt: "Choose the word most similar to EPHEMERAL:",
    options: ["Permanent", "Fleeting", "Solid", "Ancient"],
    correctIndex: 1,
    explanation: "Ephemeral means short-lived or fleeting.",
  },
  {
    id: "v2", type: "text", category: "Verbal",
    prompt: "Book : Author :: Painting : ?",
    options: ["Gallery", "Artist", "Frame", "Canvas"],
    correctIndex: 1,
    explanation: "An author creates a book; an artist creates a painting.",
  },
  {
    id: "v3", type: "text", category: "Verbal",
    prompt: "Which word is the odd one out?",
    options: ["Benevolent", "Kind", "Generous", "Cruel"],
    correctIndex: 3,
    explanation: "Cruel is the opposite sentiment of the others.",
  },
  {
    id: "v4", type: "text", category: "Verbal",
    prompt: "Choose the best antonym of ABUNDANT:",
    options: ["Plentiful", "Scarce", "Ample", "Rich"],
    correctIndex: 1,
    explanation: "Abundant means plentiful; scarce is the opposite.",
  },
  {
    id: "v5", type: "text", category: "Verbal",
    prompt: "If you ASSUAGE someone's fears, you:",
    options: ["Increase them", "Ignore them", "Calm them", "Mock them"],
    correctIndex: 2,
    explanation: "Assuage means to soothe or relieve.",
  },
];

const baselineQuestions: Question[] = [
  logicQuestions[0],
  logicQuestions[1],
  patternQuestions[1],
  patternQuestions[3],
  verbalQuestions[0],
  verbalQuestions[1],
  logicQuestions[2],
  patternQuestions[0],
  verbalQuestions[2],
  logicQuestions[4],
];

export const TEST_MODULES: Record<string, TestModule> = {
  baseline: {
    id: "baseline",
    name: "Daily Baseline",
    description: "10-question rapid IQ baseline across Logic, Patterns, and Verbal.",
    isPremium: false,
    questionCount: 10,
    questions: baselineQuestions,
  },
  logic: {
    id: "logic",
    name: "Logic Module",
    description: "Deduction, series, and syllogisms.",
    isPremium: false,
    questionCount: 5,
    questions: logicQuestions,
  },
  patterns: {
    id: "patterns",
    name: "Patterns Module",
    description: "Spatial matrices and sequence recognition.",
    isPremium: false,
    questionCount: 5,
    questions: patternQuestions,
  },
  verbal: {
    id: "verbal",
    name: "Verbal Module",
    description: "Analogies, vocabulary, and comprehension.",
    isPremium: false,
    questionCount: 5,
    questions: verbalQuestions,
  },
};

export function getTestModule(id: string): TestModule | undefined {
  return TEST_MODULES[id];
}

export function getFreeModules(): TestModule[] {
  return Object.values(TEST_MODULES).filter((m) => !m.isPremium);
}
