import React from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from './CountdownTimer'

export default function AuctionCard({ auction }) {
  const lotsCount = auction.lots?.length || 0
  const image = auction.image_url || 'https://via.placeholder.com/400x300?text=Auction'

  return (
    <Link
      to={`/auctions/${auction.slug}`}
      className="group rounded-lg overflow-hidden shadow-luxury hover:shadow-2xl transition-shadow duration-300 bg-white"
    >
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={auction.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block bg-luxury-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {auction.status || 'Upcoming'}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {auction.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{auction.location}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>{lotsCount} lots</span>
          <span>{new Date(auction.starts_at).toLocaleDateString()}</span>
        </div>
        {auction.ends_at && (
          <div className="mb-3">
            <CountdownTimer endDate={auction.ends_at} />
          </div>
        )}
        <button className="w-full bg-luxury-500 hover:bg-luxury-600 text-white font-medium py-2 px-3 rounded transition-colors">
          View Auction
        </button>
      </div>
    </Link>
  )
}
