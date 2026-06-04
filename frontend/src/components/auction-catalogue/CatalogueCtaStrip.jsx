import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

export default function CatalogueCtaStrip() {
  const { t } = useLanguage()
  return (
    <section className="w-full bg-gray-900 py-10 px-6">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/past-auctions" className="inline-flex items-center gap-2 px-7 py-3 border border-white text-white text-sm font-medium tracking-wide hover:bg-white hover:text-gray-900 transition-colors">
          {t('catalogue.ctaPastBtn')}
        </Link>
        <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-900 text-sm font-medium tracking-wide hover:bg-gray-100 transition-colors">
          {t('catalogue.ctaContactBtn')}
        </Link>
      </div>
    </section>
  )
}
