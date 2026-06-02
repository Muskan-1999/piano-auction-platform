import React from 'react'
import { Link } from 'react-router-dom'

const BG = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'

function LarkLogo() {
  return (
    <div className="flex flex-col items-center gap-1 text-white">
      {/* Simplified bird / lark silhouette */}
      <svg width="52" height="40" viewBox="0 0 52 40" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 4C26 4 14 11 10 22C13 19 18 17 26 19C34 17 39 19 42 22C38 11 26 4 26 4Z" />
        <path d="M26 19C24 23 24 30 26 36C28 30 28 23 26 19Z" />
        <path d="M18 14C18 14 20 18 26 19C22 15 18 14 18 14Z" />
        <path d="M34 14C34 14 30 18 26 19C30 15 34 14 34 14Z" />
      </svg>

      <div className="text-center mt-1">
        <div className="text-xl font-bold tracking-widest">LARK MUSIC</div>
        <div className="text-sm tracking-[0.25em]">INSURANCE</div>
      </div>

      <div className="mt-3 text-center">
        <p className="text-gray-400 text-xs mb-1">Part of</p>
        <p className="text-white text-lg font-bold tracking-[0.2em]">HOWDEN</p>
      </div>
    </div>
  )
}

export default function InsureBanner() {
  return (
    <section className="relative w-full overflow-hidden py-16 px-6 lg:px-10">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG})` }}
      />
      <div className="absolute inset-0 bg-gray-900/87" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left: content */}
        <div className="flex-1">
          <h2
            className="text-white mb-4"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 400,
            }}
          >
            Insure This Piano!
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-7 max-w-md">
            Exciting news! Piano Auctions has partnered with Lark Insurance who offer specialised
            piano insurance. This collaboration ensures that your recently purchased piano is
            protected with comprehensive coverage that suits your needs.
          </p>
          <Link
            to="/contact"
            className="inline-block border border-white text-white text-xs py-3 px-7 uppercase tracking-[0.2em] hover:bg-white hover:text-gray-900 transition-colors duration-200"
          >
            GET YOUR QUOTE
          </Link>
        </div>

        {/* Right: logo */}
        <div className="flex-shrink-0">
          <LarkLogo />
        </div>
      </div>
    </section>
  )
}
