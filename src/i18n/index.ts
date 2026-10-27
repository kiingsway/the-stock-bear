import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { Language } from '@/types'
import en from './locales/en'
import es from './locales/es'
import fr from './locales/fr'
import ko from './locales/ko'
import pt from './locales/pt'

export const defaultNS = 'translation'

export const resources = {
  en: { translation: en },
  pt: { translation: pt },
  fr: { translation: fr },
  es: { translation: es },
  ko: { translation: ko },
} as const satisfies Record<Language, unknown>

export type { Language }

/** Shown in their own language so anyone can find theirs. */
export const languageNames: Record<Language, string> = {
  en: 'English',
  pt: 'Português',
  fr: 'Français',
  es: 'Español',
  ko: '한국어',
}

export const languages = Object.keys(resources) as Language[]

export const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && value in resources

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    defaultNS,
    interpolation: { escapeValue: false },
  })
}

export default i18n
