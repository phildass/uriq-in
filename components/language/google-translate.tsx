"use client";

import { useEffect } from "react";

/** All 22 scheduled Indian languages (Google Translate widget codes) */
export const GOOGLE_TRANSLATE_INCLUDED =
  "hi,bn,te,mr,ta,gu,kn,ml,pa,ur,or,as,sa,ks,sd,kok,mai,mni,ne,brx,doi,sat";

type GTranslateWindow = Window & {
  googleTranslateElementInit?: () => void;
  google?: {
    translate?: {
      TranslateElement: new (
        opts: { pageLanguage: string; includedLanguages?: string; autoDisplay?: boolean },
        id: string
      ) => void;
    };
  };
};

export function GoogleTranslateWidget({ elementId = "google_translate_element" }: { elementId?: string }) {
  useEffect(() => {
    const win = window as GTranslateWindow;

    win.googleTranslateElementInit = () => {
      if (document.getElementById(elementId) && win.google?.translate?.TranslateElement) {
        new win.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: GOOGLE_TRANSLATE_INCLUDED,
            autoDisplay: false,
          },
          elementId
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (win.google?.translate?.TranslateElement) {
      win.googleTranslateElementInit();
    }
  }, [elementId]);

  return <div id={elementId} className="shrink-0 notranslate" />;
}
