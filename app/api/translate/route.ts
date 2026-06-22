import { NextRequest, NextResponse } from "next/server";

/**
 * Google Cloud Translation API proxy.
 * Set GOOGLE_TRANSLATE_API_KEY in .env.local to enable live translation.
 */
export async function POST(req: NextRequest) {
  const { texts, targetLanguage } = (await req.json()) as {
    texts: string[];
    targetLanguage: string;
  };

  if (!texts?.length || !targetLanguage || targetLanguage === "en") {
    return NextResponse.json({ translations: texts });
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) {
    // Fallback: return English until API key is configured
    return NextResponse.json({ translations: texts, fallback: true });
  }

  try {
    const res = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: texts, target: targetLanguage, format: "text" }),
      }
    );
    const data = await res.json();
    const translations =
      data?.data?.translations?.map((t: { translatedText: string }) => t.translatedText) ?? texts;
    return NextResponse.json({ translations });
  } catch {
    return NextResponse.json({ translations: texts, fallback: true });
  }
}
