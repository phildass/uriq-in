import MobileShell from "@/components/layout/mobile-shell";
import { IntelFeed } from "@/components/dashboard/intel-feed";
import { getDashboardData } from "@/lib/dashboard/get-dashboard";

export default async function LearnPage() {
  const data = await getDashboardData();

  return (
    <MobileShell>
      <header className="mb-4 space-y-1">
        <h1 className="text-2xl font-semibold text-base-text">Learn</h1>
        <p className="text-sm text-base-muted">
          Intel Intel — daily micro-stories on intelligence and reasoning
        </p>
      </header>
      <IntelFeed anecdotes={data.anecdotes} />
    </MobileShell>
  );
}
