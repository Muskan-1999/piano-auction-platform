import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { useLanguage } from '../contexts/LanguageContext'

const HERO_IMG = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'


const STATIC_BRANDS = [
  { id: 'yamaha',      name: 'Yamaha' },
  { id: 'steingraeber', name: 'Steingraeber' },
  { id: 'schimmel',   name: 'Schimmel Pianos' },
  { id: 'kawai',      name: 'Kawai' },
  { id: 'petrof',     name: 'Petrof' },
  { id: 'steinway',   name: 'Steinway & Sons' },
  { id: 'sauter',     name: 'Sauter' },
]

function BrandCard({ brand }) {
  const [imgError, setImgError] = useState(false)
  const hasLogo = brand.icon_url && !imgError

  return (
    <div className="bg-white border border-gray-300 flex items-center justify-center p-10 h-40 hover:shadow-md transition-shadow duration-300 cursor-pointer">
      {hasLogo ? (
        <img
          src={brand.icon_url}
          alt={brand.name}
          onError={() => setImgError(true)}
          className="max-h-16 max-w-full object-contain"
        />
      ) : (
        <span
          className="text-xl text-gray-800 text-center"
          style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
        >
          {brand.name}
        </span>
      )}
    </div>
  )
}

export default function PianoBrandsPage() {
  const { t } = useLanguage()
  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Piano Brands | Piano Auctions Ltd'
    api.get('piano-brands')
      .then(res => setBrands(Array.isArray(res.data) ? res.data : []))
      .catch(() => setBrands([]))
      .finally(() => setLoading(false))
  }, [])

  const displayBrands = brands.length > 0 ? brands : STATIC_BRANDS

  return (
    <div className="w-full bg-white">

      {/* ── HERO ── */}
      <section
        className="relative min-h-[380px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-6 py-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-5">{t('pianoBrands.pageLabel')}</p>
          <h1 className="text-white mb-6" style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.2rem, 5vw, 3rem)' }}>
            {t('pianoBrands.heroTitle')}
          </h1>
          <nav className="text-sm text-white/70">
            <Link to="/" className="hover:text-white transition-colors">{t('pianoBrands.breadcrumbHome')}</Link>
            <span className="mx-2">»</span>
            <span className="text-white/90">{t('pianoBrands.breadcrumbPage')}</span>
          </nav>
        </div>
      </section>

      {/* ── OUR PIANO BRANDS ── */}
      <section className="py-16 px-6 bg-white text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="text-gray-900 mb-5" style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.7rem, 3vw, 2.2rem)' }}>
            {t('pianoBrands.brandsLabel')}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">{t('pianoBrands.brandsBody')}</p>
          {/* Decorative divider */}
          <div className="flex justify-center mt-8">
            <div className="w-px bg-gray-400" style={{ height: '48px' }} />
          </div>
        </div>
      </section>

      {/* ── BRAND GRID ── */}
      <section className="pb-16 px-6 lg:px-12" style={{ backgroundColor: '#eeebe8' }}>
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-300 h-40 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
