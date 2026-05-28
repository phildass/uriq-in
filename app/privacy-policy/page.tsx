import MobileShell from "@/components/layout/mobile-shell";

export default function PrivacyPolicyPage() {
  return (
    <MobileShell>
      <article className="space-y-4 rounded-xl2 border border-surface-border bg-base-card p-4 shadow-soft">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-base-text">Privacy Policy</h1>
          <p className="text-xs text-base-muted">Last updated: 28 May 2026</p>
        </header>

        <section className="space-y-2 text-sm leading-6 text-base-muted">
          <p>
            This Privacy Policy explains how uriq.in collects, uses, stores, and shares personal
            data for users in India and international users. By using uriq.in, you agree to this
            policy.
          </p>
          <p>
            We process personal data in accordance with applicable law, including the Information
            Technology Act, 2000 and associated SPDI Rules in India, the Digital Personal Data
            Protection Act, 2023 (as applicable), and other local privacy laws where relevant.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Data We Collect</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-base-muted">
            <li>Account data: first name, last name, phone, email, encrypted password.</li>
            <li>Usage data: quiz responses, response time, scores, session events.</li>
            <li>Device/session data: browser and technical diagnostics for security and stability.</li>
            <li>Guest mode data: locally saved progress in your browser until account sync.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">How We Use Data</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-base-muted">
            <li>To provide quizzes, dashboards, account services, and performance insights.</li>
            <li>To improve question quality, platform reliability, and user support.</li>
            <li>To prevent fraud, abuse, and unauthorized access.</li>
            <li>To comply with legal obligations and enforce platform terms.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Legal Basis & International Transfers</h2>
          <p className="text-sm leading-6 text-base-muted">
            We process data based on consent, contract performance, legitimate interests, and legal
            compliance as applicable. Your data may be processed on infrastructure outside your
            country, subject to contractual and technical safeguards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Retention & Security</h2>
          <p className="text-sm leading-6 text-base-muted">
            We retain data only as long as needed for service delivery, legal compliance, dispute
            resolution, and security. We use reasonable administrative, technical, and
            organizational controls to protect personal data.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Your Rights</h2>
          <p className="text-sm leading-6 text-base-muted">
            Subject to local law, you may request access, correction, deletion, or portability of
            personal data, and may withdraw consent where applicable. You may also request closure
            of your account.
          </p>
        </section>

      </article>
    </MobileShell>
  );
}
