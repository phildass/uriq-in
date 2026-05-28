import MobileShell from "@/components/layout/mobile-shell";

export default function TermsPage() {
  return (
    <MobileShell>
      <article className="space-y-4 rounded-xl2 border border-surface-border bg-base-card p-4 shadow-soft">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold text-base-text">Terms and Conditions</h1>
          <p className="text-xs text-base-muted">Last updated: 28 May 2026</p>
        </header>

        <section className="space-y-2 text-sm leading-6 text-base-muted">
          <p>
            These Terms and Conditions govern your use of uriq.in for IQ practice, aptitude
            preparation, and related services. By accessing or using uriq.in, you agree to these
            terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Eligibility & Accounts</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-base-muted">
            <li>You must provide accurate account information and keep credentials secure.</li>
            <li>You are responsible for all activity under your account.</li>
            <li>Guest mode may store progress locally until you register.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Service Scope</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-base-muted">
            <li>Scores and analytics are educational indicators, not official certifications.</li>
            <li>We may update, suspend, or discontinue features with reasonable notice.</li>
            <li>Temporary downtime may occur for maintenance or security.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Payments & Subscriptions</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-base-muted">
            <li>Premium pricing, taxes (including GST where applicable), and billing terms apply.</li>
            <li>Payment processing is handled by third-party gateways.</li>
            <li>Refund handling follows applicable law and platform policy.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Acceptable Use</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm leading-6 text-base-muted">
            <li>No unlawful use, abuse, reverse engineering, scraping, or service disruption.</li>
            <li>No impersonation, fraudulent activity, or unauthorized data extraction.</li>
            <li>We may suspend or terminate accounts violating these terms.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Intellectual Property</h2>
          <p className="text-sm leading-6 text-base-muted">
            Platform content, branding, software, and question formats are owned by uriq.in or
            licensed to uriq.in and are protected by applicable laws.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Disclaimers & Liability</h2>
          <p className="text-sm leading-6 text-base-muted">
            The service is provided on an "as is" and "as available" basis. To the maximum extent
            permitted by applicable law, uriq.in disclaims implied warranties and limits liability
            for indirect or consequential losses.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Governing Law</h2>
          <p className="text-sm leading-6 text-base-muted">
            For users in India, these terms are governed by Indian law, with courts having
            jurisdiction as specified by uriq.in policies. International users remain subject to
            mandatory local consumer rights where applicable.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-base-text">Contact</h2>
          <p className="text-sm leading-6 text-base-muted">
            For legal requests, email: <span className="font-medium text-base-text">support@uriq.in</span>
          </p>
        </section>
      </article>
    </MobileShell>
  );
}
