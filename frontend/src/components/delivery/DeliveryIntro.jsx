import React from 'react'

export default function DeliveryIntro({ onQuoteClick }) {
  return (
    <section className="py-20 px-6 lg:px-10 bg-white">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-gray-900 mb-6"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          Our Simple Ways To Get Your Piano Delivered
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto">
          All pianos have to be removed from the auction venue by 16:00 on the Thursday following
          the auction. If you are using another carrier other than Griffin Transport UK, Butler Smith
          or Griffioen Transport (EU) they will need to arrange a collection time and date directly with the
          venue. Pianos not collected by this time will be subject to a storage and transfer charge.
          Please see our Terms and Conditions for more details.
        </p>

        <button
          onClick={onQuoteClick}
          className="inline-block border border-gray-900 text-gray-900 text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-gray-900 hover:text-white transition-colors"
        >
          Get Your Delivery Quote
        </button>
      </div>
    </section>
  )
}
