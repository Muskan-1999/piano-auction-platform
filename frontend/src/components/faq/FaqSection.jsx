import React from 'react'
import FaqAccordion from './FaqAccordion'

export default function FaqSection({ title, items, background = 'white' }) {
  const bg = background === 'cream' ? '#f5ede4' : '#ffffff'

  return (
    <section className="py-16 px-6 lg:px-10" style={{ backgroundColor: bg }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:gap-16">
          {/* Left: heading with left border accent */}
          <div className="md:w-64 flex-shrink-0 mb-8 md:mb-0">
            <div className="flex items-start gap-4">
              <div
                className="w-1 bg-gray-800 flex-shrink-0"
                style={{ minHeight: '80px' }}
              />
              <h2
                className="text-gray-900 leading-snug"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                  fontWeight: 400,
                }}
              >
                {title}
              </h2>
            </div>
          </div>

          {/* Right: accordion */}
          <div className="flex-1">
            <FaqAccordion items={items} />
          </div>
        </div>
      </div>
    </section>
  )
}
