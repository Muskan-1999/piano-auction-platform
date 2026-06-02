import React from 'react'
import { Link } from 'react-router-dom'

const WAREHOUSE_IMAGE =
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=900&q=80'

export default function GuideHero() {
  return (
    <section className="bg-white py-14 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left column */}
          <div className="flex gap-4 lg:gap-5">
            {/* Decorative vertical accent line */}
            <div className="w-[3px] bg-black self-stretch flex-shrink-0" />

            <div>
              <h1
                className="text-black leading-tight mb-4"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                  fontWeight: 400,
                  lineHeight: 1.2,
                }}
              >
                Beginner's Auction Guide for Piano Auctions
              </h1>

              <nav className="flex items-center gap-1 text-xs text-gray-500 mb-5">
                <Link to="/" className="hover:text-black transition-colors">
                  Home
                </Link>
                <span className="text-gray-400 mx-0.5">&#187;</span>
                <span className="text-gray-600">Beginners Auction Guide</span>
              </nav>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                You can download and read our beginner piano auction guide below to get
                ready for the next auction and learn about how to{' '}
                <Link
                  to="/buying-piano"
                  className="text-black underline underline-offset-2 hover:text-gray-600 transition-colors"
                >
                  buy a piano
                </Link>{' '}
                in our auctions.
              </p>

              <p className="text-gray-600 text-sm leading-relaxed">
                Our guide will include information on how to bid online and other methods
                for beginners along with details on payment,{' '}
                <Link
                  to="/buying-piano"
                  className="text-black underline underline-offset-2 hover:text-gray-600 transition-colors"
                >
                  collection and delivery of pianos
                </Link>
                , when you're buying a piano at auction.
              </p>
            </div>
          </div>

          {/* Right column — warehouse image */}
          <div className="w-full overflow-hidden">
            <img
              src={WAREHOUSE_IMAGE}
              alt="Piano auction warehouse"
              className="w-full h-64 sm:h-72 lg:h-80 object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
