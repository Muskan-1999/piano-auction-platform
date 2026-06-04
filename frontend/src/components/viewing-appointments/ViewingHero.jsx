import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

export default function ViewingHero() {
  const { t } = useLanguage()
  return (
    <section className="bg-white py-16 px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-gray-900 leading-tight mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400 }}>
          {t('viewingAppts.heroTitle')}
        </h1>
        <nav className="text-xs text-gray-400 flex items-center justify-center gap-1.5 mb-8">
          <Link to="/" className="hover:text-gray-700 transition-colors">{t('viewingAppts.breadcrumbHome')}</Link>
          <span>›</span>
          <span className="text-gray-600">{t('viewingAppts.breadcrumbPage')}</span>
        </nav>
        <p className="text-gray-600 text-sm leading-relaxed mb-10 max-w-2xl mx-auto">{t('viewingAppts.heroBody')}</p>
        <div className="space-y-3 text-sm text-gray-700 text-center">
          <p><span className="font-semibold">{t('viewingAppts.euLabel')} </span>{t('viewingAppts.euValue')}</p>
          <p className="font-semibold">{t('viewingAppts.ukLabel')}</p>
        </div>
      </div>
    </section>
  )
}
