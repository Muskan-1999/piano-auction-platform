import React from 'react'

function PianoIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="36" height="28" rx="2" fill="#111827" />
      {/* White keys */}
      {[0,1,2,3,4,5,6].map((i) => (
        <rect key={i} x={5 + i * 5} y="8" width="4" height="20" rx="1" fill="white" />
      ))}
      {/* Black keys */}
      {[0,1,3,4,5].map((i) => (
        <rect key={i} x={8 + i * 5} y="8" width="3" height="13" rx="1" fill="#111827" />
      ))}
    </svg>
  )
}

export default function BookingDefault({ onSelect }) {
  return (
    <div className="flex flex-col items-center py-10 px-6">
      {/* Logo */}
      <div className="mb-5 flex flex-col items-center gap-2">
        <PianoIcon />
        <span className="font-bold text-gray-900 text-sm">Piano Auctions Ltd</span>
        <span className="text-[11px] text-gray-400 text-center tracking-wide">
          Specialist Piano &amp; Keyboard Auctioneers
        </span>
      </div>

      <p className="text-xs text-gray-500 text-center mb-7 max-w-xs leading-relaxed">
        Welcome to my scheduling page. Please follow the instructions to add an event to my calendar.
      </p>

      {/* EU Option */}
      <button
        onClick={() => onSelect('eu')}
        className="w-full flex items-start gap-3 p-4 border border-gray-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all mb-2.5 text-left group"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-800 flex items-center justify-between gap-2 group-hover:text-purple-700 transition-colors">
            <span>EU Auction View</span>
            <span className="text-gray-400 text-base font-normal">›</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-3">
            Our Auction Views EU – TBD – EU / TBD Auction PLEASE MAKE SURE YOU HAVE READ THE
            INFORMATION REGARDING VIEWING DAYS ABOVE. Booking: Please choose the nearest...
          </p>
        </div>
      </button>

      {/* UK Option */}
      <button
        onClick={() => onSelect('uk')}
        className="w-full flex items-start gap-3 p-4 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left group"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-800 flex items-center justify-between gap-2 group-hover:text-blue-700 transition-colors">
            <span>UK Auction View</span>
            <span className="text-gray-400 text-base font-normal">›</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-3">
            Our Auction Views: 19th – 22nd June 2026 – UK | (23rd June) Auction PLEASE MAKE SURE
            YOU HAVE READ THE INFORMATION REGARDING VIEWING DAYS ABOVE. Booking: Please...
          </p>
        </div>
      </button>

      <button className="mt-5 text-xs text-gray-400 hover:text-gray-600 transition-colors underline underline-offset-2">
        Cookie settings
      </button>
    </div>
  )
}
