import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const CATALOGUE_COVER =
  'https://pianoauctions.co.uk/wp-content/uploads/2024/02/piano-auction-catalogue.jpg'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function CatalogueHero({ cataloguePdfUrl }) {
  const navigate = useNavigate()
  const hasPdf = Boolean(cataloguePdfUrl)

  function handleScrollToCatalogue(e) {
    e.preventDefault()
    const el = document.getElementById('catalogue')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  function handleDownload() {
    window.location.href = `${API_BASE}/auctions/upcoming/download`
  }

  return (
    <section className="py-14 px-6 lg:px-12 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── Left column ── */}
          <div className="flex-1 min-w-0">

            {/* Breadcrumb */}
            <nav className="mb-5 text-xs text-gray-500 flex items-center gap-1">
              <Link to="/" className="hover:text-gray-800 transition-colors">Home</Link>
              <span className="mx-1 text-gray-400">&rsaquo;</span>
              <span className="text-gray-700">Auction Catalogue</span>
            </nav>

            {/* Heading block with left border accent */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-[3px] bg-gray-800 flex-shrink-0 self-stretch" style={{ minHeight: '90px' }} />
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 mb-2">
                  Auction Catalogue
                </p>
                <h1
                  className="text-gray-900 leading-snug mb-1"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                    fontWeight: 400,
                  }}
                >
                  Auction Catalogue
                </h1>
                <p
                  className="text-gray-500"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', fontStyle: 'italic' }}
                >
                  Pianos for sale
                </p>
              </div>
            </div>

            {/* Body text */}
            <div className="text-gray-600 text-sm leading-relaxed space-y-4 mb-8 max-w-lg">
              <p>
                View our full grand piano and upright piano catalogue of over 100 instruments
                featuring a range of prices and world-class makes and models, including Yamaha,
                Steinway and Kawai.
              </p>
              <p>
                Our auction catalogue is a great way to view each of our pianos online in detail
                before booking a viewing appointment with our specialists to get the opportunity to
                play test the piano you're interested in and get some insider knowledge from our
                experts.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalogue"
                onClick={handleScrollToCatalogue}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-700 transition-colors"
              >
                View Auction Catalogue
              </a>
              <Link
                to="/past-auctions"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors"
              >
                View Past Auction Results
              </Link>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
            <div className="border border-gray-200 overflow-hidden">
              <img
                src={CATALOGUE_COVER}
                alt="Piano Auction Catalogue"
                className="w-full h-auto object-cover block"
                loading="eager"
              />
            </div>

            {/* Download button */}
            <div className="mt-4 relative group/download">
              <button
                onClick={hasPdf ? handleDownload : undefined}
                disabled={!hasPdf}
                className={[
                  'w-full flex items-center justify-center gap-2 px-6 py-3 border text-sm font-medium tracking-wide transition-colors',
                  hasPdf
                    ? 'border-gray-800 text-gray-800 hover:bg-gray-50 cursor-pointer'
                    : 'border-gray-300 text-gray-400 cursor-not-allowed bg-gray-50',
                ].join(' ')}
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download Catalogue
              </button>
              {!hasPdf && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover/download:opacity-100 transition-opacity pointer-events-none">
                  No catalogue available yet
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
