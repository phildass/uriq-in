import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        /* 60% — neutral backgrounds */
        base: {
          bg: "#FAFAFA",
          text: "#0F172A",
          muted: "#64748B",
          border: "#E2E8F0",
          card: "#FFFFFF",
        },
        /* 30% — secondary surfaces */
        surface: {
          DEFAULT: "#F1F5F9",
          border: "#E2E8F0",
          muted: "#94A3B8",
        },
        /* 10% — accents (interactive only) */
        module: {
          logic: "#6366F1",
          "logic-soft": "#EEF2FF",
          math: "#10B981",
          "math-soft": "#ECFDF5",
          verbal: "#F59E0B",
          "verbal-soft": "#FFFBEB",
        },
        accent: {
          indigo: "#6366F1",
          blue: "#60A5FA",
          soft: "#EEF2FF",
        },
      },
      maxWidth: {
        mobile: "28rem",
      },
      boxShadow: {
        soft: "0 6px 30px -15px rgba(15, 23, 42, 0.12)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      padding: {
        "nav-safe": "5.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
