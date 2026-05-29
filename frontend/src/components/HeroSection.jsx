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
        <div className="w-full px-4 md:px-8 lg:px-12 py-16 md:py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
            {/* Left Side - Content */}
            <div className="text-white">
              {/* Breadcrumb */}
              <div className="text-sm text-yellow-500 mb-6 flex items-center gap-2">
                <Link to="/" className="hover:underline">Home</Link>
                <span>›</span>
                <span>Buying A Piano</span>
              </div>

              {/* Label */}
              <div className="text-sm font-semibold tracking-widest text-yellow-600 mb-4 uppercase">
                BUY A PIANO TODAY
              </div>

              {/* Heading */}
              <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Buy A Piano At Auction
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
                Buy your piano at auction with our trusted experts. We have a full range of piano brands to buy, view our latest piano auction catalogue.
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-8 text-sm md:text-base">
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

            {/* Right Side - Register Card */}
            <div className="flex items-center justify-center md:justify-end">
              <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-md w-full">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                  Register To Bid
                </h2>

                <p className="text-gray-700 text-center mb-8 leading-relaxed">
                  Bid for your favourite piano or watch the latest auction live with{' '}
                  <a href="#" className="font-semibold hover:underline">
                    easyliveauction.com
                  </a>
                </p>

                <div className="space-y-4">
                  <button className="w-full border-2 border-gray-900 text-gray-900 font-semibold py-3 px-6 rounded hover:bg-gray-900 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                    <span>🇬🇧</span>
                    UK - BID NOW
                  </button>

                  <button className="w-full border-2 border-gray-900 text-gray-900 font-semibold py-3 px-6 rounded hover:bg-gray-900 hover:text-white transition-colors duration-300">
                    OTHER WAYS TO BID
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
  

