import React from 'react'

const LOCATIONS = [
  {
    id:      'uk',
    title:   'Piano Auctions Ltd – UK Auction Location',
    address: '1 Sydney Road | Watford | WD18 7XX',
    mapSrc:
      'https://maps.google.com/maps?q=1+Sydney+Road+Watford+WD18+7XX+UK&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
  {
    id:      'eu',
    title:   'Piano Auctions Ltd – EU Auction Location',
    address: 'Schumanweg 1 | 2411 NH Bodegraven | Netherlands',
    mapSrc:
      'https://maps.google.com/maps?q=Schumanweg+1+2411+NH+Bodegraven+Netherlands&t=&z=15&ie=UTF8&iwloc=&output=embed',
  },
]

export default function AuctionLocationSection() {
  return (
    <section className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-3">
            Where to Find Us
          </p>
          <h2
            className="text-gray-900 mb-4"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 400,
            }}
          >
            Auction Location
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Head down to our auction venues in Watford or Bodegraven and view our collection of grand and upright pianos
          </p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-12" />

        {/* Two location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LOCATIONS.map(loc => (
            <div key={loc.id} className="border border-gray-200">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{loc.title}</h3>
                <p className="text-xs text-gray-500">{loc.address}</p>
              </div>
              <div className="h-64 overflow-hidden">
                <iframe
                  title={loc.title}
                  src={loc.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
