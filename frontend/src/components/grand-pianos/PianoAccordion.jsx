import React, { useState } from 'react'

const ITEMS = [
  {
    title: 'Condition Report',
    content:
      'Available soon! This report is based on a cursory examination and is our opinion only. It does not constitute a guarantee and potential buyers should satisfy themselves about the lot before bidding.',
  },
  {
    title: 'Additional Information',
    content:
      "Buyer's Premium: 24% plus VAT.\n\nDelivery: Fill out our form below to receive your transport quote.\n\nThis piano is sold by Piano Auctions Ltd. For more information: info@pianoauctions.co.uk",
  },
]

export default function PianoAccordion() {
  const [openIdx, setOpenIdx] = useState(null)
  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i))

  return (
    <div className="border-t border-gray-200">
      {ITEMS.map((item, i) => (
        <div key={i} className="border-b border-gray-200">
          <button
            onClick={() => toggle(i)}
            className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
            aria-expanded={openIdx === i}
          >
            <span className="text-sm text-gray-800 font-medium">{item.title}</span>
            <span className="text-gray-500 text-xl leading-none select-none flex-shrink-0 ml-3">
              {openIdx === i ? '−' : '+'}
            </span>
          </button>

          <div
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: openIdx === i ? '500px' : '0' }}
          >
            <p className="text-sm text-gray-600 leading-relaxed pb-4 pr-6 whitespace-pre-line">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
