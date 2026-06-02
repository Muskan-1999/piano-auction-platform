import React from 'react'

const PARTNERS = [
  {
    id: 'griffin',
    name: 'Griffin Transport UK',
    tagline: 'GRIFFIN TRANSPORT UK',
    description:
      'Griffin Transport UK would be more than delighted to help. For more information please visit https://griffintransport.co.uk/ or call them on +44 (0) 1923 711 711',
    url: 'https://griffintransport.co.uk',
    bannerColor: 'bg-red-700',
    bannerText: 'text-white',
    icon: '🎹',
  },
  {
    id: 'butler',
    name: 'Butler Smith',
    tagline: 'Butler Smith\nPIANO CARRIERS',
    description:
      'Butler Smith Specialist Carriers would be more than delighted to help. For more information please visit www.butlersmith.co.uk or call them on +44 (0) 1487 814 263',
    url: 'https://www.butlersmith.co.uk',
    bannerColor: 'bg-white',
    bannerText: 'text-gray-900',
    icon: '🎹',
  },
  {
    id: 'griffioen',
    name: 'Griffioen Transport (EU)',
    tagline: 'GRIFFIOEN TRANSPORT',
    description:
      'Griffioen Transport would be more than delighted to help. For more information please visit https://griffioentransport.nl or call them on (0031) 172 61 26 44',
    url: 'https://griffioentransport.nl',
    bannerColor: 'bg-red-700',
    bannerText: 'text-white',
    icon: '🎹',
  },
]

function PianoIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 8a2 2 0 012-2h24c5.523 0 10 4.477 10 10v2a2 2 0 01-2 2H8a2 2 0 01-2-2V8zm2 0v12h30v-2C38 13.477 34.523 10 30 10H8V8zM8 24h32v16H8V24z" />
    </svg>
  )
}

export default function DeliveryPartners() {
  return (
    <section className="py-20 px-6 lg:px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="group flex flex-col bg-white border border-white/10 hover:border-white/30 transition-colors"
            >
              {/* Colored banner / logo area */}
              <div
                className={`${partner.bannerColor} flex items-center justify-center px-6 py-8 min-h-[120px]`}
              >
                {partner.id === 'butler' ? (
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <PianoIcon className="w-10 h-10 text-gray-900" />
                      <div className="text-left">
                        <p
                          className="text-gray-900 leading-tight"
                          style={{
                            fontFamily: 'Georgia, serif',
                            fontSize: '1.3rem',
                            fontWeight: 400,
                          }}
                        >
                          Butler Smith
                        </p>
                        <p className="text-xs tracking-[0.15em] text-gray-700 uppercase font-medium">
                          PIANO CARRIERS
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center flex items-center gap-3">
                    <PianoIcon className="w-10 h-10 text-white opacity-90" />
                    <p
                      className={`${partner.bannerText} font-black tracking-wide text-left`}
                      style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: 1.2 }}
                    >
                      {partner.tagline.split('\n').map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>

              {/* Card content */}
              <div className="flex flex-col flex-1 p-6 bg-white">
                <h3
                  className="text-gray-900 mb-3"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.1rem',
                    fontWeight: 400,
                  }}
                >
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-6 flex-1">
                  {partner.description}
                </p>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border border-gray-300 text-gray-700 text-xs font-semibold tracking-wider uppercase py-2.5 px-5 text-center hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
                >
                  View Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
