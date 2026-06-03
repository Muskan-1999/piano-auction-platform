import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FiCalendar, FiClock, FiMapPin, FiArrowLeft } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import api from '../api/axios'
import BlogCard from '../components/news/BlogCard'

const FALLBACK_BANNER =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'

function formatFullDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(iso) {
  if (!iso) return ''
  return new Date(iso)
    .toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true })
    .toLowerCase()
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[320px] bg-gray-200 w-full mb-10" />
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="h-3 bg-gray-200 rounded w-28 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-8 bg-gray-200 rounded w-2/3" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mt-6" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
            <div className="h-10 bg-gray-200 rounded mt-4" />
            <div className="h-10 bg-gray-200 rounded" />
            <div className="h-[280px] bg-gray-200 rounded mt-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AuctionDetail() {
  const { slug } = useParams()

  const [auction, setAuction]       = useState(null)
  const [loading, setLoading]       = useState(true)
  const [notFound, setNotFound]     = useState(false)
  const [allAuctions, setAllAuctions] = useState([])
  const [blogs, setBlogs]           = useState([])

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    setAuction(null)

    async function loadAuction() {
      try {
        // 1. Try the public endpoint (works for upcoming / live / ended statuses)
        try {
          const res = await api.get(`public/auctions/${slug}`)
          const data = res.data?.data ?? res.data ?? null
          if (data?.id) {
            setAuction(data)
            document.title = `${data.title} | Piano Auctions Ltd`
            return
          }
        } catch (_) {
          // Public endpoint returned 404 (e.g. auction has status='published')
          // Fall through to the internal endpoint below
        }

        // 2. Fallback: search all visible auctions via public endpoint by slug.
        //    The internal /api/auctions endpoint has a bug where
        //    $request->string('status') is truthy even when absent, causing
        //    WHERE status='' which returns no rows.
        const fallback = await api.get('public/auctions', { params: { per_page: 100 } })
        const list = fallback.data?.data ?? []
        const found = list.find((a) => a.slug === slug)
        if (found) {
          setAuction(found)
          document.title = `${found.title} | Piano Auctions Ltd`
        } else {
          setNotFound(true)
        }
      } catch (_) {
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    loadAuction()

    // Fetch all visible auctions for prev/next navigation
    api.get('public/auctions', { params: { per_page: 100 } })
      .then((res) => setAllAuctions(res.data?.data ?? []))
      .catch(() => {})

    api.get('/blogs')
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : []
        setBlogs(list.slice(0, 3))
      })
      .catch(() => {})
  }, [slug])

  // ── Prev / Next by sorted start_time ──
  const sorted = [...allAuctions].sort(
    (a, b) => new Date(a.start_time) - new Date(b.start_time),
  )
  const idx         = sorted.findIndex((a) => a.slug === slug)
  const prevAuction = idx > 0 ? sorted[idx - 1] : null
  const nextAuction = idx !== -1 && idx < sorted.length - 1 ? sorted[idx + 1] : null

  // ── Loading ──
  if (loading) return (
    <div className="w-full bg-white">
      <Skeleton />
    </div>
  )

  // ── Not found ──
  if (notFound || !auction) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white gap-4">
        <p className="text-gray-500">Auction not found.</p>
        <Link
          to="/auction-calendar"
          className="text-sm text-gray-900 underline underline-offset-2"
        >
          ← Back to All Events
        </Link>
      </div>
    )
  }

  const mapQuery = auction.location
    ? `https://maps.google.com/maps?q=${encodeURIComponent(auction.location)}&output=embed`
    : null

  const shareUrl = encodeURIComponent(window.location.href)
  const shareTitle = encodeURIComponent(auction.title)

  return (
    <div className="w-full bg-white">

      {/* ── Hero banner ── */}
      <div
        className="relative overflow-hidden w-full"
        style={{ height: 'clamp(240px, 28vw, 360px)' }}
      >
        <img
          src={auction.banner_image || FALLBACK_BANNER}
          alt={auction.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* ── Main two-column section ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-10">

        {/* Back link */}
        <Link
          to="/auction-calendar"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-900 transition-colors mb-8 group"
        >
          <FiArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to All Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16">

          {/* ── LEFT COLUMN ── */}
          <div>
            <h1
              className="text-gray-900 leading-tight mb-3"
              style={{
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
                fontSize: 'clamp(1.75rem, 4vw, 2.4rem)',
              }}
            >
              {auction.title}
            </h1>

            {/* Breadcrumb */}
            <nav className="text-[11px] text-gray-400 flex items-center gap-1 flex-wrap mb-8">
              <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
              <span>»</span>
              <span className="text-gray-600 truncate max-w-[200px]">{auction.title}</span>
            </nav>

            {/* Date / Time / Location icons */}
            <ul className="space-y-3">
              {auction.start_time && (
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <FiCalendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {formatFullDate(auction.start_time)}
                </li>
              )}
              {auction.start_time && (
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <FiClock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  Start: {formatTime(auction.start_time)}
                </li>
              )}
              {auction.end_time && (
                <li className="flex items-center gap-3 text-sm text-gray-700">
                  <FiClock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  End: {formatTime(auction.end_time)}
                </li>
              )}
              {auction.location && (
                <li className="flex items-start gap-3 text-sm text-gray-700">
                  <FiMapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  {auction.location}
                </li>
              )}
            </ul>

            <hr className="my-8 border-gray-200" />

            {/* Share */}
            <div>
              <p className="text-xs text-gray-500 mb-3">Share the Post:</p>
              <div className="flex items-center gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <FaFacebook className="w-[18px] h-[18px]" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Twitter"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <FaTwitter className="w-[18px] h-[18px]" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <FaLinkedin className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div>
            {/* Description HTML */}
            {auction.description && (
              <div
                className="auction-event-description text-sm text-gray-700 leading-relaxed mb-8"
                dangerouslySetInnerHTML={{ __html: auction.description }}
              />
            )}

            {/* CTA block — always visible */}
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-900 mb-4">
                TO BOOK AN APPOINTMENT TO VIEW PLEASE:
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/auction-catalogue"
                  className="block border border-gray-900 text-gray-900 text-sm font-medium py-3 px-5 text-center hover:bg-gray-900 hover:text-white transition-colors"
                >
                  View Latest Catalogue
                </Link>
                <Link
                  to="/viewing-appointments"
                  className="block border border-gray-900 text-gray-900 text-sm font-medium py-3 px-5 text-center hover:bg-gray-900 hover:text-white transition-colors"
                >
                  Book an appointment to view
                </Link>
              </div>
            </div>

            {/* Google Map */}
            {mapQuery && (
              <div className="w-full overflow-hidden border border-gray-200">
                <iframe
                  title="Auction Location Map"
                  src={mapQuery}
                  width="100%"
                  height="300"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Prev / Next navigation ── */}
        {(prevAuction || nextAuction) && (
          <>
            <hr className="mt-12 mb-6 border-gray-200" />
            <div className="flex items-start justify-between gap-4 text-sm">
              {prevAuction ? (
                <Link
                  to={`/auctions/${prevAuction.slug}`}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group"
                >
                  <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Previous</div>
                    <div className="font-medium text-gray-800 mt-0.5 line-clamp-1">{prevAuction.title}</div>
                  </div>
                </Link>
              ) : <span />}

              {nextAuction && (
                <Link
                  to={`/auctions/${nextAuction.slug}`}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors group text-right"
                >
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 text-right">Next</div>
                    <div className="font-medium text-gray-800 mt-0.5 line-clamp-1">{nextAuction.title}</div>
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Latest News ── */}
      {blogs.length > 0 && (
        <section className="border-t border-gray-100 bg-white py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2
              className="text-gray-900 mb-10 text-center"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 400,
              }}
            >
              Latest News
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description prose styles */}
      <style>{`
        .auction-event-description p {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        .auction-event-description strong,
        .auction-event-description b {
          font-weight: 600;
          color: #111827;
          display: block;
          margin-top: 1.25rem;
          margin-bottom: 0.4rem;
        }
        .auction-event-description ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 0.75rem;
        }
        .auction-event-description li {
          margin-bottom: 0.25rem;
        }
        .auction-event-description a {
          color: #16a34a;
          text-decoration: underline;
        }
        .auction-event-description a:hover {
          color: #15803d;
        }
        .auction-event-description h2,
        .auction-event-description h3 {
          font-family: Georgia, serif;
          font-weight: 400;
          color: #111827;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  )
}
