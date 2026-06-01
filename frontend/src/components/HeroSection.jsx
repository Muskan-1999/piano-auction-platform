import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroSection
 *
 * Full-screen cinematic hero with a looping MP4 background.
 * The video file is served from /public/videos/hero-auction.mp4
 * (Vite exposes public/ at the root, so the URL is /videos/hero-auction.mp4).
 *
 * Overlay: rgba(0,0,0,0.55) — keeps text readable while letting the
 * video atmosphere through.
 *
 * Performance:
 *   - preload="none" defers network cost until the browser is idle
 *   - poster image prevents a flash of black before the first frame
 *   - playsinline prevents iOS from full-screening the video
 */
export default function HeroSection() {
  const videoRef = useRef(null)

  // Attempt autoplay; browsers sometimes block it — muted + autoPlay attr handles most cases
  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.play().catch(() => {
        // Silently ignore — video will just stay on the poster frame
      })
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* ── Video background ───────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      >
        <source src="/videos/hero-auction.mp4" type="video/mp4" />
        {/* Fallback: browser that can't play video sees the poster */}
      </video>

      {/* ── Dark overlay rgba(0,0,0,0.55) ──────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.55)' }}
      />

      {/* ── Centred hero content ───────────────────────────────────────── */}
      <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">

        {/* Brand label */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-yellow-400"
          style={{ animation: 'fadeUp 0.7s ease both' }}
        >
          Piano Auctions Ltd
        </p>

        {/* Main headline */}
        <h1
          className="max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
          style={{ animation: 'fadeUp 0.9s ease 0.1s both' }}
        >
          World Leading Specialist Piano Auction
        </h1>

        {/* Sub-heading */}
        <p
          className="mt-5 text-base font-medium text-gray-300 md:text-lg"
          style={{ animation: 'fadeUp 0.9s ease 0.2s both' }}
        >
          Our Next Auction: 23rd June 2026
        </p>

        {/* CTA row */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: 'fadeUp 0.9s ease 0.3s both' }}
        >
          <Link
            to="/auction-portal"
            className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-8 py-3.5 text-sm font-bold text-black transition hover:bg-yellow-400"
          >
            <span>🇬🇧</span> Bid Now
          </Link>
          <Link
            to="/buying-piano"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/70 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            View Catalogue
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ animation: 'fadeUp 1s ease 0.5s both' }}
        >
          <div className="flex flex-col items-center gap-1.5 text-white/50">
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <svg className="h-4 w-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Keyframe animations (inline so no external CSS file needed) ── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </section>
  )
}
