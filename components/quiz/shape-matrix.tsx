import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/cn";

type ShapeCell = {
  id: string;
  fill?: string;
  border?: string;
  rotateDeg?: number;
};

type ShapeMatrixProps = {
  cells?: ShapeCell[];
  grid?: string[][];
  columns?: number;
};

export function ShapeMatrix({ cells, grid, columns = 3 }: ShapeMatrixProps) {
  if (grid?.length) {
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

  const shapeCells = cells ?? [];

  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {shapeCells.map((cell) => {
        const style: CSSProperties = {
          backgroundColor: cell.fill ?? "#FFFFFF",
          borderColor: cell.border ?? "#E4E4E7",
          transform: `rotate(${cell.rotateDeg ?? 0}deg)`,
        };

        return (
          <div
            key={cell.id}
            className="aspect-square rounded-lg border transition"
            style={style}
            aria-label={`shape-cell-${cell.id}`}
          />
        );
      })}
    </div>
  );
}
