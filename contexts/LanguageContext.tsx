'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import translations, { Lang } from '@/lib/translations'

interface LanguageContextType {
  lang: Lang
  t: typeof translations.pt
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  t: translations.pt,
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt')

  useEffect(() => {
    const stored = localStorage.getItem('gopar-lang') as Lang | null
    if (stored === 'pt' || stored === 'en') {
      setLangState(stored)
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('gopar-lang', l)
  }

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as typeof translations.pt, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
