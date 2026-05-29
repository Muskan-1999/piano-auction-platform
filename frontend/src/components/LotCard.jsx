import React from 'react'
import { Link } from 'react-router-dom'
import CountdownTimer from './CountdownTimer'

export default function LotCard({ lot, auctionSlug }) {
  const image = lot.image_url || 'https://via.placeholder.com/300x300?text=Piano'
  const currentBid = lot.current_bid || lot.starting_price || 0

  return (
    <Link
      to={`/lots/${lot.slug}`}
      className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-luxury-100"
    >
      <div className="relative h-56 overflow-hidden bg-gray-200">
        <img
          src={image}
          alt={lot.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {lot.status === 'LIVE' && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-luxury-500 font-semibold mb-2">
          {lot.type || 'Piano'}
        </p>
        <h3 className="font-heading text-base font-semibold text-gray-900 mb-2 line-clamp-2">
          {lot.title}
        </h3>
        <p className="text-xs text-gray-600 mb-3">{lot.description ? lot.description.substring(0, 50) + '...' : 'Exquisite piano lot'}</p>

        <div className="mb-3 pb-3 border-b border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Current Bid</div>
          <div className="text-lg font-bold text-luxury-600">£{currentBid.toLocaleString()}</div>
        </div>

        {lot.lot_end_date && (
          <div className="mb-3">
            <CountdownTimer endDate={lot.lot_end_date} />
          </div>
        )}

        <button className="w-full bg-luxury-500 hover:bg-luxury-600 text-white font-medium py-2 px-3 rounded transition-colors">
          View Details
        </button>
      </div>
    </Link>
  )
}
