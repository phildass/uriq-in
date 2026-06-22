import MobileShell from "@/components/layout/mobile-shell";

export default function QuizPage() {
  return (
    <MobileShell>
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold">Quiz Hub</h1>
        <p className="text-sm text-base-muted">
          Choose baseline or premium modules to continue.
        </p>
      </section>
    </MobileShell>
  );
}
