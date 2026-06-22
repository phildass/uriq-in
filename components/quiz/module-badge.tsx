import { MODULES, type ModuleKey } from "@/lib/modules/colors";
import { cn } from "@/lib/utils/cn";

type ModuleBadgeProps = {
  module: ModuleKey;
  className?: string;
};

export function ModuleBadge({ module, className }: ModuleBadgeProps) {
  const meta = MODULES[module];
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
        meta.badgeClass,
        className
      )}
    >
      {meta.label}
    </span>
  );
}
