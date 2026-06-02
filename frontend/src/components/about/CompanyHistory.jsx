import React from 'react'

export default function CompanyHistory() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-[900px] mx-auto text-center">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-4">
          ALL ABOUT US
        </p>
        <h2
          className="text-gray-900 mb-8"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
            fontWeight: 400,
          }}
        >
          The History of Piano Auctions Ltd
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Piano Auctions in Bedford has over 35 years of experience and over 20 years of trading. Our piano auctions have a 94% private sale success rate and we are members of the SOFAA (Society of Fine Art Auctioneers and Valuers). Our success is based on our personal and bespoke service catering to the unique needs of all our private buyers and vendors, including solicitors, professional musicians and those in the piano trade.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          30 years later we are proud to say we are the world's largest specialist auctioneers of pianos, with an extensive international client base, trading vendors and buyers from Australia, China, Japan, USA, Europe and the UK. Our success is based on our personal and bespoke service catering to the unique needs of all our private buyers and vendors, including solicitors, professional musicians and those in the piano trade.
        </p>
      </div>
    </section>
  )
}
