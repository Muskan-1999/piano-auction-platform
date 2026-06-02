import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'
import PastLotCard from '../components/past-auctions/PastLotCard'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d    = new Date(dateStr)
  const day  = d.getDate()
  const mon  = d.toLocaleString('en-GB', { month: 'long' })
  const year = d.getFullYear()
  return `${getOrdinal(day)} ${mon} ${year}`
}

function SkeletonCard() {
  return (
    <div className="animate-pulse border border-gray-100">
      <div className="aspect-square bg-gray-200" />
      <div className="p-2 space-y-1">
        <div className="h-2.5 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}

export default function PastAuctionDetailPage() {
  const { slug } = useParams()
  const [auction, setAuction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    api
      .get('auctions/past')
      .then((res) => {
        const found = res.data.find((a) => a.slug === slug)
        if (found) {
          setAuction(found)
          document.title = `${found.title} | Piano Auctions Ltd`
        } else {
          setError(true)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <section
        className="relative flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, minHeight: '280px' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 pb-10">
          <nav className="mb-3 text-xs text-white/60 flex items-center gap-1">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-1">&rsaquo;</span>
            <Link to="/past-auctions" className="hover:text-white transition-colors">Past Auctions</Link>
            {auction && (
              <>
                <span className="mx-1">&rsaquo;</span>
                <span className="text-white/80">{auction.title}</span>
              </>
            )}
          </nav>
          <p className="text-[11px] uppercase tracking-[0.35em] text-amber-400 mb-2">
            Piano Auctions Ltd
          </p>
          <h1
            className="text-white"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
              fontWeight: 400,
            }}
          >
            {loading ? 'Loading…' : error ? 'Auction Not Found' : auction?.title}
          </h1>
          {auction?.start_time && (
            <p className="text-white/70 text-sm mt-1">{formatDate(auction.start_time)}</p>
          )}
        </div>
      </section>

      {/* ── Lot grid ── */}
      <section className="py-12 px-4 md:px-8 lg:px-12">
        <div className="max-w-screen-2xl mx-auto">

          {/* Error / not found */}
          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm mb-4">
                This auction could not be found or is no longer available.
              </p>
              <Link
                to="/past-auctions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                ← Back to Past Auctions
              </Link>
            </div>
          )}

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Lot cards */}
          {!loading && !error && auction && (
            <>
              {auction.lots?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {auction.lots.map((lot) => (
                    <PastLotCard key={lot.id} lot={lot} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-sm py-16">
                  No lots available for this auction.
                </p>
              )}
            </>
          )}

        </div>
      </section>

      {/* ── Back link ── */}
      {!loading && !error && (
        <div className="pb-12 px-6 text-center">
          <Link
            to="/past-auctions"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Back to Past Auctions
          </Link>
        </div>
      )}

    </div>
  )
}
