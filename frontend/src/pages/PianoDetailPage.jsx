import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import PianoImageGallery from '../components/grand-pianos/PianoImageGallery'
import PianoAccordion from '../components/grand-pianos/PianoAccordion'
import ImportantInformationBanner from '../components/grand-pianos/ImportantInformationBanner'
import InsureBanner from '../components/grand-pianos/InsureBanner'
import BookingBiddingSection from '../components/grand-pianos/BookingBiddingSection'
import DeliveryQuoteForm from '../components/grand-pianos/DeliveryQuoteForm'
import PianoFAQ from '../components/grand-pianos/PianoFAQ'

function formatEst(lot) {
  const match = lot.title?.match(/Est\.\s*(£[\d,]+[-–]£[\d,]+(?:\s+Plus\s+VAT)?)/i)
  if (match) return match[1].trim()
  const fmt = (n) => Number(n).toLocaleString('en-GB')
  if (!lot.starting_bid) return ''
  if (!lot.reserve_price || Number(lot.starting_bid) === Number(lot.reserve_price)) {
    return `£${fmt(lot.starting_bid)}`
  }
  return `£${fmt(lot.starting_bid)}–£${fmt(lot.reserve_price)}`
}

function Skeleton() {
  return (
    <div className="w-full bg-white">
      <div className="py-10 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 animate-pulse">
          <div className="aspect-[4/3] bg-gray-200 rounded" />
          <div className="flex flex-col gap-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Detail page for Grand Pianos and Upright Pianos.
 * Fetches lot data from the API by slug so images and details
 * always reflect the live database state.
 *
 * Props:
 *   type     — "Grand Piano" | "Upright Piano"
 *   backLink — "/shop/grand-pianos" | "/shop/upright-pianos"
 */
export default function PianoDetailPage({ type, backLink }) {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [lot, setLot] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)

    api
      .get(`public/lots/${slug}`)
      .then((res) => {
        const data = res.data?.data ?? res.data
        setLot(data)
        document.title = `${data.title} | Piano Auctions Ltd`
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setNotFound(true)
        } else {
          setNotFound(true)
        }
      })
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <Skeleton />

  if (notFound || !lot) {
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

  const est = formatEst(lot)

  // Build gallery: use featured_image as primary, gallery array for thumbnails.
  // If gallery has items, include featured_image as first thumb if not already in gallery.
  const rawGallery = Array.isArray(lot.gallery) ? lot.gallery : []
  const allImages = lot.featured_image
    ? [lot.featured_image, ...rawGallery.filter((img) => img !== lot.featured_image)]
    : rawGallery

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
          <span className="text-gray-700 line-clamp-1">{lot.title}</span>
        </nav>
      </div>

      {/* ── Detail top section ── */}
      <section className="py-10 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">

            {/* Left — Image gallery */}
            <PianoImageGallery
              image={allImages[0] ?? null}
              images={allImages}
              name={lot.title}
            />

            {/* Right — Info */}
            <div className="flex flex-col gap-5">
              <h1
                className="text-gray-900 leading-snug"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.55rem)',
                  fontWeight: 400,
                }}
              >
                {lot.title}{est ? ` | Est. ${est}` : ''}
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

              {/* Description */}
              {lot.description && (
                <p
                  className="text-sm text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: lot.description }}
                />
              )}

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

      {/* ── Shared sections ── */}
      <ImportantInformationBanner />
      <InsureBanner />
      <BookingBiddingSection />
      <DeliveryQuoteForm defaultPianoType={type} />
      <PianoFAQ />

    </div>
  )
}
