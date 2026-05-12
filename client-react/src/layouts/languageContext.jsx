import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

const DEFAULT_LANG = 'en'
const STORAGE_KEY = 'app_lang'

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  console.log('Current language:', context) // Debug log to verify the current language
  return context
}