import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import PianoCard from '../components/grand-pianos/PianoCard'
import { useLanguage } from '../contexts/LanguageContext'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'

function formatEst(lot) {
  const match = lot.title?.match(/Est\.\s*(£[\d,]+[-–]£[\d,]+(?:\s+Plus\s+VAT)?)/i)
  if (match) return match[1].trim()
  const fmt = (n) => Number(n).toLocaleString('en-GB')
  if (!lot.starting_bid) return ''
  if (!lot.reserve_price || Number(lot.starting_bid) === Number(lot.reserve_price)) {
    return `£${fmt(lot.starting_bid)}`
  }
  return `£${fmt(lot.starting_bid)}–£${fmt(lot.reserve_price)}`
}

function SkeletonCard() {
  return (
    <div className="border border-gray-100 bg-white animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-2 space-y-1.5">
        <div className="h-2.5 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}

export default function GrandPianosPage() {
  const { t } = useLanguage()
  const [pianos, setPianos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = 'Grand Pianos | Piano Auctions Ltd'

    api
      .get('public/lots', { params: { piano_type: 'grand', per_page: 100 } })
      .then((res) => {
        const lots = res.data?.data ?? []
        setPianos(
          lots.map((lot) => ({
            slug: lot.slug,
            name: lot.title,
            est: formatEst(lot),
            image: lot.featured_image || null,
          }))
        )
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full bg-white">
      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, minHeight: '380px' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div
          className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 py-16"
          style={{ minHeight: '380px' }}
        >
          <h1
            className="text-white mb-4"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400 }}
          >
            {t('grandPianos.heroTitle')}
          </h1>
          <p className="text-white/75 text-sm max-w-md leading-relaxed mb-5">
            {t('grandPianos.heroDesc')}
          </p>
          <nav className="text-xs text-white/55 flex items-center justify-center gap-1">
            <Link to="/" className="hover:text-white transition-colors">
              {t('grandPianos.breadcrumbHome')}
            </Link>
            <span className="mx-1">&rsaquo;</span>
            <span className="text-white/80">{t('grandPianos.breadcrumbPage')}</span>
          </nav>
        </div>
      </section>

      {/* ── Piano grid ── */}
      <section className="py-10 px-4 md:px-8 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">

          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {error && (
            <p className="text-center text-gray-500 text-sm py-12">
              Unable to load pianos. Please try again shortly.
            </p>
          )}

          {!loading && !error && pianos.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-12">
              No grand pianos are currently listed. Please check back soon.
            </p>
          )}

          {!loading && !error && pianos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {pianos.map((piano) => (
                <PianoCard key={piano.slug} piano={piano} category="grand" />
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  )
}
