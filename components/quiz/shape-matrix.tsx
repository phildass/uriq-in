import { cn } from "@/lib/utils/cn";

export function ShapeMatrix({ grid }: { grid: string[][] }) {
  return (
    <div className="my-3 overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {grid.map((row, ri) => (
        <div key={ri} className="grid grid-cols-3 border-b border-zinc-100 last:border-b-0">
          {row.map((cell, ci) => (
            <div
              key={ci}
              className={cn(
                "flex h-14 items-center justify-center border-r border-zinc-100 text-xl last:border-r-0",
                cell === "?" && "bg-indigo-50/60 font-semibold text-indigo-600"
              )}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
