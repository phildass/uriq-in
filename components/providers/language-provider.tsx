"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { STRINGS, type StringKey } from "@/lib/i18n/strings";

type LanguageContextValue = {
  t: (key: StringKey) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** UI strings stay in English; page translation uses free Google Translate widget. */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = useCallback((key: StringKey) => STRINGS[key], []);

  const value = useMemo(() => ({ t }), [t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
