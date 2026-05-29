import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/auctions"
              className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
            >
              Auctions
            </Link>
            <Link
              to="/lots"
              className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
            >
              Lots
            </Link>
            <Link
              to="/absentee-bid"
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
            <a
              href="#"
              className="text-gray-700 hover:text-luxury-600 font-medium text-sm transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-200">
            <div className="py-2 space-y-2">
              <Link
                to="/auctions"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                Auctions
              </Link>
              <Link
                to="/lots"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                Lots
              </Link>
              <Link
                to="/absentee-bid"
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
              <a
                href="#"
                className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
