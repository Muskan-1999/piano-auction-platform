import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiPlus, FiMinus } from 'react-icons/fi'
import api from '../api/axios'

const IMG = {
  hero:        'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80',
  showroom:    'https://images.unsplash.com/photo-1552422535-c45813c61732?w=900&q=80',
  grand:       'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=700&q=80',
  upright:     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80',
  brands:      'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=700&q=80',
  catalogue:   'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=1600&q=80',
  appointment: 'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=900&q=80',
}

const STEPS = [
  {
    num: 1,
    title: 'View Pianos To Buy',
    desc: 'Browse our selection of grand and upright pianos, book a viewing appointment at our auction venue, or submit our online valuation form and discuss your options with our piano specialists.',
  },
  {
    num: 2,
    title: 'Bid On Your Piano',
    desc: 'Bid online, over the phone or by leaving an absentee bid. All you need to do is register with either ourselves or on our online platform before you can buy a piano.',
  },
  {
    num: 3,
    title: 'Buy Pianos',
    desc: "If you win the bid on your piano, you'll find yourself the proud new owner of a grand or upright piano. Once you have bought, you'll receive an invoice which we ask to be paid by bank transfer.",
  },
  {
    num: 4,
    title: 'Piano Delivery',
    desc: 'Once you have bought your piano at auction, you can organise a collection and delivery with us. We recommend an experienced piano haulier to transport your piano so that it can be collected promptly.',
  },
]

const FAQS = [
  {
    q: 'What should I look for when buying a second hand piano?',
    a: 'Look for consistent tone across all keys, smooth action, proper sustain pedal function, and check for any visible damage to the cabinet. Our experts can guide you through each piano in our showroom.',
  },
  {
    q: 'Is it better to buy a piano at auction or from a retailer?',
    a: 'Auction prices are often significantly lower than retail. At Piano Auctions Ltd, every piano is checked and prepared by our specialists, giving you quality assurance alongside competitive auction pricing.',
  },
  {
    q: 'Do I need to be an experienced player to buy a piano?',
    a: "Not at all. Whether you're a beginner or a concert pianist, our team will help you find the right instrument for your level and budget.",
  },
  {
    q: 'How much should I expect to spend on a good piano?',
    a: 'Quality upright pianos start from a few hundred pounds at auction, while grand pianos vary widely. Our team can advise based on your requirements and budget.',
  },
  {
    q: 'Can I get help transporting and setting up my new piano?',
    a: "Yes. Once you've purchased your piano at auction, we can help organise professional piano transport and placement in your home.",
  },
]

const PIANO_CARDS = [
  { title: 'Grand Pianos',     link: 'View Grand Pianos',   img: IMG.grand },
  { title: 'Upright Pianos',   link: 'View Upright Pianos', img: IMG.upright },
  { title: 'All Piano Brands', link: 'View Piano Brands',   img: IMG.brands },
]

// ── Brand carousel sub-components ──────────────────────────────────────────

function BrandItem({ brand }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex flex-col items-center gap-2 min-w-[120px] px-4">
      {!imgError ? (
        <img
          src={brand.icon_url}
          alt={brand.name}
          onError={() => setImgError(true)}
          className="grayscale hover:grayscale-0 transition-all duration-300"
          style={{ height: '50px', width: 'auto', maxWidth: '100px', objectFit: 'contain' }}
        />
      ) : (
        <span
          className="text-sm font-semibold text-gray-700 flex items-center justify-center"
          style={{ height: '50px' }}
        >
          {brand.name}
        </span>
      )}
      <span className="text-xs text-gray-600 whitespace-nowrap">{brand.name}</span>
    </div>
  )
}

function BrandsCarousel({ brands }) {
  if (!brands.length) return null
  const doubled = [...brands, ...brands]
  const duration = Math.max(brands.length * 3, 20)

  return (
    <>
      <style>{`
        @keyframes brandScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .brands-ticker {
          animation: brandScroll ${duration}s linear infinite;
          display: flex;
          width: max-content;
        }
        .brands-ticker-wrap:hover .brands-ticker {
          animation-play-state: paused;
        }
      `}</style>
      <div className="brands-ticker-wrap overflow-hidden" style={{ cursor: 'default' }}>
        <div className="brands-ticker">
          {doubled.map((brand, i) => (
            <BrandItem key={`${brand.id}-${i}`} brand={brand} />
          ))}
        </div>
      </div>
    </>
  )
}

// ── Main page ───────────────────────────────────────────────────────────────

export default function BuyingPianoPage() {
  const navigate = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)
  const [brands, setBrands]   = useState([])

  useEffect(() => {
    api.get('piano-brands')
      .then((res) => setBrands(res.data))
      .catch(() => setBrands([]))
  }, [])

  return (
    <div className="w-full bg-white">

      {/* ── HERO ── */}
      <section
        className="relative min-h-[540px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.hero})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 py-20">

          {/* Left — headline */}
          <div className="flex-1 max-w-lg">
            <nav className="mb-4 text-xs text-white/60">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">&rsaquo;</span>
              <span className="text-white/80">Buying A Piano</span>
            </nav>
            <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-3">BUY A PIANO</p>
            <h1
              className="text-4xl lg:text-5xl font-heading text-white leading-tight mb-5"
              style={{ fontFamily: 'Georgia, serif', margin: 0, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Buy A Piano At Auction
            </h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-md mb-5">
              Buy your piano at auction with our trusted experts. We have a full range of piano brands to buy, view our latest piano auction catalogue.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <Link to="/auctions" className="text-white/80 underline underline-offset-4 hover:text-white transition-colors">Upright Pianos</Link>
              <span className="text-white/40">|</span>
              <Link to="/auctions" className="text-white/80 underline underline-offset-4 hover:text-white transition-colors">Grand Pianos</Link>
              <span className="text-white/40">|</span>
              <Link to="/auctions" className="text-white/80 underline underline-offset-4 hover:text-white transition-colors">Piano Brands</Link>
            </div>
          </div>

          {/* Right — Register To Bid card */}
          <div className="w-full max-w-sm bg-white shadow-2xl p-8 flex-shrink-0">
            <h2
              className="text-xl font-heading text-gray-900 mb-2"
              style={{ fontFamily: 'Georgia, serif', margin: '0 0 8px' }}
            >
              Register To Bid
            </h2>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">
              Bid for your favourite piano or watch the latest auction live with easyliveauction.com
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/contact')}
                className="w-full bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-gray-900 transition-colors"
              >
                UK – BID NOW
              </button>
              <button
                onClick={() => navigate('/bidding')}
                className="w-full border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-gray-50 transition-colors"
              >
                OTHER WAYS TO BID
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECOND HAND PIANOS ── */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden">
            <img
              src={IMG.showroom}
              alt="Piano showroom"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div>
            <h2
              className="font-heading text-gray-900 leading-snug mb-5"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', margin: '0 0 20px' }}
            >
              Second Hand Pianos To Buy At Auction
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Looking for a great piano without the high price tag? Our second hand pianos are the perfect place to find quality pianos at unbeatable value. From uprights to grands, you'll discover trusted brands and beautiful pianos ready for a new home.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Each piano is checked for sound and condition, so you can bid with confidence. Explore our latest auctions and find the piano that's right for you.
            </p>
            <button
              onClick={() => navigate('/auction-portal/catalogue')}
              className="border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-black hover:text-white transition-colors"
            >
              VIEW THE LATEST AUCTION CATALOGUE
            </button>
          </div>
        </div>
      </section>

      {/* ── AVAILABLE PIANOS TO BUY ── */}
      <section className="py-20 px-6 lg:px-10" style={{ backgroundColor: '#f5ede6' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="font-heading text-gray-900 mb-3"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', margin: '0 0 12px' }}
            >
              Available Pianos To Buy
            </h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Browse our range of available pianos ready to buy at auction. Whether you prefer the elegance of a grand piano, the space-saving style of an upright, or the convenience of a digital model, we've got options to suit every player and budget.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PIANO_CARDS.map((card) => (
              <div
                key={card.title}
                className="relative h-72 overflow-hidden group cursor-pointer"
                onClick={() => navigate('/auction-portal/catalogue')}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3
                    className="font-heading text-white mb-2"
                    style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', fontWeight: 400, margin: '0 0 8px' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/80">
                    To get an accurate estimate of your piano's value, simply submit our online valuation form.
                  </p>
                  <span className="inline-block mt-2 text-white text-sm underline underline-offset-4 hover:text-white/80">
                    {card.link}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUYING MADE EASY ── */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              className="font-heading text-gray-900"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', margin: '0 0 12px' }}
            >
              Buying A Piano At Auction – Made Easy
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Buying a piano at auction is simple, just follow our four quick steps to find, bid and bring home the piano you love.
              And if you're also thinking about{' '}
              <Link to="/contact" className="underline text-gray-700 hover:text-black">selling a piano</Link>
              , we can help with that too. Start below and view what pianos we have available.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-gray-900 text-white text-lg font-semibold flex items-center justify-center mx-auto mb-5">
                  {step.num}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/auction-portal/catalogue')}
              className="bg-black text-white text-xs font-semibold tracking-wider uppercase py-4 px-10 hover:bg-gray-900 transition-colors"
            >
              VIEW AVAILABLE PIANOS TO BUY
            </button>
          </div>
        </div>
      </section>

      {/* ── AUCTION CATALOGUE BANNER ── */}
      <section
        className="relative py-24 px-6 lg:px-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${IMG.catalogue})` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/60 mb-4">OUR LATEST PIANO CATALOGUE</p>
          <h2
            className="font-heading text-white mb-4 max-w-lg"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', margin: '0 0 16px' }}
          >
            Piano Auction Catalogue
          </h2>
          <p className="text-white/75 text-sm leading-relaxed max-w-md mb-8">
            Explore our latest auction catalogue to see all pianos currently available to bid on. Browse full details, photos and auction dates in one place, and find the perfect piano that's right for you.
          </p>
          <button
            onClick={() => navigate('/auction-portal/catalogue')}
            className="border border-white text-white text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-white hover:text-black transition-colors"
          >
            VIEW AVAILABLE PIANOS TO BUY
          </button>
        </div>
      </section>

      {/* ── BOOK SHOWROOM APPOINTMENT ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="h-80 lg:h-auto overflow-hidden">
          <img
            src={IMG.appointment}
            alt="Showroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center px-10 py-16 lg:px-16" style={{ backgroundColor: '#1a1a1a' }}>
          <div>
            <h2
              className="font-heading text-white mb-5"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', margin: '0 0 20px' }}
            >
              Book Your Showroom Appointment
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-md">
              Book a showroom appointment to see the pianos in person before you buy. Get expert guidance, compare models, and find the perfect piano with confidence.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="border border-white text-white text-xs font-semibold tracking-wider uppercase py-3 px-6 hover:bg-white hover:text-black transition-colors"
            >
              BOOK YOUR APPOINTMENT
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="py-20 px-6 lg:px-10 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-heading text-gray-900 text-center mb-10"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', margin: '0 0 40px' }}
          >
            Buy Piano FAQs
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
                    {openFaq === i
                      ? <FiMinus className="h-4 w-4" />
                      : <FiPlus className="h-4 w-4" />}
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

      {/* ── PIANO BRANDS — scrolling carousel ── */}
      <section className="py-20 px-0" style={{ backgroundColor: '#f5ede6' }}>
        <div className="text-center mb-10 px-6 lg:px-10">
          <h2
            className="font-heading text-gray-900 mb-3"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', margin: '0 0 12px' }}
          >
            Piano Brands You Can Buy
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            We deal with a wide range of piano brands, offering competitive prices for both well-known and specialist brands.
          </p>
        </div>

        {brands.length > 0 ? (
          <BrandsCarousel brands={brands} />
        ) : (
          <div className="flex justify-center">
            <p className="text-sm text-gray-400 italic">Loading brands…</p>
          </div>
        )}
      </section>

    </div>
  )
}
