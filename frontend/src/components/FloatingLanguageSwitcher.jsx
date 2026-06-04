import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

function FlagNL({ className = 'w-6 h-4' }) {
  return (
    <svg viewBox="0 0 900 600" className={className} style={{ borderRadius: 2 }}>
      <rect width="900" height="200" y="0"   fill="#AE1C28" />
      <rect width="900" height="200" y="200" fill="#FFFFFF" />
      <rect width="900" height="200" y="400" fill="#21468B" />
    </svg>
  )
}

function FlagDE({ className = 'w-6 h-4' }) {
  return (
    <svg viewBox="0 0 5 3" className={className} style={{ borderRadius: 2 }}>
      <rect width="5" height="1" y="0" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  )
}

function FlagGB({ className = 'w-6 h-4' }) {
  return (
    <svg viewBox="0 0 60 30" className={className} style={{ borderRadius: 2 }}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff"     strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E"  strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60"     stroke="#fff"     strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60"     stroke="#C8102E"  strokeWidth="6" />
    </svg>
  )
}

const FLAG_MAP = { en: FlagGB, nl: FlagNL, de: FlagDE }

export default function FloatingLanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const others = languages.filter((l) => l.code !== language.code)
  const ActiveFlag = FLAG_MAP[language.code]

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Dropdown panel — opens upward */}
      {open && (
        <div className="mb-1 overflow-hidden rounded-xl border border-white/10 bg-black/90 backdrop-blur-md shadow-2xl">
          {others.map((lang) => {
            const Flag = FLAG_MAP[lang.code]
            return (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang); setOpen(false) }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
              >
                <Flag className="w-6 h-4 flex-shrink-0 shadow-sm" />
                <span className="font-medium">{lang.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Trigger button — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/90 backdrop-blur-md px-4 py-2.5 text-sm font-medium text-gray-100 shadow-2xl hover:bg-white/10 hover:text-white transition-all duration-200"
      >
        <ActiveFlag className="w-6 h-4 flex-shrink-0 shadow-sm" />
        <span className="tracking-wide">{language.short}</span>
        <svg
          className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}
