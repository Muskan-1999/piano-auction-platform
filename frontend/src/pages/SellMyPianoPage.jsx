import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import api from '../api/axios'
import ValuationModal from '../components/sell-piano/ValuationModal'

const IMG = {
  hero:       'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80',
  trusted:    'https://images.unsplash.com/photo-1552422535-c45813c61732?w=900&q=80',
  valuation:  'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=900&q=80',
  contract:   'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=900&q=80',
  collection: 'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=900&q=80',
  selling:    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=900&q=80',
}

const HOW_STEPS = [
  {
    title: 'Piano Valuation',
    body: 'To get an accurate estimate of your piano\'s value, simply submit our valuation form. Our expert specialists will assess your piano, giving you a clear understanding of the potential price you can expect when selling your piano at auction.',
  },
  {
    title: 'Contract Agreement',
    body: 'Once you\'ve agreed to sell your piano at auction, we\'ll send you a digital contract and transport form to finalise the process. Once you\'re happy with the contract, you can make the decision to sell at the price we agree, or to change the collection and delivery.',
  },
  {
    title: 'Piano Collection',
    body: 'Once you\'ve completed the Auction Contract process, we\'ll arrange for your piano to be collected by one of our trusted transport services, ensuring safe handling and delivery.',
  },
  {
    title: 'Selling Your Piano',
    body: 'After selling your piano at auction, we will provide a post-sale advice letter with the auction results. You will also receive a settlement cheque once any applicable charges and the final settlement amount from the sale of your piano has been deducted.',
  },
]

const FAQS = [
  {
    q: 'How much is my piano worth if I want to sell it?',
    a: 'The value of your piano depends on its make, model, age, and condition. Submit our valuation form and our specialists will provide a free, accurate estimate based on current market data.',
  },
  {
    q: 'How can I sell my piano if I live far away from the auction house?',
    a: 'No problem. We work with trusted transport partners across the UK to arrange collection from your home. Simply submit your valuation form and we\'ll handle the logistics.',
  },
  {
    q: 'How long does it take to get a valuation for my piano?',
    a: 'Once you submit your valuation form with photos, our team typically responds within 2–3 business days with an estimated auction value.',
  },
  {
    q: 'Do you buy all piano brands?',
    a: 'We deal with a wide range of brands from Yamaha and Kawai to Steinway & Sons, Bechstein, Blüthner, and Petrof. Submit your details and we\'ll let you know if your piano is suitable for auction.',
  },
  {
    q: "What happens if my piano doesn't sell at auction?",
    a: "If your piano doesn't reach its reserve price, we'll discuss the options with you. We may re-list it in a future auction or explore alternative selling routes.",
  },
]

const PROCESS_SECTIONS = [
  {
    title: 'Valuation Of Your Piano',
    img: IMG.valuation,
    body: [
      'If you are interested in selling your piano at one of our auctions, you can simply get in touch with us, and we\'ll be happy to discuss the details of your piano and provide you with a free auction estimate as quickly as possible.',
      'The estimate you receive will be estimated based on what our specialists would expect it to sell for. We\'ll base this price on current market trends, past results for pianos similar to yours, and the provenance of your piano.',
    ],
  },
  {
    title: 'Piano Auction Contract',
    img: IMG.contract,
    body: [
      'Once you have received the valuation for your piano and are satisfied with the estimated price when selling your piano at auction, we will send you the Auction Contract.',
      'Filling out your Auction Contract is a quick and easy process. The information you need to provide includes: Name & address, Contact details, and Details of piano.',
    ],
  },
  {
    title: 'Collection Of Your Piano',
    img: IMG.collection,
    body: [
      "After completing the Auction Contract process, we'll arrange for your piano to be collected by one of our trusted transport services, ensuring safe handling throughout.",
      "We will organise for one of our specialist carriers, Griffin Transport UK or Barter Smith, to collect your piano for sale at auction. Alternatively, you can arrange your own transport.",
    ],
  },
  {
    title: 'Selling Your Piano',
    img: IMG.selling,
    body: [
      'During the auction process, you can follow your piano live on the auction website.',
      "After your piano has been sold, you can find the results in a number of ways. We will post the results on our results page within a couple hours of the auction's conclusion.",
    ],
  },
]

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
  const [form, setForm]   = useState({ first_name: '', last_name: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.first_name.trim()) e.first_name = 'Required'
    if (!form.last_name.trim())  e.last_name  = 'Required'
    if (!form.email.trim())      e.email      = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim())      e.phone      = 'Required'
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
        Use Our Piano Valuation Form
      </h2>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <input type="text" name="first_name" value={form.first_name} onChange={handle}
            placeholder="First Name *" className={inputCls} />
          {errors.first_name && <p className="text-xs text-red-500 mt-0.5">{errors.first_name}</p>}
        </div>
        <div>
          <input type="text" name="last_name" value={form.last_name} onChange={handle}
            placeholder="Last Name *" className={inputCls} />
          {errors.last_name && <p className="text-xs text-red-500 mt-0.5">{errors.last_name}</p>}
        </div>
      </div>

      <div className="mb-3">
        <input type="email" name="email" value={form.email} onChange={handle}
          placeholder="Email *" className={inputCls} />
        {errors.email && <p className="text-xs text-red-500 mt-0.5">{errors.email}</p>}
      </div>

      <div className="mb-5">
        <input type="tel" name="phone" value={form.phone} onChange={handle}
          placeholder="Phone *" className={inputCls} />
        {errors.phone && <p className="text-xs text-red-500 mt-0.5">{errors.phone}</p>}
      </div>

      <button type="submit"
        className="w-full bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 hover:bg-gray-800 transition-colors">
        Next
      </button>
    </form>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function SellMyPianoPage() {
  const [modalOpen, setModalOpen]       = useState(false)
  const [personalData, setPersonalData] = useState({})
  const [openFaq, setOpenFaq]           = useState(null)
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
        className="relative min-h-[560px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.hero})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 py-20">

          <div className="flex-1 max-w-lg">
            <nav className="mb-4 text-xs text-white/60">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white/80">Sell My Piano</span>
            </nav>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-3">PROFESSIONAL MUSIC AUCTIONEERS</p>
            <h1 className="text-white leading-tight mb-5" style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
              Sell My Piano<br />
              <span className="font-semibold">With Trusted Experts</span>
            </h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              We offer a professional, hassle-free service to help you sell your piano, ensuring you receive the best price through expert piano valuation.
            </p>
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
              A Trusted and Efficient Way to Sell Your Piano
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Selling a piano can be challenging, but our expert team makes the process simple. Whether you have an upright, grand, or digital piano, we offer fair valuations, fast collections, and professional handling.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              From assessment to collection, we ensure that your piano is treated with the utmost care, providing you with a seamless and straightforward experience.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-black hover:text-white transition-colors"
            >
              GET MY PIANO VALUATION
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
              How to Sell Your Piano
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Selling your piano is a straightforward process with our structured approach. Our team conducts a comprehensive evaluation, taking into account the make, model, condition, and market demand.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_STEPS.map((s) => (
              <div key={s.title} className="bg-white p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{s.body}</p>
                <button className="text-xs font-semibold text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
                  Read More
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
            Sell My Piano FAQs
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
            Piano Brands We Buy and Sell
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            We deal with a wide range of piano brands, offering competitive prices for both well-known and specialist brands.
          </p>
        </div>
        {brands.length > 0
          ? <BrandsCarousel brands={brands} />
          : <p className="text-center text-sm text-gray-400 italic">Loading brands…</p>
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
