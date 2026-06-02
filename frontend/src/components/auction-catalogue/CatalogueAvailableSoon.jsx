import React from 'react'
import { Link } from 'react-router-dom'

export default function CatalogueAvailableSoon() {
  return (
    <section id="catalogue" className="py-24 px-6 bg-white">
      <div className="max-w-md mx-auto text-center">
        {/* Logo mark */}
        <div className="text-4xl mb-4">🎹</div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 mb-4">
          Piano Auctions Ltd
        </p>
        <h2
          className="text-gray-900 mb-3"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 400,
          }}
        >
          Catalogue Available Soon.
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          Our next auction catalogue will be published here shortly. In the meantime, browse
          our past auction results or get in touch with our team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/past-auctions"
            className="inline-flex items-center justify-center px-7 py-3 bg-gray-900 text-white text-sm font-medium tracking-wide hover:bg-gray-700 transition-colors w-full sm:w-auto"
          >
            View Past Auctions
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-7 py-3 border border-gray-800 text-gray-800 text-sm font-medium tracking-wide hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  )
}
