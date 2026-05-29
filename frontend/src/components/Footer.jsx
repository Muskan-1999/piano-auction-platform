import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-100 w-full">
      <div className="w-full px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-heading font-bold text-luxury-400 mb-4">🎹 Piano Auctions</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premier piano auctions connecting buyers and sellers worldwide for over 25 years.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Auctions</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auctions" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Browse Auctions
                </Link>
              </li>
              <li>
                <Link to="/live-auction" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Live Bidding
                </Link>
              </li>
              <li>
                <Link to="/lots" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Featured Lots
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  How to Bid
                </a>
              </li>
            </ul>
          </div>

          {/* Bidding Options */}
          <div>
            <h4 className="font-bold text-white mb-4">Bidding</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/telephone-bid" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Telephone Bidding
                </Link>
              </li>
              <li>
                <Link to="/absentee-bid" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Absentee Bids
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-bold text-white mb-4">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Piano Auctions Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                <span className="text-lg">𝕏</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-400 transition-colors">
                <span className="text-lg">▶</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
