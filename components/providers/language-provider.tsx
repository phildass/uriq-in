"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_LANGUAGE } from "@/lib/i18n/languages";
import { STRINGS, type StringKey } from "@/lib/i18n/strings";

type LanguageContextValue = {
  language: string;
  setLanguage: (code: string) => void;
  t: (key: StringKey) => string;
  isTranslating: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const COOKIE_KEY = "uriq_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE_KEY}=`))
      ?.split("=")[1];
    if (saved) setLanguageState(saved);
  }, []);

  useEffect(() => {
    if (language === "en") {
      setTranslations({});
      return;
    }

    const keys = Object.keys(STRINGS) as StringKey[];
    const texts = keys.map((k) => STRINGS[k]);

    setIsTranslating(true);
    fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts, targetLanguage: language }),
    })
      .then((r) => r.json())
      .then((data: { translations?: string[] }) => {
        if (data.translations) {
          const map: Record<string, string> = {};
          keys.forEach((k, i) => {
            map[k] = data.translations?.[i] ?? STRINGS[k];
          });
          setTranslations(map);
        }
      })
      .catch(() => setTranslations({}))
      .finally(() => setIsTranslating(false));
  }, [language]);

  const setLanguage = useCallback((code: string) => {
    setLanguageState(code);
    document.cookie = `${COOKIE_KEY}=${code}; path=/; max-age=31536000`;
  }, []);

  const t = useCallback(
    (key: StringKey) => translations[key] ?? STRINGS[key],
    [translations]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t, isTranslating }),
    [language, setLanguage, t, isTranslating]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
