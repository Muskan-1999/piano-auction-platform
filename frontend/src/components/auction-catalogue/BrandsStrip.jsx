import React from 'react'

const BRANDS = [
  { name: 'C. Bechstein', subtitle: 'Est. 1853' },
  { name: 'Blüthner',     subtitle: 'Est. 1853' },
  { name: 'Bösendorfer',  subtitle: 'Est. 1828' },
  { name: 'Boston',       subtitle: 'by Steinway' },
]

export default function BrandsStrip() {
  return (
    <section className="py-14 px-6 bg-[#faf9f7] border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto">

        {/* Label */}
        <p className="text-center text-[11px] uppercase tracking-[0.3em] text-amber-600 mb-8">
          Pianos We Sell
        </p>

        {/* Scrollable brand row */}
        <div className="flex items-center justify-center gap-8 md:gap-16 overflow-x-auto pb-2 scrollbar-hide">
          {BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="flex-shrink-0 flex flex-col items-center gap-1 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default select-none"
            >
              {/* Brand name styled as a wordmark */}
              <span
                className="text-gray-900 leading-none"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                }}
              >
                {brand.name}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
                {brand.subtitle}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
