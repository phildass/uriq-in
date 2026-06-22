"use client";

import { INDIAN_LANGUAGES } from "@/lib/i18n/languages";
import { useLanguage } from "@/components/providers/language-provider";
import { Languages } from "lucide-react";

export function LanguagePicker() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <label className="flex items-center gap-2 text-xs text-slate-500">
      <Languages className="h-3.5 w-3.5 shrink-0" aria-hidden />
      <span className="sr-only">{t("language")}</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-slate-700 outline-none focus:border-indigo-300"
        aria-label={t("language")}
      >
        {INDIAN_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
    </label>
  );
}
