import type { CSSProperties } from "react";

type ShapeCell = {
  id: string;
  fill?: string;
  border?: string;
  rotateDeg?: number;
};

type ShapeMatrixProps = {
  cells: ShapeCell[];
  columns?: number;
};

export function ShapeMatrix({ cells, columns = 3 }: ShapeMatrixProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {cells.map((cell) => {
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
