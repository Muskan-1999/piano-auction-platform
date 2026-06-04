import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

export default function AuctionHero() {
  const { t } = useLanguage()
  return (
    <section className="relative flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80)', minHeight: 'clamp(350px, 40vw, 500px)' }}>
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 py-16" style={{ minHeight: 'clamp(350px, 40vw, 500px)' }}>
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3">{t('auctionCalendar.pageLabel')}</p>
        <h1 className="text-white leading-tight mb-4" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400 }}>
          {t('auctionCalendar.heroTitle')}
        </h1>
        <nav className="text-xs text-white/60 flex items-center justify-center gap-1 mt-2">
          <Link to="/" className="hover:text-white transition-colors">{t('auctionCalendar.breadcrumbHome')}</Link>
          <span className="mx-1">»</span>
          <span className="text-white/80">{t('auctionCalendar.breadcrumbPage')}</span>
        </nav>
      </div>
    </section>
  )
}
