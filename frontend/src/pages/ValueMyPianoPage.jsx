import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import ValuationModal from '../components/value-piano/ValuationModal'
import { useLanguage } from '../contexts/LanguageContext'

const IMG = {
  hero:      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80',
  formal:    'https://images.unsplash.com/photo-1552422535-c45813c61732?w=900&q=80',
  auctions:  'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=900&q=80',
  about:     'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=900&q=80',
}

// ── Hero personal-details card ────────────────────────────────────────────────

const inputCls =
  'w-full border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-700 transition-colors'

function HeroCard({ onSubmit }) {
  const { t } = useLanguage()
  const [form, setForm]     = useState({ first_name: '', last_name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.first_name.trim())  e.first_name = 'Required'
    if (!form.last_name.trim())   e.last_name  = 'Required'
    if (!form.email.trim())       e.email      = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim())       e.phone      = 'Required'
    return e
  }

  const submit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm bg-white shadow-2xl p-7 flex-shrink-0">
      <h2 className="text-base text-gray-900 mb-1" style={{ fontFamily: 'Georgia, serif', fontWeight: 400, color: '#b89c6a' }}>
        {t('valuePiano.formTitle')}
      </h2>
      <div className="w-8 h-px bg-amber-600 mb-5" />

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t('valuePiano.firstName')} <span className="text-red-400">*</span></label>
          <input type="text" name="first_name" value={form.first_name} onChange={handle} placeholder={t('valuePiano.firstName')} className={inputCls} />
          {errors.first_name && <p className="text-xs text-red-500 mt-0.5">{errors.first_name}</p>}
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">{t('valuePiano.lastName')} <span className="text-red-400">*</span></label>
          <input type="text" name="last_name" value={form.last_name} onChange={handle} placeholder={t('valuePiano.lastName')} className={inputCls} />
          {errors.last_name && <p className="text-xs text-red-500 mt-0.5">{errors.last_name}</p>}
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs text-gray-500 mb-1">{t('valuePiano.email')} <span className="text-red-400">*</span></label>
        <input type="email" name="email" value={form.email} onChange={handle} placeholder={t('valuePiano.email')} className={inputCls} />
        {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
      </div>

      <div className="mb-5">
        <label className="block text-xs text-gray-500 mb-1">{t('valuePiano.phone')} <span className="text-red-400">*</span></label>
        <input type="tel" name="phone" value={form.phone} onChange={handle} placeholder={t('valuePiano.phone')} className={inputCls} />
        {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
      </div>

      <button type="submit" className="w-full bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 hover:bg-gray-800 transition-colors">
        {t('valuePiano.nextBtn')}
      </button>
    </form>
  )
}

// ── Brand carousel ────────────────────────────────────────────────────────────

const FALLBACK_BRANDS = [
  { id: 1, name: 'FAZIOLI',       icon_url: '' },
  { id: 2, name: 'Essex',         icon_url: '' },
  { id: 3, name: 'Boston',        icon_url: '' },
  { id: 4, name: 'Bösendorfer',   icon_url: '' },
  { id: 5, name: 'Blüthner',      icon_url: '' },
  { id: 6, name: 'Steinway',      icon_url: '' },
  { id: 7, name: 'Yamaha',        icon_url: '' },
  { id: 8, name: 'Kawai',         icon_url: '' },
  { id: 9, name: 'Bechstein',     icon_url: '' },
  { id: 10, name: 'Petrof',       icon_url: '' },
  { id: 11, name: 'Schimmel',     icon_url: '' },
]

function BrandItem({ brand }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="flex flex-col items-center gap-2 min-w-[140px] px-6">
      {!imgError && brand.icon_url ? (
        <img
          src={brand.icon_url} alt={brand.name}
          onError={() => setImgError(true)}
          className="grayscale hover:grayscale-0 transition-all duration-300"
          style={{ height: '48px', width: 'auto', maxWidth: '120px', objectFit: 'contain' }}
        />
      ) : (
        <span
          className="text-sm font-semibold text-gray-700 flex items-center justify-center hover:text-amber-600 transition-colors cursor-default"
          style={{ height: '48px', fontFamily: 'Georgia, serif', letterSpacing: '0.05em' }}
        >
          {brand.name}
        </span>
      )}
    </div>
  )
}

function BrandsCarousel({ brands }) {
  const list     = brands.length ? brands : FALLBACK_BRANDS
  const doubled  = [...list, ...list]
  const duration = Math.max(list.length * 3, 20)
  return (
    <>
      <style>{`
        @keyframes vmpBrandScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .vmp-ticker { animation: vmpBrandScroll ${duration}s linear infinite; display:flex; width:max-content; }
        .vmp-ticker-wrap:hover .vmp-ticker { animation-play-state:paused; }
      `}</style>
      <div className="vmp-ticker-wrap overflow-hidden py-4">
        <div className="vmp-ticker">
          {doubled.map((b, i) => <BrandItem key={`${b.id}-${i}`} brand={b} />)}
        </div>
      </div>
    </>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ValueMyPianoPage() {
  const { t } = useLanguage()
  const [modalOpen, setModalOpen]       = useState(false)
  const [personalData, setPersonalData] = useState({})
  const [brands, setBrands]             = useState([])
  const [heroKey, setHeroKey]           = useState(0)

  useEffect(() => {
    api.get('piano-brands').then((r) => setBrands(r.data)).catch(() => setBrands([]))
  }, [])

  const openModal = (personal) => {
    setPersonalData(personal)
    setModalOpen(true)
  }

  return (
    <div className="w-full bg-white">

      {/* ── HERO ── */}
      <section
        className="relative flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.hero})`, minHeight: '650px' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 py-20">

          {/* Left text */}
          <div className="flex-1 max-w-lg">
            <nav className="mb-4 text-xs text-white/60">
              <Link to="/" className="hover:text-white transition-colors">{t('valuePiano.breadcrumbHome')}</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white/80">{t('valuePiano.breadcrumbPage')}</span>
            </nav>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-3">{t('valuePiano.pageLabel')}</p>
            <h1 className="text-white leading-tight mb-5" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 400 }}>
              {t('valuePiano.heroTitle')}
            </h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              {t('valuePiano.heroDesc')}{' '}
              <Link to="/sell-my-piano" className="underline text-white/90 hover:text-white">{t('valuePiano.heroDescLink')}</Link>
              {t('valuePiano.heroDescEnd')}
            </p>
          </div>

          {/* Right form card */}
          <HeroCard key={heroKey} onSubmit={openModal} />
        </div>
      </section>

      {/* ── SECTION 1: Formal Written Piano Valuation ── */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left content */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-1 bg-black flex-shrink-0 self-stretch" style={{ minHeight: '80px' }} />
              <div>
                <h2 className="text-gray-900 leading-snug" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400 }}>
                  {t('valuePiano.section1Title')}
                </h2>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-4">{t('valuePiano.section1P')}</p>

            <ul className="text-gray-600 text-sm leading-loose mb-4 list-disc list-inside space-y-1">
              {t('valuePiano.valuationUses').map((item) => <li key={item}>{item}</li>)}
            </ul>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {t('valuePiano.section1P2')}
            </p>

            <Link to="/contact" className="inline-block border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-black hover:text-white transition-colors">
              {t('valuePiano.contactUsBtn')}
            </Link>
          </div>

          {/* Right image */}
          <div className="overflow-hidden">
            <img src={IMG.formal} alt="Piano valuation" className="w-full h-[400px] object-cover" />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: View Our Past Piano Auctions ── */}
      <section className="py-0" style={{ backgroundColor: '#f5ede6' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

          {/* Left image */}
          <div className="overflow-hidden">
            <img src={IMG.auctions} alt="Past piano auctions" className="w-full h-full object-cover" style={{ minHeight: '380px' }} />
          </div>

          {/* Right dark content */}
          <div className="bg-black flex flex-col justify-center px-12 py-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">{t('valuePiano.pastAuctionsLabel')}</p>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-1 bg-amber-500 flex-shrink-0 self-stretch" style={{ minHeight: '60px' }} />
              <h2 className="text-white leading-snug" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400 }}>
                {t('valuePiano.pastAuctionsTitle')}
              </h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-sm">{t('valuePiano.pastAuctionsBody')}</p>
            <Link to="/auctions" className="inline-block border border-white text-white text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-white hover:text-black transition-colors self-start">
              {t('valuePiano.pastAuctionsBtn')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: About Us ── */}
      <section className="pt-8 pb-0" style={{ backgroundColor: '#f5ede6' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

          {/* Left content */}
          <div className="bg-white flex flex-col justify-center px-12 py-16">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">{t('valuePiano.aboutLabel')}</p>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-1 bg-black flex-shrink-0 self-stretch" style={{ minHeight: '60px' }} />
              <h2 className="text-gray-900 leading-snug" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400 }}>
                {t('valuePiano.aboutTitle')}
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm">{t('valuePiano.aboutBody')}</p>
            <Link to="/contact" className="inline-block border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-black hover:text-white transition-colors self-start">
              {t('valuePiano.aboutBtn')}
            </Link>
          </div>

          {/* Right image */}
          <div className="overflow-hidden">
            <img src={IMG.about} alt="About Piano Auctions" className="w-full h-full object-cover" style={{ minHeight: '380px' }} />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Piano Brands We Value ── */}
      <section className="py-20 px-0 bg-white">
        <div className="text-center mb-10 px-6 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">{t('valuePiano.brandsLabel')}</p>
          <h2 className="text-gray-900" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400 }}>
            {t('valuePiano.brandsTitle')}
          </h2>
        </div>
        <BrandsCarousel brands={brands} />
      </section>

      {/* ── MODAL ── */}
      <ValuationModal
        open={modalOpen}
        initialData={personalData}
        onClose={() => { setModalOpen(false); setPersonalData({}) }}
        onSuccessClose={() => setHeroKey((k) => k + 1)}
      />

    </div>
  )
}
