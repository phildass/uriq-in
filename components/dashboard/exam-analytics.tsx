import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ExamMetric } from "@/lib/mock/dashboard";

const METRIC_MODULE: Record<string, string> = {
  numerical: "bg-module-math",
  di: "bg-module-verbal",
  logic: "bg-module-logic",
};

type ExamAnalyticsProps = {
  metrics: ExamMetric[];
  locked?: boolean;
};

export function ExamAnalytics({ metrics, locked = false }: ExamAnalyticsProps) {
  return (
    <Card className={locked ? "relative overflow-hidden" : undefined}>
      <CardHeader>
        <CardTitle>Exam aptitude mapping</CardTitle>
        <CardDescription>
          How your cognitive profile aligns with competitive exam sections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-base-text">{metric.label}</span>
              <span className="text-base-muted">{metric.score}%</span>
            </div>
            <Progress
              value={metric.score}
              indicatorClassName={METRIC_MODULE[metric.id] ?? "bg-module-logic"}
            />
            <p className="text-xs text-base-muted">{metric.targetExams.join(" · ")}</p>
          </div>
        ))}
        {locked ? (
          <div
            className="pointer-events-none absolute inset-0 bg-white/40 backdrop-blur-[2px]"
            aria-hidden
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
