import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function CompanyHistory() {
  const { t } = useLanguage()
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-4">
          {t('about.historyLabel')}
        </p>
        <h2 className="text-gray-900 mb-8"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 400 }}>
          {t('about.historyTitle')}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{t('about.history1')}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{t('about.history2')}</p>
      </div>
    </section>
  )
}
