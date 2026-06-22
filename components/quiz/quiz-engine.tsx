"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "@/lib/quiz/modules";
import { ShapeMatrix } from "@/components/quiz/shape-matrix";
import { ProgressBar } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import {
  awardBadgesFromResult,
  isPass,
  loadProgress,
  saveProgress,
  type TestResult,
} from "@/lib/badges";
import { MOCK_PEER_TIMES_MS, percentileRank, topPercentileLabel } from "@/lib/utils/benchmark";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

type QuizEngineProps = {
  testId: string;
  testName: string;
  questions: Question[];
};

export function QuizEngine({ testId, testName, questions }: QuizEngineProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [startedAt] = useState(Date.now());
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [benchmark, setBenchmark] = useState<string | null>(null);
  const [newBadges, setNewBadges] = useState<string[]>([]);

  const q = questions[index];
  const total = questions.length;

  useEffect(() => {
    if (!finished || !result) return;
    const before = loadProgress();
    const peerAvg = MOCK_PEER_TIMES_MS.reduce((a, b) => a + b, 0) / MOCK_PEER_TIMES_MS.length;
    const after = awardBadgesFromResult(before, result, peerAvg);
    saveProgress(after);

    const beforeIds = new Set(before.badges.map((b) => b.badgeId));
    setNewBadges(after.badges.filter((b) => !beforeIds.has(b.badgeId)).map((b) => b.badgeId));

    const pct = percentileRank(result.timeTakenMs, MOCK_PEER_TIMES_MS);
    setBenchmark(topPercentileLabel(pct));
  }, [finished, result]);

  function handleNext() {
    if (selected === null) return;
    const isCorrect = selected === q.correctIndex;
    const nextCorrect = correctCount + (isCorrect ? 1 : 0);

    if (index + 1 >= total) {
      const scorePercent = Math.round((nextCorrect / total) * 100);
      const timeTakenMs = Date.now() - startedAt;
      const testResult: TestResult = {
        testId,
        scorePercent,
        passed: isPass(scorePercent),
        timeTakenMs,
        completedAt: new Date().toISOString(),
      };
      setCorrectCount(nextCorrect);
      setResult(testResult);
      setFinished(true);
      return;
    }

    setCorrectCount(nextCorrect);
    setIndex((i) => i + 1);
    setSelected(null);
  }

  if (finished && result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500">{testName}</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            {result.passed ? t("passed") : t("failed")}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {t("score")}: <strong>{result.scorePercent}%</strong> · Pass mark: 50%
          </p>
          {benchmark && (
            <p className="mt-3 rounded-xl bg-indigo-50 px-3 py-2 text-xs leading-5 text-indigo-800">
              {benchmark}
            </p>
          )}
          {newBadges.length > 0 && (
            <p className="mt-3 text-sm text-emerald-700">
              🏅 {newBadges.length} new badge{newBadges.length > 1 ? "s" : ""} unlocked!
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2">
          {result.passed ? (
            <Link href="/dashboard">
              <Button className="w-full">{t("dashboard")}</Button>
            </Link>
          ) : (
            <Button className="w-full" onClick={() => window.location.reload()}>
              {t("playAgain")}
            </Button>
          )}
          <Link href="/badges">
            <Button variant="outline" className="w-full">
              {t("viewBadges")}
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Q{index + 1}/{total}
          </span>
          <span>{q.category}</span>
        </div>
        <ProgressBar value={index + 1} max={total} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2 }}
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm leading-7 text-slate-800">{q.prompt}</p>
          {q.matrix && <ShapeMatrix grid={q.matrix} />}

          <div className="mt-4 grid grid-cols-1 gap-2">
            {q.options.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSelected(i)}
                className={cn(
                  "rounded-xl border px-3 py-3 text-left text-sm transition-colors",
                  selected === i
                    ? "border-indigo-400 bg-indigo-50 text-indigo-900"
                    : "border-zinc-200 bg-zinc-50 text-slate-800 hover:border-zinc-300"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <Button className="w-full" disabled={selected === null} onClick={handleNext}>
        {index + 1 >= total ? "Finish" : "Next"}
      </Button>

      <p className="text-center text-[11px] text-slate-400">{t("passRule")}</p>
    </div>
  );
}
