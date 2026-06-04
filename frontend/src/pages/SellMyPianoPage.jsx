import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import api from '../api/axios'
import ValuationModal from '../components/sell-piano/ValuationModal'
import { useLanguage } from '../contexts/LanguageContext'

const IMG = {
  hero:       'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80',
  trusted:    'https://images.unsplash.com/photo-1552422535-c45813c61732?w=900&q=80',
  valuation:  'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=900&q=80',
  contract:   'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=900&q=80',
  collection: 'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=900&q=80',
  selling:    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=900&q=80',
}


// ── Brand carousel ──────────────────────────────────────────────────────────

function BrandItem({ brand }) {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="flex flex-col items-center gap-2 min-w-[130px] px-5">
      {!imgError ? (
        <img
          src={brand.icon_url} alt={brand.name}
          onError={() => setImgError(true)}
          className="grayscale hover:grayscale-0 transition-all duration-300"
          style={{ height: '48px', width: 'auto', maxWidth: '110px', objectFit: 'contain' }}
        />
      ) : (
        <span className="text-sm font-semibold text-gray-700 flex items-center justify-center" style={{ height: '48px' }}>
          {brand.name}
        </span>
      )}
    </div>
  )
}

function BrandsCarousel({ brands }) {
  if (!brands.length) return null
  const doubled  = [...brands, ...brands]
  const duration = Math.max(brands.length * 3, 20)
  return (
    <>
      <style>{`
        @keyframes smpBrandScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .smp-ticker { animation: smpBrandScroll ${duration}s linear infinite; display:flex; width:max-content; }
        .smp-ticker-wrap:hover .smp-ticker { animation-play-state:paused; }
      `}</style>
      <div className="smp-ticker-wrap overflow-hidden">
        <div className="smp-ticker">
          {doubled.map((b, i) => <BrandItem key={`${b.id}-${i}`} brand={b} />)}
        </div>
      </div>
    </>
  )
}

// ── Hero personal-details card ───────────────────────────────────────────────

const inputCls = 'w-full border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-gray-700 transition-colors'

function HeroCard({ onSubmit }) {
  const { t } = useLanguage()
  const [form, setForm]   = useState({ first_name: '', last_name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.first_name.trim()) e.first_name = t('sellMyPiano.required')
    if (!form.last_name.trim())  e.last_name  = t('sellMyPiano.required')
    if (!form.email.trim())      e.email      = t('sellMyPiano.required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t('sellMyPiano.invalidEmail')
    if (!form.phone.trim())      e.phone      = t('sellMyPiano.required')
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
      <h2 className="text-lg text-gray-900 mb-5" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>
        {t('sellMyPiano.valuationFormTitle')}
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <input type="text" name="first_name" value={form.first_name} onChange={handle}
            placeholder={`${t('sellMyPiano.firstName')} *`} className={inputCls} />
          {errors.first_name && <p className="text-xs text-red-500 mt-0.5">{errors.first_name}</p>}
        </div>
        <div>
          <input type="text" name="last_name" value={form.last_name} onChange={handle}
            placeholder={`${t('sellMyPiano.lastName')} *`} className={inputCls} />
          {errors.last_name && <p className="text-xs text-red-500 mt-0.5">{errors.last_name}</p>}
        </div>
      </div>

      <div className="mb-3">
        <input type="email" name="email" value={form.email} onChange={handle}
          placeholder={`${t('sellMyPiano.email')} *`} className={inputCls} />
        {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
      </div>

      <div className="mb-5">
        <input type="tel" name="phone" value={form.phone} onChange={handle}
          placeholder={`${t('sellMyPiano.phone')} *`} className={inputCls} />
        {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
      </div>

      <button type="submit"
        className="w-full bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 hover:bg-gray-800 transition-colors">
        {t('sellMyPiano.nextBtn')}
      </button>
    </form>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function SellMyPianoPage() {
  const { t } = useLanguage()
  const [modalOpen, setModalOpen]       = useState(false)
  const [personalData, setPersonalData] = useState({})
  const [openFaq, setOpenFaq]           = useState(null)
  const [brands, setBrands]             = useState([])
  const [heroKey, setHeroKey]           = useState(0)

  const HOW_STEPS = t('sellMyPiano.howSteps')
  const FAQS      = t('sellMyPiano.faqs')
  const PROCESS_IMGS_MAP = [IMG.valuation, IMG.contract, IMG.collection, IMG.selling]
  const PROCESS_SECTIONS = t('sellMyPiano.processSections').map((s, i) => ({ ...s, img: PROCESS_IMGS_MAP[i] }))

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
        className="relative min-h-[560px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.hero})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 py-20">

          <div className="flex-1 max-w-lg">
            <nav className="mb-4 text-xs text-white/60">
              <Link to="/" className="hover:text-white transition-colors">{t('sellMyPiano.breadcrumbHome')}</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white/80">{t('sellMyPiano.breadcrumbPage')}</span>
            </nav>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-3">{t('sellMyPiano.pageLabel')}</p>
            <h1 className="text-white leading-tight mb-5" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
              {t('sellMyPiano.heroTitle')}<br />
              <span className="font-semibold">{t('sellMyPiano.heroTitleBold')}</span>
            </h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">{t('sellMyPiano.heroDesc')}</p>
          </div>

          <HeroCard key={heroKey} onSubmit={openModal} />
        </div>
      </section>

      {/* ── TRUSTED & EFFICIENT ── */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden">
            <img src={IMG.trusted} alt="Piano auction showroom" className="w-full h-[420px] object-cover" />
          </div>
          <div>
            <h2 className="text-gray-900 leading-snug mb-5"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, margin: '0 0 20px' }}>
              {t('sellMyPiano.trustedTitle')}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{t('sellMyPiano.trustedP1')}</p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">{t('sellMyPiano.trustedP2')}</p>
            <button
              onClick={() => setModalOpen(true)}
              className="border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-black hover:text-white transition-colors"
            >
              {t('sellMyPiano.getValuationBtn')}
            </button>
          </div>
        </div>
      </section>

      {/* ── HOW TO SELL ── */}
      <section className="py-20 px-6 lg:px-10" style={{ backgroundColor: '#f5ede6' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-3"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, margin: '0 0 12px' }}>
              {t('sellMyPiano.howToSellTitle')}
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">{t('sellMyPiano.howToSellDesc')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_STEPS.map((s) => (
              <div key={s.title} className="bg-white p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.body}</p>
                <button className="text-xs font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
                  {t('sellMyPiano.readMore')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-gray-900 text-center mb-10"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, margin: '0 0 40px' }}>
            {t('sellMyPiano.faqTitle')}
          </h2>
          <div className="divide-y divide-gray-200">
            {FAQS.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  className="w-full flex items-center justify-between text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-gray-900">{faq.q}</span>
                  <span className="flex-shrink-0 text-gray-700">
                    {openFaq === i ? <FiMinus className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PIANO BRANDS ── */}
      <section className="py-20 px-0" style={{ backgroundColor: '#f5ede6' }}>
        <div className="text-center mb-10 px-6 lg:px-10">
          <h2 className="text-gray-900 mb-3"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 400, margin: '0 0 12px' }}>
            {t('sellMyPiano.brandsTitle')}
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">{t('sellMyPiano.brandsDesc')}</p>
        </div>
        {brands.length > 0
          ? <BrandsCarousel brands={brands} />
          : <p className="text-center text-sm text-gray-400 italic">{t('sellMyPiano.loadingBrands')}</p>
        }
      </section>

      {/* ── PROCESS SECTIONS ── */}
      {PROCESS_SECTIONS.map((sec, i) => (
        <section
          key={sec.title}
          className="py-16 px-6 lg:px-10"
          style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#fafafa' }}
        >
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-1 bg-black flex-shrink-0 self-stretch hidden lg:block" style={{ minHeight: '160px' }} />
            <div className="flex-1">
              <h3 className="text-gray-900 mb-4"
                style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 400, margin: '0 0 16px' }}>
                {sec.title}
              </h3>
              {sec.body.map((p, j) => (
                <p key={j} className="text-sm text-gray-600 leading-relaxed mb-3">{p}</p>
              ))}
            </div>
            <div className="w-full lg:w-80 flex-shrink-0 overflow-hidden">
              <img src={sec.img} alt={sec.title} className="w-full h-52 object-cover" />
            </div>
          </div>
        </section>
      ))}

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
