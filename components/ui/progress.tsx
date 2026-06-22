import { cn } from "@/lib/utils/cn";

export function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
      <div
        className="h-full rounded-full bg-indigo-500 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function BadgeChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700",
        className
      )}
    >
      {children}
    </span>
  );
}
