import MobileShell from "@/components/layout/mobile-shell";

export default function LoginPage() {
  return (
    <MobileShell>
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-base-muted">
          Login flow will be connected to Supabase auth in Step 5.
        </p>
      </section>
    </MobileShell>
  );
}
