import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&h=800&fit=crop)',
          backgroundAttachment: 'fixed',
        }}
      ></div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative w-full h-full flex items-center">
        <div className="w-full max-w-none px-0 mx-0 py-16 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center h-full px-6 md:px-8 lg:px-16">
            <div className="text-white">
              <div className="text-sm text-yellow-500 mb-4 flex flex-wrap gap-2">
                <Link to="/" className="hover:underline">Home</Link>
                <span>›</span>
                <span>Buying A Piano</span>
              </div>

              <div className="text-sm font-semibold tracking-widest text-yellow-600 mb-4 uppercase">
                BUY A PIANO TODAY
              </div>

              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Buy A Piano At Auction
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Buy your piano at auction with our trusted experts. We have a full range of piano brands to buy, view our latest piano auction catalogue.
              </p>

              <div className="flex flex-wrap gap-6 text-sm md:text-base">
                <a
                  href="#"
                  className="text-yellow-500 hover:text-yellow-400 underline font-medium transition-colors"
                >
                  Upright Pianos
                </a>
                <a
                  href="#"
                  className="text-yellow-500 hover:text-yellow-400 underline font-medium transition-colors"
                >
                  Grand Pianos
                </a>
                <a
                  href="#"
                  className="text-yellow-500 hover:text-yellow-400 underline font-medium transition-colors"
                >
                  Piano Brands
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="bg-white rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.18)] p-8 md:p-10 w-full">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Register To Bid
                </h2>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Bid for your favourite piano or watch the latest auction live with{' '}
                  <a href="#" className="font-semibold hover:underline">
                    easyliveauction.com
                  </a>
                </p>
                <div className="space-y-4">
                  <Link
                    to="/contact"
                    className="w-full inline-flex border-2 border-gray-900 bg-white text-gray-900 font-semibold py-4 rounded-[18px] hover:bg-gray-900 hover:text-white transition-colors duration-300 items-center justify-center gap-3"
                  >
                    <span>🇬🇧</span>
                    UK - BID NOW
                  </Link>
                  <Link to="/bidding" className="w-full border-2 border-gray-900 text-gray-900 font-semibold py-4 rounded-[18px] hover:bg-gray-900 hover:text-white transition-colors duration-300 inline-flex items-center justify-center">
                    OTHER WAYS TO BID
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
  

