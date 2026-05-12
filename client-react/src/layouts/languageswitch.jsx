import { useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageContext'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ru', label: 'Русский' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef(null)

  const { lang, setLang } = useLanguage() // 🔑 this replaces local state

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const current =
    LANGUAGES.find(language => language.code === lang) || LANGUAGES[0]

  function handleSelect(code) {
    console.log('clicked:', code)
    setLang(code) // 🔑 global update
    
    setIsOpen(false)
  }

  return (
    <div className="lang-switcher" ref={rootRef}>
      <button
        className="lang-switcher__trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Select language"
        onClick={() => setIsOpen(open => !open)}
      >
        <span className="lang-switcher__current">
          {current.code.toUpperCase()}
        </span>
        <span className="lang-switcher__chevron" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          className="lang-switcher__menu"
          role="menu"
          aria-label="Language options"
        >
          {LANGUAGES.map(language => (
            <button
              key={language.code}
              className={`lang-switcher__option ${
                language.code === lang ? 'is-active' : ''
              }`}
              type="button"
              role="menuitem"
              onClick={() => handleSelect(language.code)}
            >
              <span className="lang-switcher__option-code">
                {language.code.toUpperCase()}
              </span>
              <span className="lang-switcher__option-label">
                {language.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}