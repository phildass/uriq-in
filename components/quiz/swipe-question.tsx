"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SwipeQuestionProps = {
  children: ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
};

const SWIPE_THRESHOLD = 48;

export function SwipeQuestion({
  children,
  onSwipeLeft,
  onSwipeRight,
  className,
}: SwipeQuestionProps) {
  const startX = useRef<number | null>(null);

  return (
    <div
      className={cn("touch-pan-y", className)}
      onTouchStart={(e) => {
        startX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const endX = e.changedTouches[0]?.clientX ?? startX.current;
        const delta = endX - startX.current;
        startX.current = null;
        if (delta < -SWIPE_THRESHOLD) onSwipeLeft?.();
        if (delta > SWIPE_THRESHOLD) onSwipeRight?.();
      }}
    >
      {children}
    </div>
  );
}
