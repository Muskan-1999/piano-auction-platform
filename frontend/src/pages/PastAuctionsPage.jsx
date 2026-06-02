import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import PastAuctionCard from '../components/past-auctions/PastAuctionCard'
import BrandsCarousel from '../components/past-auctions/BrandsCarousel'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="w-full aspect-[4/3] bg-gray-200" />
      <div className="mt-2 space-y-1">
        <div className="h-2.5 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  )
}

export default function PastAuctionsPage() {
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)

  useEffect(() => {
    document.title = 'Past Auctions | Piano Auctions Ltd'

    api
      .get('auctions/past')
      .then((res) => setAuctions(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full bg-white">

      {/* ── Hero ── */}
      <section
        className="relative flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, minHeight: '320px' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 py-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-amber-400 mb-3">
            Piano Auctions Ltd
          </p>
          <h1
            className="text-white"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 400,
            }}
          >
            Past Auctions
          </h1>
        </div>
      </section>

      {/* ── Past Auctions Grid ── */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto">

          {/* Error */}
          {error && (
            <p className="text-center text-gray-500 text-sm py-16">
              Unable to load past auctions. Please try again later.
            </p>
          )}

          {/* Empty */}
          {!loading && !error && auctions.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-16">
              No past auctions available yet.
            </p>
          )}

          {/* Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Auction cards */}
          {!loading && !error && auctions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {auctions.map((auction) => (
                <PastAuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Brands carousel ── */}
      <BrandsCarousel />

    </div>
  )
}
