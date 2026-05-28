"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SignupModal } from "@/components/guest/signup-modal";
import { ModuleBadge } from "@/components/quiz/module-badge";
import { OptionGrid } from "@/components/quiz/option-grid";
import { SwipeQuestion } from "@/components/quiz/swipe-question";
import { Progress } from "@/components/ui/progress";
import {
  completeGuestSession,
  getOrCreateGuestProfile,
  recordGuestAnswer,
  startGuestSession,
} from "@/lib/guest/storage";
import type { GuestSession } from "@/lib/guest/types";
import { MODULES } from "@/lib/modules/colors";
import { QUICK_TEST_QUESTIONS, type QuickQuestion } from "@/lib/mock/quick-test";

const AUTO_ADVANCE_MS = 500;

function triggerHaptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(12);
  }
}

export function QuickTestFlow() {
  const [questions, setQuestions] = useState<QuickQuestion[]>(QUICK_TEST_QUESTIONS);
  const [source, setSource] = useState<"mock" | "questions_pool">("mock");
  const [index, setIndex] = useState(0);
  const [session, setSession] = useState<GuestSession | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [scorePercent, setScorePercent] = useState(0);
  const [showSignup, setShowSignup] = useState(false);
  const [questionStartedAt, setQuestionStartedAt] = useState(() => Date.now());
  const sessionRef = useRef<GuestSession | null>(null);

  useEffect(() => {
    let active = true;

    const loadQuestions = async () => {
      try {
        const res = await fetch("/api/quiz/quick", { cache: "no-store" });
        if (!res.ok) return;
        const payload = (await res.json()) as {
          questions?: QuickQuestion[];
          source?: "mock" | "questions_pool";
        };
        if (!active || !payload.questions?.length) return;
        setQuestions(payload.questions.slice(0, 5));
        setSource(payload.source ?? "mock");
      } catch {
        // keep fallback mock questions
      }
    };

    void loadQuestions();
    return () => {
      active = false;
    };
  }, []);

  const question: QuickQuestion = questions[index] ?? questions[0];
  const moduleMeta = MODULES[question.module];
  const progress = ((index + (revealed ? 1 : 0)) / questions.length) * 100;

  const correctCount = useMemo(
    () => (session?.answers.filter((a) => a.isCorrect).length ?? 0),
    [session]
  );

  const handleSelect = (optionIndex: number) => {
    if (revealed || finished) return;
    setSelectedIndex(optionIndex);
    setRevealed(true);

    const isCorrect = optionIndex === question.correctIndex;
    if (isCorrect) triggerHaptic();

    const timeTakenMs = Date.now() - questionStartedAt;
    const activeSession = session ?? startGuestSession();
    const updated = recordGuestAnswer(activeSession, {
      questionId: question.id,
      module: question.module,
      isCorrect,
      timeTakenMs,
      answeredAt: new Date().toISOString(),
    });
    sessionRef.current = updated;
    setSession(updated);
  };

  const goNext = useCallback(() => {
    if (!revealed) return;

    if (index >= questions.length - 1) {
      const profile = getOrCreateGuestProfile();
      const finalSession = sessionRef.current ?? session ?? startGuestSession();
      const completed = completeGuestSession(profile, finalSession);
      const pct =
        completed.lastScorePercent ??
        Math.round(
          (finalSession.answers.filter((a) => a.isCorrect).length / questions.length) * 100
        );
      setScorePercent(pct);
      setFinished(true);
      setShowSignup(true);
      return;
    }

    setIndex((i) => i + 1);
    setSelectedIndex(null);
    setRevealed(false);
    setQuestionStartedAt(Date.now());
  }, [index, questions.length, revealed, session]);

  useEffect(() => {
    if (selectedIndex === null || !revealed || finished) return;

    const timer = window.setTimeout(() => {
      goNext();
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [selectedIndex, revealed, finished, goNext]);

  if (finished) {
    return (
      <>
        <section className="space-y-4 rounded-xl2 border border-surface-border bg-base-card p-5 shadow-soft">
          <h2 className="text-2xl font-semibold text-base-text">Quick test complete</h2>
          <p className="text-sm text-base-muted">
            You scored <span className="font-semibold text-base-text">{scorePercent}%</span>{" "}
            ({correctCount}/{questions.length} correct). Progress saved on this device.
          </p>
          <button
            type="button"
            className="w-full rounded-xl bg-module-logic px-4 py-3 text-sm font-semibold text-white"
            onClick={() => setShowSignup(true)}
          >
            Save & unlock full analytics
          </button>
        </section>
        <SignupModal open={showSignup} onOpenChange={setShowSignup} scorePercent={scorePercent} />
      </>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-base-muted">
          <span>
            Question {index + 1} / {questions.length}
          </span>
          <span>Streak {session?.streak ?? 0}</span>
        </div>
        <Progress value={progress} indicatorClassName={moduleMeta.progressClass} />
        <ModuleBadge module={question.module} />

        <SwipeQuestion>
          <div className="rounded-xl2 border border-surface-border bg-base-card p-4 shadow-soft">
            <p className="text-base font-medium leading-relaxed text-base-text">{question.prompt}</p>
          </div>
        </SwipeQuestion>

        <OptionGrid
          module={question.module}
          options={question.options}
          selectedIndex={selectedIndex}
          correctIndex={revealed ? question.correctIndex : null}
          disabled={revealed}
          onSelect={handleSelect}
        />

        <p className="text-center text-xs text-base-muted">
          Tap an answer — next question loads in {AUTO_ADVANCE_MS / 1000}s
        </p>
        <p className="text-center text-[10px] uppercase tracking-wide text-base-muted">
          source: {source}
        </p>
      </div>

      <SignupModal open={showSignup} onOpenChange={setShowSignup} scorePercent={scorePercent} />
    </>
  );
}
