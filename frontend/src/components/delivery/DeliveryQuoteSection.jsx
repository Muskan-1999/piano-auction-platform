import React from 'react'
import DeliveryQuoteForm from '../grand-pianos/DeliveryQuoteForm'

export default function DeliveryQuoteSection({ sectionRef }) {
  return (
    <div ref={sectionRef} className="bg-white">
      <div className="pt-20 px-6 lg:px-10">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-3">
            PIANO AUCTIONS LTD
          </p>
          <h2
            className="text-gray-900"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 400,
            }}
          >
            Get A Delivery Quote
          </h2>
        </div>
      </div>
      <DeliveryQuoteForm hideTitle />
    </div>
  )
}
