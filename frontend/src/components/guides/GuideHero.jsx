import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const WAREHOUSE_IMAGE = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=80'

export default function GuideHero() {
  const { t } = useLanguage()
  return (
    <section className="bg-white py-14 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex gap-4 lg:gap-5">
            <div className="w-[3px] bg-black self-stretch flex-shrink-0" />
            <div>
              <h1 className="text-black leading-tight mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 400, lineHeight: 1.2 }}>
                {t('guide.heroTitle')}
              </h1>
              <nav className="flex items-center gap-1 text-xs text-gray-500 mb-5">
                <Link to="/" className="hover:text-black transition-colors">{t('guide.breadcrumbHome')}</Link>
                <span className="text-gray-400 mx-0.5">&#187;</span>
                <span className="text-gray-600">{t('guide.breadcrumbPage')}</span>
              </nav>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {t('guide.heroP1')}{' '}
                <Link to="/buying-piano" className="text-black underline underline-offset-2 hover:text-gray-600 transition-colors">{t('guide.heroLink')}</Link>{' '}
                {t('guide.heroP1End')}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t('guide.heroP2')}{' '}
                <Link to="/buying-piano" className="text-black underline underline-offset-2 hover:text-gray-600 transition-colors">{t('guide.heroLink2')}</Link>
                {t('guide.heroP2End')}
              </p>
            </div>
          </div>

          <div className="w-full overflow-hidden">
            <img src={WAREHOUSE_IMAGE} alt="Piano auction warehouse" className="w-full h-64 sm:h-72 lg:h-80 object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
