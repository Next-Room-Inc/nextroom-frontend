import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import JSON files directly
import enCommon from "./locales/en/common.json";
import enLogin from "./locales/en/login.json";
import frCommon from "./locales/fr/common.json";
import frLogin from "./locales/fr/login.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        login: enLogin,
      },
      fr: {
        common: frCommon,
        login: frLogin,
      },
    },
    fallbackLng: "en",
    ns: ["common", "login"], // namespaces
    defaultNS: "common", // default if not specified
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
