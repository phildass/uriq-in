import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { DailyAnecdote } from "@/lib/mock/dashboard";

type IntelFeedProps = {
  anecdotes: DailyAnecdote[];
};

export function IntelFeed({ anecdotes }: IntelFeedProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Intel Intel</CardTitle>
        <CardDescription>Daily micro-stories on intelligence and reasoning</CardDescription>
      </CardHeader>
      <CardContent className="space-y-0">
        {anecdotes.map((item, index) => (
          <div key={item.id}>
            {index > 0 ? <Separator className="my-4" /> : null}
            <article className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-medium text-base-text">{item.title}</h4>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              <p className="text-sm leading-6 text-base-muted">{item.content_body}</p>
              <p className="text-xs text-base-muted">{item.published_date}</p>
            </article>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
