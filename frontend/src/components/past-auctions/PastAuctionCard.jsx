import React from 'react'
import { useNavigate } from 'react-router-dom'

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function formatCardDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const day   = d.getDate()
  const month = d.toLocaleString('en-GB', { month: 'long' })
  const year  = d.getFullYear()
  return `${getOrdinal(day)} ${month} ${year} Auction Catalogue`
}

function Placeholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 gap-2 p-4 select-none">
      <div className="text-center">
        <div className="text-2xl mb-2">🎹</div>
        <div className="text-[11px] font-bold text-gray-500 leading-tight tracking-wide">
          Piano Auctions Ltd
        </div>
        <div className="text-[10px] text-gray-400 leading-tight mt-0.5">
          Specialist Piano &amp; Keyboard Auctioneers
        </div>
      </div>
      <p className="text-[10px] text-gray-400 italic">Awaiting Images...</p>
    </div>
  )
}

export default function PastAuctionCard({ auction }) {
  const navigate = useNavigate()

  // Find the first lot that has an image
  const coverLot = auction.lots?.find((l) => l.featured_image)

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/past-auctions/${auction.slug}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/past-auctions/${auction.slug}`)}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="w-full aspect-[4/3] overflow-hidden bg-gray-100">
        {coverLot?.featured_image ? (
          <img
            src={coverLot.featured_image}
            alt={auction.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <Placeholder />
        )}
      </div>

      {/* Title */}
      <p className="mt-2 text-[12px] text-gray-600 leading-snug">
        {formatCardDate(auction.start_time)}
      </p>
    </div>
  )
}
