import React, { useEffect, useState } from 'react'
import { fetchAuctions } from '../../services/auctionService'
import AuctionStatusBadge from '../../components/auction/AuctionStatusBadge'
import CountdownTimer from '../../components/auction/CountdownTimer'
import { Link } from 'react-router-dom'
import { FiCalendar, FiMapPin } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'

const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%230f172a"/%3E%3C/svg%3E'

export default function PortalUpcoming() {
  const [auctions, setAuctions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAuctions({ status: 'upcoming' })
      .then((res) => setAuctions(res?.data || []))
      .catch(() => setAuctions([]))
      .finally(() => setLoading(false))
  }, [])

  const upcoming = auctions.filter((a) => a.status === 'upcoming')

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-900">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">Coming Soon</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Upcoming Auctions</h1>
          <p className="mt-3 text-sm text-slate-400">
            Register to bid on these upcoming auctions before they go live.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="aspect-[16/9] animate-pulse bg-slate-800" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-slate-800" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : upcoming.length === 0 ? (
          <div className="rounded-2xl bg-slate-900 p-16 text-center">
            <MdGavel className="mx-auto h-10 w-10 text-slate-700" />
            <p className="mt-4 text-slate-400">No upcoming auctions scheduled at this time.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((auction) => (
              <div
                key={auction.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:border-slate-700"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={auction.banner_image || PLACEHOLDER}
                    alt={auction.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.target.src = PLACEHOLDER }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute left-3 top-3">
                    <AuctionStatusBadge status="upcoming" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-base font-bold text-white">{auction.title}</h3>
                  <div className="mt-3 space-y-1.5">
                    {auction.location && (
                      <p className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FiMapPin className="h-3 w-3" /> {auction.location}
                      </p>
                    )}
                    {auction.start_time && (
                      <p className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FiCalendar className="h-3 w-3" />
                        {new Date(auction.start_time).toLocaleString('en-GB', {
                          day: 'numeric', month: 'long', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>

                  {auction.start_time && (
                    <div className="mt-5">
                      <CountdownTimer targetDate={auction.start_time} label="Starts in" />
                    </div>
                  )}

                  <div className="mt-5 flex flex-col gap-2">
                    <Link
                      to={`/auction-portal/auctions/${auction.slug}`}
                      className="w-full rounded-xl bg-amber-400 py-2.5 text-center text-sm font-bold text-slate-950 hover:bg-amber-300"
                    >
                      View Auction
                    </Link>
                    <Link
                      to={`/auction-portal/register-to-bid/${auction.slug}`}
                      className="w-full rounded-xl border border-slate-700 py-2 text-center text-xs font-semibold uppercase tracking-widest text-slate-300 hover:border-amber-400/40 hover:text-amber-300"
                    >
                      Register to Bid
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
