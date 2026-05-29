import React, { useEffect, useState } from 'react'
import AuctionCard from './AuctionCard'

const LIVE_AUCTIONS = [
  {
    id: 101,
    title: 'Live: Grand Piano Selection - Day 1',
    slug: 'live-grand-piano-day-1',
    location: 'London, UK',
    status: 'LIVE NOW',
    image_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    starts_at: new Date(Date.now() - 2 * 60 * 60 * 1000),
    ends_at: new Date(Date.now() + 3 * 60 * 60 * 1000),
    lots: Array(24).fill(null),
  },
  {
    id: 102,
    title: 'Live: Antique Piano Collection',
    slug: 'live-antique-piano-collection',
    location: 'Paris, France',
    status: 'LIVE NOW',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    starts_at: new Date(Date.now() - 1 * 60 * 60 * 1000),
    ends_at: new Date(Date.now() + 4 * 60 * 60 * 1000),
    lots: Array(18).fill(null),
  },
  {
    id: 103,
    title: 'Live: Upright Piano Selection',
    slug: 'live-upright-piano-selection',
    location: 'Berlin, Germany',
    status: 'LIVE NOW',
    image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
    starts_at: new Date(Date.now() - 30 * 60 * 1000),
    ends_at: new Date(Date.now() + 5 * 60 * 60 * 1000),
    lots: Array(20).fill(null),
  },
]

export default function LiveAuctionsSection() {
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-red-50 to-white w-full">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full bg-red-600 ${pulse ? 'animate-pulse' : ''}`}></div>
            <p className="text-red-600 font-semibold tracking-widest uppercase text-sm">Now Happening</p>
            <div className={`w-3 h-3 rounded-full bg-red-600 ${pulse ? 'animate-pulse' : ''}`}></div>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Live Auctions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of bidders worldwide in real-time piano auctions with live video and expert commentary
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LIVE_AUCTIONS.map((auction) => (
            <div key={auction.id} className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg blur opacity-75"></div>
              <div className="relative">
                <AuctionCard auction={auction} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/live-auction"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Join Live Bidding →
          </a>
        </div>
      </div>
    </section>
  )
}
