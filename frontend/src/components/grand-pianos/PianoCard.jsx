import React from 'react'
import { Link } from 'react-router-dom'

const CATEGORY_PATH = {
  grand: '/shop/grand-pianos',
  upright: '/shop/upright-pianos',
}

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

export default function PianoCard({ piano, category = 'grand' }) {
  const basePath = CATEGORY_PATH[category] ?? CATEGORY_PATH.grand

  return (
    <Link
      to={`${basePath}/${piano.slug}`}
      className="group block border border-gray-200 hover:border-gray-500 hover:shadow-md transition-all duration-200 bg-white"
    >
      {/* Image area */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        {piano.image ? (
          <img
            src={piano.image}
            alt={piano.name}
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
          – {piano.name} –
        </p>
        <p className="text-[10px] text-gray-500 mt-0.5">| Est. {piano.est}</p>
      </div>
    </Link>
  )
}
