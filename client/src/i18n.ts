import i18n from "i18next";
import HttpBackend, { HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    backend: {
      // Translation files path
      loadPath: "/i18n/{{lng}}.json",
    },
    lng: localStorage.getItem("i18nextLng") || "en",
    // Logs in console
    debug: false,
    // You can have multiple namespaces, in case you want to divide a huge translation into smaller pieces and load them on demand
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
