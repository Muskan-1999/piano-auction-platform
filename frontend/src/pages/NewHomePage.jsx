/**
 * NewHomePage — Route: /
 *
 * Near pixel-perfect recreation of pianoauctions.co.uk
 * Stack: React + Tailwind + Framer Motion
 * Fonts: Playfair Display (headings) · Inter (body)  — loaded in index.html
 */

import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Play } from 'lucide-react'

// ─── Design tokens ────────────────────────────────────────────────────────────
const gold  = '#C9A86A'
const black = '#050505'
const dark  = '#0D0D0D'

// ─── Fade-up animation preset ────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } }),
}

function FadeSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Piano images (Unsplash — royalty-free) ───────────────────────────────────
const PIANO_IMGS = {
  hero:       'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1920&q=80',
  valuation:  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=900&q=80',
  catalogue1: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=900&q=80',
  catalogue2: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80',
  news:       'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=900&q=80',
  footer:     [
    'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=70',
    'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=70',
    'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=70',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70',
    'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=70',
    'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=400&q=70',
    'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=400&q=70',
    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=70',
  ],
}


// ─── Brands ───────────────────────────────────────────────────────────────────
const BRANDS = [
  { name: 'Feurich',    style: 'font-bold italic tracking-tight text-2xl' },
  { name: 'FAZIOLI',    style: 'font-bold tracking-widest text-xl' },
  { name: 'Essex',      style: 'font-serif italic text-2xl' },
  { name: 'Boston',     style: 'font-serif italic text-2xl' },
  { name: 'Bösendorfer', style: 'font-serif italic text-xl' },
  { name: 'Steinway',   style: 'font-serif text-xl tracking-wide' },
  { name: 'Yamaha',     style: 'font-bold tracking-widest text-lg' },
  { name: 'Kawai',      style: 'font-bold tracking-wider text-xl' },
  { name: 'Bechstein',  style: 'font-serif italic text-xl' },
  { name: 'Blüthner',   style: 'font-serif italic text-xl' },
]

// ─── Countdown hook ───────────────────────────────────────────────────────────
function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, new Date(target) - Date.now())
    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    return { d, h, m, s }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [target])
  return time
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, className = '', children }) {
  return <section id={id} className={`w-full ${className}`}>{children}</section>
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════════════════
function Hero() {
  const videoRef = useRef(null)
  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [])

  // Next auction date — set dynamically
  const nextAuction = '23 June 2026'

  return (
    <Section id="hero" className="relative h-screen overflow-hidden bg-black">

      {/* ── Layer 1: Fallback image (bottom — shows if video fails) ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${PIANO_IMGS.hero})` }}
      />

      {/* ── Layer 2: Video (covers fallback when loaded) ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 1 }}
        onLoadedData={() => console.log('[Hero] video loaded')}
        onPlay={() => console.log('[Hero] video playing')}
        onError={(e) => console.error('[Hero] video error', e)}
        aria-hidden="true"
      >
        <source src="/videos/hero-auction.mp4" type="video/mp4" />
      </video>

      {/* ── Layer 3: Dark overlay ── */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.55)', zIndex: 2 }}
      />

      {/* ── Layer 4: Content (above overlay) ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white" style={{ zIndex: 3 }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.4em]"
          style={{ color: gold, fontFamily: 'Inter, sans-serif' }}
        >
          Piano Auctions Ltd
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
        >
          World Leading<br />
          Specialist Piano<br />
          Auction
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 text-base font-light text-gray-300 md:text-lg"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Our Next Auction: {nextAuction}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/auction-portal"
            className="group inline-flex items-center gap-2 rounded-full border border-white/60 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500/10"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em' }}
          >
            Explore Auction
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Play button — bottom-left, matches reference site */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-8 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white backdrop-blur-sm transition hover:border-yellow-500 hover:text-yellow-500"
          aria-label="Play video"
        >
          <Play className="h-5 w-5 fill-current" />
        </motion.button>

        {/* Scroll chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 right-8 flex flex-col items-center gap-1 text-white/40"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronRight className="h-4 w-4 rotate-90 animate-bounce" />
        </motion.div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES
// ═══════════════════════════════════════════════════════════════════════════════
const SERVICES = [
  {
    title: 'Buy A Piano',
    body: 'Browse our catalogue of grand and upright pianos to find the perfect instrument to buy from one of our piano auctions.',
    href: '/buying-piano',
    cta: 'Browse Pianos →',
  },
  {
    title: 'Sell My Piano',
    body: 'Find out how to sell your upright piano or grand piano quickly on-line from our specialist auctions.',
    href: '/sell-my-piano',
    cta: 'Sell With Us →',
  },
  {
    title: 'Value My Piano',
    body: 'Get in touch with our experts to find out how much your piano is worth at one of our specialist auctions.',
    href: '/value-my-piano',
    cta: 'Get Valuation →',
  },
]

function Services() {
  return (
    <Section id="services" style={{ background: dark }}>
      <div className="grid grid-cols-1 divide-y divide-white/10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {SERVICES.map((s, i) => (
          <FadeSection key={s.title} delay={i * 0.08} className="px-10 py-14">
            <p
              className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-gray-500"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {String(i + 1).padStart(2, '0')}
            </p>
            <h2
              className="mb-4 text-2xl font-bold text-white"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              {s.title}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              {s.body}
            </p>
            <Link
              to={s.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: gold, fontFamily: 'Inter, sans-serif' }}
            >
              {s.cta}
            </Link>
          </FadeSection>
        ))}
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// VALUATION
// ═══════════════════════════════════════════════════════════════════════════════
function Valuation() {
  return (
    <Section id="valuation" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <FadeSection>
            <div className="w-1 h-16 mb-8" style={{ background: gold }} />
            <h2
              className="mb-6 text-4xl font-bold leading-tight text-gray-900 lg:text-5xl"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              Upright and Grand<br />Piano Valuation
            </h2>
            <p className="mb-4 leading-relaxed text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Piano Auctions Ltd prides itself on helping clients value their pianos quickly so they can{' '}
              <a href="#" className="underline hover:text-gray-900">sell their pianos at auction</a>.
            </p>
            <p className="mb-8 leading-relaxed text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
              Our{' '}
              <a href="#" className="underline hover:text-gray-900">expert piano advisors</a>{' '}
              will help you to determine the price of your grand or upright piano at auction. With over 98% private vendor sale success rate, we guarantee results at all our piano auctions.
            </p>
            <Link
              to="/value-my-piano"
              className="inline-flex items-center gap-2 border border-gray-900 px-7 py-3.5 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Get Your Quick Valuation
            </Link>
          </FadeSection>

          {/* Image */}
          <FadeSection delay={0.15} className="overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <motion.img
                src={PIANO_IMGS.valuation}
                alt="Grand piano valuation"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </FadeSection>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURED RESULTS
// ═══════════════════════════════════════════════════════════════════════════════
function FeaturedResults() {
  const [idx, setIdx]   = useState(0)
  const [lots, setLots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('auctions/past')
      .then((res) => {
        const all = (res.data || []).flatMap((auction) =>
          (auction.lots || [])
            .filter((l) => l.featured_image)
            .map((l) => ({
              key:   `${auction.id}-${l.id}`,
              lot:   l.lot_number,
              brand: l.brand || '',
              model: l.title || '',
              sold:  l.winning_bid_amount
                       ? `£${Number(l.winning_bid_amount).toLocaleString('en-GB')}`
                       : null,
              img:   l.featured_image,
            }))
        )
        setLots(all)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const visible = 4
  const max = Math.max(0, lots.length - visible)
  const prev = () => setIdx((i) => Math.max(0, i - 1))
  const next = () => setIdx((i) => Math.min(max, i + 1))

  if (loading) {
    return (
      <Section id="results" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 h-10 w-64 animate-pulse rounded bg-gray-200" />
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/2] w-full bg-gray-200" />
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-full rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    )
  }

  if (lots.length === 0) return null

  return (
    <Section id="results" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <FadeSection className="mb-12 flex items-end justify-between">
          <h2
            className="text-3xl font-bold text-gray-900 lg:text-4xl"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Featured Past Results
          </h2>
          {lots.length > visible && (
            <div className="flex gap-2">
              <button
                onClick={prev}
                disabled={idx === 0}
                className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-30"
                aria-label="Previous"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                disabled={idx >= max}
                className="flex h-10 w-10 items-center justify-center border border-gray-300 text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white disabled:opacity-30"
                aria-label="Next"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </FadeSection>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `calc(-${idx} * (25% + 1.5rem))` }}
            transition={{ type: 'tween', duration: 0.4 }}
          >
            {lots.map((r) => (
              <div key={r.key} className="w-[calc(25%-1.2rem)] shrink-0">
                <div className="overflow-hidden">
                  <motion.img
                    src={r.img}
                    alt={`${r.brand} ${r.model}`}
                    className="aspect-[3/2] w-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <div className="pt-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {r.lot ? `Lot ${r.lot} — ` : ''}{r.brand}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {r.model}
                  </p>
                  {r.sold && (
                    <p className="mt-2 text-sm font-semibold" style={{ color: '#8B4513', fontFamily: 'Inter, sans-serif' }}>
                      Sold for: {r.sold}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        {lots.length > visible && (
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`h-1.5 transition-all duration-300 ${i === idx ? 'w-6 bg-gray-900' : 'w-1.5 bg-gray-300'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// CATALOGUE
// ═══════════════════════════════════════════════════════════════════════════════
function Catalogue() {
  const { d, h, m, s } = useCountdown('2026-06-23T10:00:00')

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <Section id="catalogue" style={{ background: black }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: image */}
        <div className="relative h-[480px] overflow-hidden lg:h-auto">
          <motion.img
            src={PIANO_IMGS.catalogue1}
            alt="Piano catalogue"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.35)' }} />
        </div>

        {/* Right: content */}
        <div className="flex flex-col justify-center px-10 py-20 lg:px-16">
          <FadeSection>
            <div className="w-1 h-12 mb-8" style={{ background: gold }} />
            <h2
              className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              Upright and Grand<br />Piano Catalogue
            </h2>
            <p className="mb-8 leading-relaxed text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              Browse our catalogue for upright and grand pianos and get the insider information you need when joining our piano auctions to buy and sell your piano.
            </p>

            <Link
              to="/auction-catalogue"
              className="mb-12 inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-yellow-500 hover:text-yellow-500"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View Our Piano Auction Catalogue
            </Link>

            {/* Countdown */}
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                Our Next Auction: Live In
              </p>
              <div className="flex gap-6">
                {[
                  { val: pad(d), label: 'Days' },
                  { val: pad(h), label: 'Hours' },
                  { val: pad(m), label: 'Mins' },
                  { val: pad(s), label: 'Seconds' },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center">
                    <div
                      className="text-4xl font-bold tabular-nums text-white lg:text-5xl"
                      style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                    >
                      {val}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-widest text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeSection>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SUBSCRIBE
// ═══════════════════════════════════════════════════════════════════════════════
function Subscribe() {
  const [email, setEmail] = useState('')
  const [sent,  setSent]  = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <Section id="subscribe" style={{ background: black }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: image */}
        <div className="relative h-[400px] overflow-hidden lg:h-auto">
          <img
            src={PIANO_IMGS.catalogue2}
            alt="Piano auction"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.4)' }} />
        </div>

        {/* Right: form */}
        <div className="flex flex-col justify-center px-10 py-20 lg:px-16">
          <FadeSection>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
              Keep Up To Date
            </p>
            <h2
              className="mb-8 text-4xl font-bold leading-tight text-white"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              Subscribe to our<br />Auction Updates
            </h2>

            {sent ? (
              <p className="text-sm text-green-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                Thank you — you're on the list!
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button
                  type="submit"
                  className="whitespace-nowrap bg-white px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-yellow-500 hover:text-black"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </FadeSection>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEWS
// ═══════════════════════════════════════════════════════════════════════════════
function News() {
  return (
    <Section id="news" style={{ background: dark }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: content */}
        <div className="flex flex-col justify-center px-10 py-20 lg:px-16">
          <FadeSection>
            <p
              className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-gray-500"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Further Information
            </p>
            <div className="w-1 h-12 mb-8" style={{ background: gold }} />
            <h2
              className="mb-6 text-4xl font-bold leading-tight text-white lg:text-5xl"
              style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
            >
              Piano Auctions<br />News and Insights
            </h2>
            <p className="mb-8 leading-relaxed text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
              Read our specialist news and insights into upright and grand pianos and get the insider information you need when joining our piano auctions to buy and sell your piano.
            </p>
            <Link
              to="/news-insight"
              className="inline-flex items-center gap-2 border border-white/30 px-7 py-3.5 text-sm font-medium text-white transition-all hover:border-yellow-500 hover:text-yellow-500"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              View All Our Latest News Posts
            </Link>
          </FadeSection>
        </div>

        {/* Right: image */}
        <div className="relative h-[480px] overflow-hidden lg:h-auto">
          <motion.img
            src={PIANO_IMGS.news}
            alt="Piano auction news"
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7 }}
          />
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.25)' }} />
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// BRANDS
// ═══════════════════════════════════════════════════════════════════════════════
function Brands() {
  const [idx, setIdx] = useState(0)
  const perPage = 5
  const maxIdx  = Math.max(0, BRANDS.length - perPage)
  const prev    = () => setIdx((i) => Math.max(0, i - 1))
  const next    = () => setIdx((i) => Math.min(maxIdx, i + 1))

  return (
    <Section id="brands" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <FadeSection className="mb-14 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
            Brands At Auction
          </p>
          <h2
            className="text-3xl font-bold text-gray-900 lg:text-4xl"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            Pianos We Sell
          </h2>
        </FadeSection>

        <div className="relative flex items-center gap-4">
          <button
            onClick={prev}
            disabled={idx === 0}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 text-gray-400 transition hover:border-gray-900 hover:text-gray-900 disabled:opacity-20"
            aria-label="Previous brand"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex-1 overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `calc(-${idx} * (100% / ${perPage}))` }}
              transition={{ type: 'tween', duration: 0.35 }}
            >
              {BRANDS.map((b) => (
                <div
                  key={b.name}
                  className="flex shrink-0 items-center justify-center px-6 py-4"
                  style={{ width: `${100 / perPage}%` }}
                >
                  <span
                    className={`cursor-default select-none text-gray-400 transition-colors duration-200 hover:text-gray-900 ${b.style}`}
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
                  >
                    {b.name}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={next}
            disabled={idx >= maxIdx}
            className="flex h-9 w-9 shrink-0 items-center justify-center border border-gray-200 text-gray-400 transition hover:border-gray-900 hover:text-gray-900 disabled:opacity-20"
            aria-label="Next brand"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE ASSEMBLY
// ═══════════════════════════════════════════════════════════════════════════════
export default function NewHomePage() {
  return (
    <div className="w-full overflow-x-hidden" style={{ fontFamily: 'Inter, sans-serif', background: black }}>
      <Hero />
      <Services />
      <Valuation />
      <FeaturedResults />
      <Catalogue />
      <Subscribe />
      <News />
      <Brands />
    </div>
  )
}
