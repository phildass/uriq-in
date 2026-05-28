export function TestSiteMarquee() {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[9999] bg-red-600 py-1.5 text-center text-xs font-semibold tracking-wide text-white"
      role="status"
      aria-live="polite"
    >
      WARNING: TEST SITE ONLY
    </div>
  );
}
