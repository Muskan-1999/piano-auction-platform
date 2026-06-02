import React from 'react'

export default function ImportantInformationBanner() {
  return (
    <section className="py-10 px-6 lg:px-10" style={{ backgroundColor: '#f5ede4' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-2xl text-center text-gray-900 mb-6"
          style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
        >
          Important Information
        </h2>

        <div className="flex gap-4 items-start">
          {/* Circle-ban icon */}
          <div className="flex-shrink-0 mt-0.5">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-700"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Ivory:</strong> It is now illegal to sell a piano with an ivory keyboard
            dating post 1975 without an Ivory Registration Number. Pianos with ivory keyboards
            dating pre 1975 will have been registered with APHA on the government website. All
            pianos dating from 1947–1975 with ivory keys will have an Article 10 certificate in
            place.
          </p>
        </div>
      </div>
    </section>
  )
}
