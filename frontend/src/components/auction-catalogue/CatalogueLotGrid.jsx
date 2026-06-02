import React from 'react'
import CatalogueLotCard from './CatalogueLotCard'

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function formatAuctionDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.toLocaleString('en-GB', { month: 'long' })
  const year = date.getFullYear()
  return `${getOrdinal(day)} ${month} ${year}`
}

function SkeletonCard() {
  return (
    <div className="border border-gray-100 bg-white animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-2 space-y-1.5">
        <div className="h-2.5 bg-gray-200 rounded w-full" />
        <div className="h-2 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  )
}

export default function CatalogueLotGrid({ auction, loading }) {
  return (
    <section id="catalogue" className="py-12 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-screen-2xl mx-auto">

        {/* Auction date heading */}
        {!loading && auction?.start_time && (
          <div className="mb-8 flex items-center gap-4">
            <div className="w-[3px] bg-gray-800 self-stretch" style={{ minHeight: '36px' }} />
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 mb-1">
                Upcoming Auction
              </p>
              <h2
                className="text-gray-900"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
                  fontWeight: 400,
                }}
              >
                {formatAuctionDate(auction.start_time)}
              </h2>
            </div>
          </div>
        )}

        {/* Skeleton loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Lot cards */}
        {!loading && auction?.lots?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {auction.lots.map((lot) => (
              <CatalogueLotCard key={lot.id} lot={lot} />
            ))}
          </div>
        )}

        {/* Empty lots state */}
        {!loading && auction && auction.lots?.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-12">
            Lots will be listed soon. Please check back shortly.
          </p>
        )}
      </div>
    </section>
  )
}
