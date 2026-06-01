import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiCalendar, FiMapPin, FiRefreshCw } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import { useMyRegistrations } from '../../hooks/queries/useMyRegistrations'
import { fetchLiveAuctions } from '../../services/auctionService'
import AuctionStatusBadge from '../../components/auction/AuctionStatusBadge'

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%230f172a"/%3E%3C/svg%3E'

export default function PortalLive() {
  const { user }     = useAuth() || {}
  const [auctions,     setAuctions]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [lastUpdated,  setLastUpdated]  = useState(null)
  const intervalRef = useRef(null)

  // Polls every 3 s — registration status updates automatically
  const { data: registrationMap = {} } = useMyRegistrations(user?.id)

  async function load(showLoading = false) {
    if (showLoading) setLoading(true)
    try {
      const res = await fetchLiveAuctions()
      setAuctions(res?.data || [])
      setLastUpdated(new Date())
    } catch { /* ignore */ }
    finally { setLoading(false) }
  }

  useEffect(() => {
    load(true)
    intervalRef.current = setInterval(() => load(), 30000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-900">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-red-400">Live Now</p>
              </div>
              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Live Auctions</h1>
              {lastUpdated && (
                <p className="mt-1 text-sm text-slate-500">
                  Updated {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
            <button
              onClick={() => load(false)}
              className="flex items-center gap-2 rounded-xl border border-slate-800 px-4 py-2 text-sm text-slate-400 transition hover:border-slate-700 hover:text-white"
            >
              <FiRefreshCw className="h-4 w-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="aspect-[16/7] animate-pulse bg-slate-800" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-1/4 animate-pulse rounded bg-slate-800" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-800" />
                  <div className="h-10 w-full animate-pulse rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : auctions.length === 0 ? (
          <div className="rounded-2xl bg-slate-900 p-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
              <MdGavel className="h-8 w-8 text-slate-600" />
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-300">No Live Auctions</p>
            <p className="mt-2 text-sm text-slate-500">
              There are no auctions live at the moment.
            </p>
            <Link
              to="/auction-portal/upcoming"
              className="mt-6 inline-block rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300"
            >
              View Upcoming Auctions
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {auctions.map((auction) => (
              <LiveAuctionCard
                key={auction.id}
                auction={auction}
                registrationStatus={user ? (registrationMap[auction.id] ?? null) : null}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function LiveAuctionCard({ auction, registrationStatus, user }) {
  const navigate = useNavigate()
  const portalUrl = `/auction-portal/auctions/${auction.slug}`
  const regUrl    = `/auction-portal/register-to-bid/${auction.slug}`

  function handleRegister(e) {
    e.preventDefault()
    if (!user) {
      navigate('/auction-portal/login')
    } else {
      navigate(regUrl)
    }
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-red-900/20 bg-slate-900 shadow-lg shadow-black/30">
      {auction.banner_image && (
        <div className="relative aspect-[16/7] overflow-hidden">
          <img
            src={auction.banner_image}
            alt={auction.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => { e.target.src = PLACEHOLDER }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute left-4 top-4">
            <AuctionStatusBadge status="live" />
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            {auction.auction_type && (
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">
                {auction.auction_type} Auction
              </p>
            )}
            <h3 className="text-xl font-bold text-white">{auction.title}</h3>
          </div>
          <span className="relative flex h-3 w-3 shrink-0 mt-1">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
          {auction.location && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <FiMapPin className="h-3.5 w-3.5 shrink-0" />
              {auction.location}
            </span>
          )}
          {auction.start_time && (
            <span className="flex items-center gap-1.5 text-xs text-slate-400">
              <FiCalendar className="h-3.5 w-3.5 shrink-0" />
              {new Date(auction.start_time).toLocaleString('en-GB', {
                day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
              })}
            </span>
          )}
        </div>

        {/* Action buttons — registration-aware */}
        <div className="mt-5">
          {registrationStatus === 'approved' ? (
            /* Approved: only show Join Auction */
            <Link
              to={portalUrl}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Join Live Auction
            </Link>

          ) : registrationStatus === 'pending' ? (
            /* Pending: show Join (view only) + pending badge */
            <div className="flex gap-3">
              <Link
                to={portalUrl}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-center text-sm font-bold text-white transition hover:bg-red-500"
              >
                Join Live Auction
              </Link>
              <span className="flex flex-1 items-center justify-center rounded-xl border border-amber-700/40 bg-amber-950/30 py-2.5 text-xs font-semibold text-amber-400">
                <span className="relative mr-2 flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                </span>
                Pending
              </span>
            </div>

          ) : registrationStatus === 'rejected' ? (
            /* Rejected: can still view, show status */
            <div className="flex gap-3">
              <Link
                to={portalUrl}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-center text-sm font-bold text-white transition hover:bg-red-500"
              >
                View Auction
              </Link>
              <span className="flex flex-1 items-center justify-center rounded-xl border border-slate-700 py-2.5 text-xs font-semibold text-slate-500">
                Not Approved
              </span>
            </div>

          ) : (
            /* Not registered: show Join + Register to Bid */
            <div className="flex gap-3">
              <Link
                to={portalUrl}
                className="flex-1 rounded-xl bg-red-600 py-2.5 text-center text-sm font-bold text-white transition hover:bg-red-500"
              >
                Join Live Auction
              </Link>
              <button
                onClick={handleRegister}
                className="flex-1 rounded-xl border border-slate-700 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
              >
                Register to Bid
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
