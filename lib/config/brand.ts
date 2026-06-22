/** Logo: add to GitHub repo, then set NEXT_PUBLIC_LOGO_URL to raw asset URL */
export const LOGO_URL =
  process.env.NEXT_PUBLIC_LOGO_URL ?? "/logo.svg";

export const BRAND = {
  name: "uriq.in",
  tagline: "Your IQ",
  fullTagline: "Your IQ. Measured. Mastered. Played.",
  audience: "Indian aspirants · Ages 13–60",
  passThreshold: 50,
} as const;
