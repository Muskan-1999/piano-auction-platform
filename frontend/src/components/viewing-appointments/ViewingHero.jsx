import React from 'react'
import { Link } from 'react-router-dom'

export default function ViewingHero() {
  return (
    <section className="bg-white py-16 px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-center">
        <h1
          className="text-gray-900 leading-tight mb-4"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 400,
          }}
        >
          Viewing Appointments
        </h1>

        <nav className="text-xs text-gray-400 flex items-center justify-center gap-1.5 mb-8">
          <Link to="/" className="hover:text-gray-700 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-600">Viewing Appointments</span>
        </nav>

        <p className="text-gray-600 text-sm leading-relaxed mb-10 max-w-2xl mx-auto">
          Book your viewing appointments with Piano Auctions Ltd in Watford or Bodegraven and play our
          pianos for sale. Take a look at our viewing appointments for the next auction below and book your
          slot in time for our next online auction.
        </p>

        <div className="space-y-3 text-sm text-gray-700 text-center">
          <p>
            <span className="font-semibold">EU – June 2026 – </span>
            To be confirmed.
          </p>
          <p className="font-semibold">
            UK – Friday 19th, Saturday 20th, Sunday 21st, Monday 22nd June 2026 – 09:00 to 17:00
          </p>
        </div>
      </div>
    </section>
  )
}
