import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import AuctionHero from '../components/auction-calendar/AuctionHero'
import AuctionCarousel from '../components/auction-calendar/AuctionCarousel'
import FurtherInformation from '../components/about/FurtherInformation'

export default function AuctionCalendarPage() {
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    document.title = 'Auction Calendar | Piano Auctions Ltd'

    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Browse upcoming piano auctions and auction dates from Piano Auctions Ltd.'
      )
    }

    // Use the PUBLIC auctions endpoint — it uses $request->filled() internally
    // so it correctly returns all visible auctions (upcoming/live/ended) when
    // no status filter is specified. The internal /api/auctions endpoint has a bug
    // where $request->string('status') is always a truthy Stringable object even
    // when absent, causing WHERE status='' which returns nothing.
    api
      .get('public/auctions', {
        params: { per_page: 100, sort_by: 'start_time', sort_order: 'asc' },
      })
      .then((res) => {
        const list = res.data?.data ?? []
        // Sort ascending by start_time (server may not guarantee order)
        const displayable = [...list].sort((a, b) => {
          if (!a.start_time) return 1
          if (!b.start_time) return -1
          return new Date(a.start_time) - new Date(b.start_time)
        })
        setAuctions(displayable)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="w-full">
      {/* Hero */}
      <AuctionHero />

      {/* Carousel Section */}
      <section className="bg-white py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {error ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-sm">
                Unable to load auctions. Please try again later.
              </p>
            </div>
          ) : (
            <AuctionCarousel auctions={auctions} loading={loading} />
          )}
        </div>
      </section>

      {/* Further Information */}
      <FurtherInformation />
    </div>
  )
}
