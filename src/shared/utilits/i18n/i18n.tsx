import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./en.json"
import ruLang from "./ru.json"

const resources = {
  ru: {
    translation: ruLang,
  },
  en: {
    translation: enLang,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;