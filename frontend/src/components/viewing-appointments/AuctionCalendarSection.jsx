import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'
import AuctionCarousel from '../auction-calendar/AuctionCarousel'

export default function AuctionCalendarSection() {
  const [auctions, setAuctions] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    api.get('public/auctions', { params: { per_page: 12, sort_by: 'start_time', sort_order: 'asc' } })
      .then(res => {
        const list = res.data?.data ?? []
        setAuctions([...list].sort((a, b) => new Date(a.start_time) - new Date(b.start_time)))
      })
      .catch(() => setAuctions([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-20 px-6 lg:px-8" style={{ backgroundColor: '#f5ede4' }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-3">
            Upcoming Events
          </p>
          <h2
            className="text-gray-900"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 400,
            }}
          >
            Auction Calendar
          </h2>
        </div>

        <AuctionCarousel auctions={auctions} loading={loading} />

        <div className="flex justify-center mt-10">
          <Link
            to="/auction-calendar"
            className="border border-gray-800 text-gray-800 text-xs font-semibold tracking-wider uppercase px-10 py-3 hover:bg-gray-800 hover:text-white transition-colors"
          >
            View Auction Calendar
          </Link>
        </div>
      </div>
    </section>
  )
}
