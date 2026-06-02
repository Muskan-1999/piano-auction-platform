import React from 'react'
import { Link } from 'react-router-dom'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&q=80'

function formatTime(isoString) {
  if (!isoString) return ''
  const d = new Date(isoString)
  return d
    .toLocaleTimeString('en-GB', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
    .toLowerCase()
}

export default function AuctionCard({ auction }) {
  const { title, slug, banner_image, start_time, end_time, location } = auction

  const image = banner_image || FALLBACK_IMAGE

  const timeRange = [formatTime(start_time), formatTime(end_time)]
    .filter(Boolean)
    .join(' – ')

  return (
    <div className="border border-gray-200 bg-white flex flex-col h-full">
      {/* Image */}
      <div className="overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMAGE
          }}
        />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3
          className="text-gray-900 text-base leading-snug"
          style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
        >
          {title}
        </h3>

        {timeRange && (
          <p className="text-gray-600 text-sm">{timeRange}</p>
        )}

        {location && (
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {location}
          </p>
        )}

        <div className="mt-auto pt-3">
          <Link
            to={`/auctions/${slug}`}
            className="text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-500 transition-colors"
          >
            View Event
          </Link>
        </div>
      </div>
    </div>
  )
}
