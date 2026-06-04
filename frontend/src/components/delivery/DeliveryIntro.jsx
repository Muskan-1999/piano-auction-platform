import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'

export default function DeliveryIntro({ onQuoteClick }) {
  const { t } = useLanguage()
  return (
    <section className="py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, lineHeight: 1.3 }}>
          {t('delivery.introTitle')}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto">{t('delivery.introBody')}</p>
        <button onClick={onQuoteClick}
          className="inline-block border border-gray-900 text-gray-900 text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-gray-900 hover:text-white transition-colors">
          {t('delivery.quoteBtn')}
        </button>
      </div>
    </section>
  )
}
