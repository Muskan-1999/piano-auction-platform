import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function HeroSection() {
  const videoRef = useRef(null)
  const { t } = useLanguage()

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay muted loop playsInline preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-auction.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.55)' }} />

      <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400"
          style={{ animation: 'fadeUp 0.7s ease both' }}>
          {t('hero.brandLabel')}
        </p>

        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          style={{ animation: 'fadeUp 0.9s ease 0.1s both' }}>
          {t('hero.headline')}
        </h1>

        <p className="mt-5 text-base font-medium text-gray-300 md:text-lg"
          style={{ animation: 'fadeUp 0.9s ease 0.2s both' }}>
          {t('hero.nextAuction')}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: 'fadeUp 0.9s ease 0.3s both' }}>
          <Link to="/auction-portal"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-8 py-3.5 text-sm font-bold text-black transition hover:bg-yellow-400">
            <span>🇬🇧</span> {t('hero.bidNow')}
          </Link>
          <Link to="/buying-piano"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
            {t('hero.viewCatalogue')}
          </Link>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animation: 'fadeUp 1s ease 0.5s both' }}>
          <div className="flex flex-col items-center gap-1.5 text-white/50">
            <span className="text-[10px] uppercase tracking-widest">{t('hero.scroll')}</span>
            <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
