import { ui, defaultLang } from "./ui";
import esData from "./locales/es.json";
import enData from "./locales/en.json";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    // Check in ui.ts first (for simple strings)
    const uiSection = ui[lang];
    if (key in uiSection) {
      return uiSection[key as keyof typeof uiSection];
    }

    // Check in JSON files (for complex content)
    const data = lang === "en" ? enData : esData;
    const keys = key.split(".");
    let result: any = data;

    for (const k of keys) {
      if (result && k in result) {
        result = result[k];
      } else {
        return key; // Fallback to key if not found
      }
    }

    return result;
  };
}
