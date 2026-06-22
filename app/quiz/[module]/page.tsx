import { notFound } from "next/navigation";
import MobileShell from "@/components/layout/mobile-shell";
import { QuizEngine } from "@/components/quiz/quiz-engine";
import { getTestModule } from "@/lib/quiz/modules";

type Props = { params: Promise<{ module: string }> };

export default async function QuizModulePage({ params }: Props) {
  const { module: moduleId } = await params;
  const mod = getTestModule(moduleId);
  if (!mod) notFound();

  return (
    <MobileShell>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-slate-900">{mod.name}</h1>
        <p className="text-sm text-slate-500">{mod.description}</p>
      </div>
      <QuizEngine testId={mod.id} testName={mod.name} questions={mod.questions} />
    </MobileShell>
  );
}
