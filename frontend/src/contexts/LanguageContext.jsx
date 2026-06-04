import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import translations from '../i18n/translations'

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'nl', label: 'Dutch',   short: 'NL' },
  { code: 'de', label: 'German',  short: 'DE' },
]

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('pa_language')
    return LANGUAGES.find((l) => l.code === saved) ?? LANGUAGES[0]
  })

  useEffect(() => {
    localStorage.setItem('pa_language', language.code)
    document.documentElement.lang = language.code
  }, [language])

  // t('nav.home') → looks up translations[langCode].nav.home
  const t = useCallback(
    (key) => {
      const parts = key.split('.')
      let val = translations[language.code]
      for (const part of parts) {
        val = val?.[part]
      }
      return val ?? key
    },
    [language.code],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages: LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
