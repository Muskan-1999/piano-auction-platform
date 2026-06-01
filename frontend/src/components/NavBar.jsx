import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full max-w-none px-0 mx-0">
        <div className="flex items-center justify-between gap-4 py-4 px-4 md:px-6 lg:px-8">
          <Link to="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <div className="text-xl font-serif font-bold text-gray-900">
                🎹 Piano Auctions Ltd
              </div>
              <div className="text-xs text-gray-600 tracking-wide">
                Specialist Piano & Keyboard Auctioneers
              </div>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
            >
              Home
            </Link>

            <div className="group relative">
              <Link
                to="/buying-piano"
                className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
              >
                Buy A Piano
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-3">
                <Link to="/lots" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Upright Pianos</Link>
                <Link to="/lots" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Grand Pianos</Link>
                <Link to="/lots" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Piano Brands</Link>
              </div>
            </div>

            <Link
              to="/sell-my-piano"
              className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
            >
              Sell My Piano
            </Link>
            <a
              href="#"
              className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
            >
              Value My Piano
            </a>

            <div className="group relative">
              <button className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors">
                Our Auctions
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-60 rounded-xl border border-gray-200 bg-white shadow-xl py-3">
                <Link to="/auctions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Auction Catalogue</Link>
                <Link to="/auctions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Auction Calendar</Link>
                <Link to="/auctions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">View Appointments</Link>
                <Link to="/auctions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Bidding</Link>
                <Link to="/auctions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Delivery</Link>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Beginners Auction Guide</a>
              </div>
            </div>

            <div className="group relative">
              <button className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors">
                About
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-3">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">News & Insights</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">FAQ</a>
              </div>
            </div>

            <Link
              to="/contact"
              className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
            >
              Contact
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg
              className={`h-6 w-6 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="xl:hidden pb-4 border-t border-gray-200">
            <div className="py-2 space-y-2">
              <Link
                to="/"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                Home
              </Link>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">Buy A Piano</div>
                <Link to="/lots" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Upright Pianos</Link>
                <Link to="/lots" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Grand Pianos</Link>
                <Link to="/lots" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Piano Brands</Link>
              </div>
              <Link
                to="/sell-my-piano"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                Sell My Piano
              </Link>
              <a
                href="#"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                Value My Piano
              </a>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">Our Auctions</div>
                <Link to="/auctions" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Auction Catalogue</Link>
                <Link to="/auctions" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Auction Calendar</Link>
                <Link to="/auctions" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">View Appointments</Link>
                <Link to="/auctions" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Bidding</Link>
                <Link to="/auctions" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Delivery</Link>
                <a href="#" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Beginners Auction Guide</a>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">About</div>
                <a href="#" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">News & Insights</a>
                <a href="#" className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">FAQ</a>
              </div>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
