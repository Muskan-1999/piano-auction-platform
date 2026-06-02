import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import PianoImageGallery from '../components/grand-pianos/PianoImageGallery'
import PianoAccordion from '../components/grand-pianos/PianoAccordion'
import ImportantInformationBanner from '../components/grand-pianos/ImportantInformationBanner'
import InsureBanner from '../components/grand-pianos/InsureBanner'
import BookingBiddingSection from '../components/grand-pianos/BookingBiddingSection'
import DeliveryQuoteForm from '../components/grand-pianos/DeliveryQuoteForm'
import PianoFAQ from '../components/grand-pianos/PianoFAQ'

/**
 * Shared detail page for Grand Pianos and Upright Pianos.
 *
 * Props:
 *   pianos       — the relevant static data array (grandPianos or uprightPianos)
 *   type         — "Grand Piano" | "Upright Piano"
 *   backLink     — "/shop/grand-pianos" | "/shop/upright-pianos"
 */
export default function PianoDetailPage({ pianos, type, backLink }) {
  const { slug } = useParams()
  const navigate = useNavigate()
  const piano = pianos.find((p) => p.slug === slug)

  useEffect(() => {
    if (piano) {
      document.title = `${piano.name} | Piano Auctions Ltd`
    }
  }, [piano])

  if (!piano) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-gray-500 text-sm">Piano not found.</p>
        <button
          onClick={() => navigate(backLink)}
          className="text-sm underline text-gray-700 hover:text-gray-900"
        >
          ← Back to {type}s
        </button>
      </div>
    )
  }

  const scrollToBidding = (e) => {
    e.preventDefault()
    document.getElementById('booking-bidding')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="w-full bg-white">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-100 bg-gray-50 px-6 lg:px-10 py-3">
        <nav className="max-w-6xl mx-auto text-xs text-gray-500 flex items-center gap-1 flex-wrap">
          <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
          <span className="mx-1">&rsaquo;</span>
          <Link to={backLink} className="hover:text-gray-900 transition-colors">
            {type}s
          </Link>
          <span className="mx-1">&rsaquo;</span>
          <span className="text-gray-700 line-clamp-1">{piano.name}</span>
        </nav>
      </div>

      {/* ── Detail top section ── */}
      <section className="py-10 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">

            {/* Left — Image gallery */}
            <PianoImageGallery
              image={piano.image}
              images={piano.images}
              name={piano.name}
            />

            {/* Right — Info */}
            <div className="flex flex-col gap-5">
              {/* Title */}
              <h1
                className="text-gray-900 leading-snug"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.55rem)',
                  fontWeight: 400,
                }}
              >
                – {piano.name} – | Est. {piano.est}
              </h1>

              {/* Category badge */}
              <div>
                <Link
                  to={backLink}
                  className="inline-block border border-gray-300 text-xs text-gray-700 px-3 py-1.5 hover:bg-gray-50 hover:border-gray-500 transition-colors"
                >
                  {type}
                </Link>
              </div>

              {/* Short description */}
              <p className="text-sm text-gray-700 leading-relaxed">{piano.description}</p>

              {/* Accordions */}
              <PianoAccordion />

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 mt-1">
                <Link
                  to="/contact"
                  className="flex-1 bg-gray-900 text-white text-xs text-center py-3.5 px-3 hover:bg-gray-800 transition-colors font-semibold uppercase tracking-wider"
                >
                  Enquire Now
                </Link>
                <button
                  onClick={scrollToBidding}
                  className="flex-1 bg-purple-600 text-white text-xs py-3.5 px-3 hover:bg-purple-700 transition-colors font-semibold uppercase tracking-wider"
                >
                  Bid On Piano
                </button>
                <button
                  onClick={scrollToBidding}
                  className="flex-1 bg-blue-600 text-white text-xs py-3.5 px-3 hover:bg-blue-700 transition-colors font-semibold uppercase tracking-wider"
                >
                  Book Viewing
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Shared sections (identical for both types) ── */}
      <ImportantInformationBanner />
      <InsureBanner />
      <BookingBiddingSection />
      <DeliveryQuoteForm defaultPianoType={type} />
      <PianoFAQ />

    </div>
  )
}
