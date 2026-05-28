export type ModuleKey = "logic" | "math" | "verbal";

export type ModuleMeta = {
  key: ModuleKey;
  label: string;
  accent: string;
  accentSoft: string;
  progressClass: string;
  ringClass: string;
  badgeClass: string;
};

/** Colour-coded exam modules — accent only on interactive UI */
export const MODULES: Record<ModuleKey, ModuleMeta> = {
  logic: {
    key: "logic",
    label: "Logical Reasoning",
    accent: "bg-module-logic",
    accentSoft: "bg-module-logic-soft",
    progressClass: "bg-module-logic",
    ringClass: "ring-module-logic",
    badgeClass: "text-module-logic bg-module-logic-soft border-module-logic/20",
  },
  math: {
    key: "math",
    label: "Numerical / Math",
    accent: "bg-module-math",
    accentSoft: "bg-module-math-soft",
    progressClass: "bg-module-math",
    ringClass: "ring-module-math",
    badgeClass: "text-module-math bg-module-math-soft border-module-math/20",
  },
  verbal: {
    key: "verbal",
    label: "Verbal / Language",
    accent: "bg-module-verbal",
    accentSoft: "bg-module-verbal-soft",
    progressClass: "bg-module-verbal",
    ringClass: "ring-module-verbal",
    badgeClass: "text-module-verbal bg-module-verbal-soft border-module-verbal/20",
  },
};

export function categoryToModule(
  category: "Logic" | "Spatial" | "Quantitative" | "Verbal"
): ModuleKey {
  if (category === "Quantitative") return "math";
  if (category === "Verbal") return "verbal";
  return "logic";
}
