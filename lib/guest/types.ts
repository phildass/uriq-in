export type GuestAnswer = {
  questionId: string;
  module: "logic" | "math" | "verbal";
  isCorrect: boolean;
  timeTakenMs: number;
  answeredAt: string;
};

export type GuestSession = {
  sessionId: string;
  startedAt: string;
  completedAt: string | null;
  answers: GuestAnswer[];
  streak: number;
  quickTestCompleted: boolean;
};

export type GuestProfile = {
  guestId: string;
  createdAt: string;
  sessions: GuestSession[];
  totalCorrect: number;
  totalAnswered: number;
  lastScorePercent: number | null;
};
