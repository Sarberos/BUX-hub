import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./en.json"
import ruLang from "./ru.json"
import geLang from "./ge.json"
import frLang from "./fr.json"

const resources = {
  RU: {
    translation: ruLang,
  },
  EN: {
    translation: enLang,
  },
  DE: {
    translation: geLang,
  },
  FR: {
    translation: frLang,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "EN",
    lng: 'EN',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;