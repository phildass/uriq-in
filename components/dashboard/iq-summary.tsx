import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryBreakdown } from "@/lib/mock/dashboard";

type IqSummaryProps = {
  estimate: number;
  peerHighlight: string;
  categories: CategoryBreakdown[];
  locked?: boolean;
};

export function IqSummary({ estimate, peerHighlight, categories, locked = false }: IqSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>Baseline IQ estimate</CardTitle>
          <Badge>Preview</Badge>
        </div>
        <CardDescription>{peerHighlight}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <p className="text-4xl font-semibold tracking-tight text-base-text">{estimate}</p>
          <p className="mt-1 text-xs text-base-muted">Scaled estimate from your latest baseline</p>
          {locked ? (
            <div
              className="pointer-events-none absolute inset-0 rounded-lg backdrop-blur-sm"
              aria-hidden
            />
          ) : null}
        </div>
        <ul className="space-y-2">
          {categories.map((row) => (
            <li
              key={row.category}
              className="flex items-center justify-between rounded-lg border border-base-border bg-zinc-50 px-3 py-2 text-sm"
            >
              <span className="text-base-text">{row.category}</span>
              <span className="text-base-muted">Top {row.percentile}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
