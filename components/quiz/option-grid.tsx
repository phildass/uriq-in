"use client";

import { MODULES, type ModuleKey } from "@/lib/modules/colors";
import { cn } from "@/lib/utils/cn";

type OptionGridProps = {
  module: ModuleKey;
  options: string[];
  selectedIndex: number | null;
  correctIndex: number | null;
  disabled?: boolean;
  onSelect: (index: number) => void;
};

export function OptionGrid({
  module,
  options,
  selectedIndex,
  correctIndex,
  disabled,
  onSelect,
}: OptionGridProps) {
  const meta = MODULES[module];

  return (
    <ul className="grid grid-cols-1 gap-2">
      {options.map((label, index) => {
        const isSelected = selectedIndex === index;
        const showResult = correctIndex !== null && selectedIndex !== null;
        const isCorrect = showResult && index === correctIndex;
        const isWrong = showResult && isSelected && index !== correctIndex;

        return (
          <li key={index}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(index)}
              className={cn(
                "tap-target w-full rounded-xl border border-surface-border bg-base-card px-4 py-3 text-left text-sm font-medium text-base-text transition",
                isSelected && !showResult && `ring-2 ${meta.ringClass} ring-offset-1`,
                isCorrect && "border-module-math bg-module-math-soft text-base-text",
                isWrong && "border-red-200 bg-red-50"
              )}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
