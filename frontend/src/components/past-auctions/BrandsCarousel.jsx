import React, { useRef, useState } from 'react'

const BRANDS = [
  { name: 'Schimmel', sub: 'PIANOS',    hoverColor: '#1a1a1a' },
  { name: 'Sauter',   sub: 'EST. 1819', hoverColor: '#1a1a1a' },
  { name: 'PETROF',   sub: 'EST. 1864', hoverColor: '#c8960a' },
  { name: 'KAWAI',    sub: 'EST. 1927', hoverColor: '#cc2020' },
  { name: 'W.Hoffmann', sub: 'PIANOS', hoverColor: '#1a1a1a' },
]

export default function BrandsCarousel() {
  const trackRef  = useRef(null)
  const [active, setActive] = useState(0)

  function scrollTo(idx) {
    setActive(idx)
    if (!trackRef.current) return
    const items = trackRef.current.children
    if (items[idx]) {
      items[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }

  function scrollPrev() {
    const next = Math.max(0, active - 1)
    scrollTo(next)
  }

  function scrollNext() {
    const next = Math.min(BRANDS.length - 1, active + 1)
    scrollTo(next)
  }

  return (
    <section className="py-16 px-6 bg-white border-t border-gray-100">
      <div className="max-w-screen-xl mx-auto">

        {/* Labels */}
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-2">
            Brands At Auction
          </p>
          <h2
            className="text-gray-900"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 400,
            }}
          >
            Pianos We Sell
          </h2>
        </div>

        {/* Carousel row */}
        <div className="relative flex items-center gap-3">

          {/* Prev arrow */}
          <button
            onClick={scrollPrev}
            disabled={active === 0}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
            aria-label="Previous brand"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scrollable track */}
          <div
            ref={trackRef}
            className="flex-1 flex items-center justify-center gap-8 md:gap-14 overflow-x-auto scrollbar-hide py-2"
            style={{ scrollbarWidth: 'none' }}
          >
            {BRANDS.map((brand, i) => (
              <button
                key={brand.name}
                onClick={() => scrollTo(i)}
                className="flex-shrink-0 flex flex-col items-center gap-0.5 group transition-all duration-300 focus:outline-none"
                style={{ filter: i === active ? 'none' : 'grayscale(100%)', opacity: i === active ? 1 : 0.45 }}
              >
                <span
                  className="leading-none transition-colors duration-300"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    color: i === active ? brand.hoverColor : '#374151',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {brand.name}
                </span>
                {brand.sub && (
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    {brand.sub}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={scrollNext}
            disabled={active === BRANDS.length - 1}
            className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
            aria-label="Next brand"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {BRANDS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all duration-200 ${
                i === active
                  ? 'w-4 h-1.5 bg-gray-700'
                  : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to brand ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
