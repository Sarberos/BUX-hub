import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./en.json"
import ruLang from "./ru.json"
import geLang from "./ge.json"
import frLang from "./fr.json"

const resources = {
  ru: {
    translation: ruLang,
  },
  en: {
    translation: enLang,
  },
  ge: {
    translation: geLang,
  },
  fr: {
    translation: frLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "ru",
    lng: "ru",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;