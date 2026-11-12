import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../../public/locales/en/translation.json'
import { languages } from './languages'

const codes = languages.map((l) => l.code)

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en } }, // bundled: first paint never waits
    partialBundledLanguages: true,
    fallbackLng: 'en',
    supportedLngs: codes,
    nonExplicitSupportedLngs: true,
    load: 'currentOnly',
    interpolation: { escapeValue: false },
    backend: { loadPath: '/locales/{{lng}}/translation.json' },
    detection: { order: ['localStorage', 'navigator'], lookupLocalStorage: 'kelly-lang', caches: ['localStorage'] },
    returnEmptyString: false,
  })

export function applyLangAttrs(lng) {
  const l = languages.find((x) => x.code === lng) || languages[0]
  document.documentElement.lang = l.code
  document.documentElement.dir = l.dir
}
i18n.on('languageChanged', applyLangAttrs)
applyLangAttrs(i18n.resolvedLanguage || 'en')

export default i18n
