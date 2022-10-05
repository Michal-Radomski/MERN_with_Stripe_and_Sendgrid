import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // Translation files path
      loadPath: "/i18n/{{lng}}.json",
    },
    fallbackLng: "en",
    // Logs in console
    debug: false,
    // You can have multiple namespaces, in case you want to divide a huge translation into smaller pieces and load them on demand
    interpolation: {
      espaceValue: false,
      formatSeparator: ",",
    },
    react: {
      useSuspense: true,
    },
  } as any);

export default i18n;
