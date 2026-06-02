import React from 'react'

const FEATURES = [
  'Viewing Process',
  'The Registration Steps',
  'Types of Bidding',
  'The Auction process',
  'Commission and Charges',
  'Payment Process',
  'Checklists & Extras',
]

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0 text-black"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 8.5L6 12L13.5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FeatureItem({ label }) {
  return (
    <div className="flex items-center gap-2">
      <CheckIcon />
      <span
        className="text-sm text-gray-700"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function GuideFeatures() {
  const row1 = FEATURES.slice(0, 4)
  const row2 = FEATURES.slice(4)

  return (
    <section className="py-14 px-6 lg:px-10" style={{ backgroundColor: '#f7f7f7' }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2
          className="text-black mb-10"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
            fontWeight: 400,
          }}
        >
          What our beginners auction guide includes:
        </h2>

        {/* Desktop / tablet: two horizontal rows */}
        <div className="hidden sm:block space-y-5">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {row1.map((item) => (
              <FeatureItem key={item} label={item} />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {row2.map((item) => (
              <FeatureItem key={item} label={item} />
            ))}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="flex flex-col items-start gap-3 sm:hidden">
          {FEATURES.map((item) => (
            <FeatureItem key={item} label={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
