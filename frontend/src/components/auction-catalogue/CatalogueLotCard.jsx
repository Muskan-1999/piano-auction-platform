import React from 'react'
import { useNavigate } from 'react-router-dom'

function Placeholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-2 p-3 select-none">
      <div className="text-center">
        <div className="text-base mb-1">🎹</div>
        <div className="text-[10px] font-bold text-gray-500 leading-tight tracking-wide">
          Piano Auctions Ltd
        </div>
        <div className="text-[9px] text-gray-400 leading-tight mt-0.5">
          Specialist Piano &amp; Keyboard Auctioneers
        </div>
      </div>
      <p className="text-[9px] text-gray-400 italic">Awaiting Images...</p>
    </div>
  )
}

function formatEstimate(lot) {
  // Extract from title first: "Est. £800-£1,000" or "Est. £800-£1,000 Plus VAT"
  const match = lot.title
    ? lot.title.match(/Est\.\s*(£[\d,]+[-–]£[\d,]+(?:\s+Plus\s+VAT)?)/i)
    : null
  if (match) return match[1].trim()

  // Fall back to starting_bid / reserve_price fields
  const fmt = (n) => Number(n).toLocaleString('en-GB')
  if (!lot.starting_bid) return ''
  if (!lot.reserve_price || Number(lot.starting_bid) === Number(lot.reserve_price)) {
    return `£${fmt(lot.starting_bid)}`
  }
  return `£${fmt(lot.starting_bid)}–£${fmt(lot.reserve_price)}`
}

function getLotPath(lot) {
  const title = lot.title || ''
  if (title.includes('Grand')) return `/shop/grand-pianos/${lot.slug}`
  if (title.includes('Upright')) return `/shop/upright-pianos/${lot.slug}`
  return `/shop/other/${lot.slug}`
}

export default function CatalogueLotCard({ lot }) {
  const navigate = useNavigate()
  const estimate = formatEstimate(lot)
  const path = getLotPath(lot)

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={() => navigate(path)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(path)}
      className="group block border border-gray-200 hover:border-gray-500 hover:shadow-md transition-all duration-200 bg-white cursor-pointer"
      style={{ borderWidth: '0.5px' }}
    >
      {/* Image area */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        {lot.featured_image ? (
          <img
            src={lot.featured_image}
            alt={lot.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <Placeholder />
        )}
      </div>

      {/* Info */}
      <div className="p-2 border-t border-gray-100">
        <p className="text-[11px] text-gray-800 leading-snug font-medium line-clamp-2">
          {lot.title}
        </p>
        {estimate && (
          <p className="text-[10px] text-gray-500 mt-0.5">
            Est. {estimate}
          </p>
        )}
      </div>
    </div>
  )
}
