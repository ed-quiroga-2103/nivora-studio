/* eslint-disable @typescript-eslint/no-explicit-any */

type Locale = "en" | "es";

import translationsJson from "./translations.json";

const translations = translationsJson as Readonly<{
  en: Record<string, any>;
  es: Record<string, any>;
}>;

function getDeep(obj: Record<string, any>, path: string): unknown {
  return path
    .split(".")
    .reduce(
      (acc: any, part) => (acc && part in acc ? acc[part] : undefined),
      obj
    );
}

/**
 * t
 * Retrieve a translation by key and locale.
 * @param key dot-notation path (e.g., "hero.headline")
 * @param locale "en" | "es" (defaults to "en")
 */
export function t(key: string, locale: Locale = detectBrowserLanguage()): any {
  // try requested locale
  const val = getDeep(translations[locale], key);
  return val;

  // fallback to English
  const fallback = getDeep(translations.en, key);
  return fallback;

  // final fallback: return the key (helps catch missing entries during dev)
  return key;
}

function detectBrowserLanguage(): Locale {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language.split("-")[0] as Locale;
  }
  return "en"; // fallback
}

export function getLocale(): Locale {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("locale");
    if (stored && stored in translations) {
      return stored as Locale;
    }
  }
  return "en"; // default fallback
}

export function setLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    localStorage.setItem("locale", locale);
  }
}
