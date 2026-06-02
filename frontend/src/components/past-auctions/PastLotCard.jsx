import React from 'react'

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

function formatSoldDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatPrice(amount) {
  if (!amount && amount !== 0) return ''
  return Number(amount).toLocaleString('en-GB')
}

export default function PastLotCard({ lot }) {
  return (
    <div className="border border-gray-200 bg-white" style={{ borderWidth: '0.5px' }}>
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        {lot.featured_image ? (
          <img
            src={lot.featured_image}
            alt={lot.title}
            className="w-full h-full object-cover"
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
        {lot.winning_bid_amount && (
          <p className="text-[10px] text-gray-600 mt-1 font-medium">
            Sold for: £{formatPrice(lot.winning_bid_amount)}
          </p>
        )}
        {lot.sold_at && (
          <p className="text-[9px] text-gray-400 mt-0.5">
            {formatSoldDate(lot.sold_at)}
          </p>
        )}
      </div>
    </div>
  )
}
