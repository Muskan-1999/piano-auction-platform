import React, { useEffect } from 'react'
import { uprightPianos } from '../data/uprightPianos'
import PianoCard from '../components/grand-pianos/PianoCard'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=1600&q=80'

export default function UprightPianosPage() {
  useEffect(() => {
    document.title = 'Upright Pianos | Piano Auctions Ltd'
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
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 400,
            }}
          >
            Upright Pianos
          </h1>
          <p className="text-white/75 text-sm max-w-md leading-relaxed">
            Buy your piano at auction with our trust experts. We have a full range of piano
            brands to buy, view our latest piano auction catalogue.
          </p>
        </div>
      </section>

      {/* ── Piano grid ── */}
      <section className="py-10 px-4 md:px-8 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {uprightPianos.map((piano) => (
              <PianoCard key={piano.slug} piano={piano} category="upright" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
