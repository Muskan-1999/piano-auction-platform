import React from 'react'
import { Link } from 'react-router-dom'

const DEFAULT_CARDS = [
  {
    title: 'Buy A Piano',
    description:
      'Learn about our online piano auctions and how to purchase the perfect grand or upright piano for your home.',
    href: '/buying-piano',
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&q=80',
  },
  {
    title: 'Sell My Piano',
    description:
      'Find out how to sell your instrument in one of our world leading auctions.',
    href: '/sell-my-piano',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80',
  },
  {
    title: 'Value My Piano',
    description:
      'Find out how much your piano is worth at auction. Our specialist team can give you a valuation for your upright piano or grand piano.',
    href: '/value-my-piano',
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80',
  },
]

export default function FurtherInformation({ cards = DEFAULT_CARDS }) {
  return (
    <section className="py-20 px-6 lg:px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-3">
            USE OUR SERVICES TODAY
          </p>
          <h2
            className="text-white"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 400,
            }}
          >
            Further Information
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group flex flex-col bg-black border border-white/10 hover:border-white/30 transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 400 }}
                >
                  {card.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed mb-6 flex-1">
                  {card.description}
                </p>
                <Link
                  to={card.href}
                  className="inline-block border border-white/50 text-white text-xs font-semibold tracking-wider uppercase py-2.5 px-5 text-center hover:bg-white hover:text-black transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
