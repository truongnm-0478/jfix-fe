import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { getLanguageStorage } from "@/utils/storage";
import enTranslation from "../locales/en.json";
import jpTranslation from "../locales/jp.json";
import viTranslation from "../locales/vi.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ja: {
        translation: jpTranslation,
      },
      vi: {
        translation: viTranslation,
      },
    },
    lng: getLanguageStorage() ?? "vi",
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false,
    },
    ns: ["translation"],
    defaultNS: "translation",
  });

export default i18n;
