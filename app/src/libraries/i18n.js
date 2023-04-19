import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationCS from "../translations/cs/translation.json"
import translationEN from "../translations/en/translation.json"
import translationSK from "../translations/sk/translation.json"

const resources = {
    cs: {
        translation: translationCS
    },
    en: {
        translation: translationEN
    },
    sk: {
        translation: translationSK
    }
}

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'cs',
    debug: true,
    detection: {
        order: ['queryString', 'cookie'],
        cache: ['cookie']
    },
    interpolation: {
    escapeValue: false
  }
})

export default i18n