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

          {/* ── Desktop nav ── */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">
              Home
            </Link>

            <div className="group relative">
              <Link to="/buying-piano" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">
                Buy A Piano
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-3">
                <Link to="/shop/upright-pianos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Upright Pianos</Link>
                <Link to="/shop/grand-pianos"   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Grand Pianos</Link>
                <Link to="/lots"                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Piano Brands</Link>
              </div>
            </div>

            <Link to="/sell-my-piano"  className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">Sell My Piano</Link>
            <Link to="/value-my-piano" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">Value My Piano</Link>

            <div className="group relative">
              {/* Parent label — no navigation */}
              <span className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors cursor-default">
                Our Auctions
              </span>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-64 rounded-xl border border-gray-200 bg-white shadow-xl py-3">
                <Link to="/auction-catalogue"       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Auction Catalogue</Link>
                <Link to="/auction-calendar"        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Auction Calendar / Dates</Link>
                <Link to="/viewing-appointments"    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Viewing Appointments</Link>
                <Link to="/beginners-auction-guide" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Beginners Auction Guide</Link>
                <Link to="/bidding"                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Bidding</Link>
                <Link to="/delivery"                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Delivery</Link>
                <Link to="/past-auctions"           className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Past Auctions</Link>
              </div>
            </div>

            <div className="group relative">
              <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">
                About
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-3">
                <Link to="/news-insight" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">News &amp; Insights</Link>
                <Link to="/faq"          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">FAQ</Link>
              </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">Contact</Link>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg className={`h-6 w-6 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileMenuOpen && (
          <nav className="xl:hidden pb-4 border-t border-gray-200">
            <div className="py-2 space-y-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm">
                Home
              </Link>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">Buy A Piano</div>
                <Link to="/shop/upright-pianos" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Upright Pianos</Link>
                <Link to="/shop/grand-pianos"   onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Grand Pianos</Link>
                <Link to="/lots"                onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Piano Brands</Link>
              </div>

              <Link to="/sell-my-piano"  onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm">Sell My Piano</Link>
              <Link to="/value-my-piano" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm">Value My Piano</Link>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">Our Auctions</div>
                <Link to="/auction-catalogue"       onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Auction Catalogue</Link>
                <Link to="/auction-calendar"        onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Auction Calendar / Dates</Link>
                <Link to="/viewing-appointments"    onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Viewing Appointments</Link>
                <Link to="/beginners-auction-guide" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Beginners Auction Guide</Link>
                <Link to="/bidding"                 onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Bidding</Link>
                <Link to="/delivery"                onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Delivery</Link>
                <Link to="/past-auctions"           onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">Past Auctions</Link>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-gray-800 mb-2 hover:text-gray-600">About</Link>
                <Link to="/news-insight" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">News &amp; Insights</Link>
                <Link to="/faq"          onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 text-sm">FAQ</Link>
              </div>

              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm">Contact</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
