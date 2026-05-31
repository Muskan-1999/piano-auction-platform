import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import { useMyRegistrations } from '../../hooks/queries/useMyRegistrations'
import { fetchAuctions, fetchLiveAuctions } from '../../services/auctionService'
import AuctionStatusBadge from '../../components/auction/AuctionStatusBadge'
import CountdownTimer from '../../components/auction/CountdownTimer'

const AUCTION_PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%230f172a"/%3E%3C/svg%3E'

// ─── AuctionCard — registration-aware ────────────────────────────────────────

function AuctionCard({ auction, registrationStatus }) {
  const navigate  = useNavigate()
  const isLive    = auction.status === 'live'
  const isUpcoming = auction.status === 'upcoming'
  const portalUrl = `/auction-portal/auctions/${auction.slug}`
  const isRegistered = !!registrationStatus   // pending | approved | rejected

  function handleRegister(e) {
    e.preventDefault()
    navigate(`/auction-portal/register-to-bid/${auction.slug}`)
  }

  return (
    <Link
      to={portalUrl}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all hover:border-slate-700 hover:shadow-xl hover:shadow-slate-900/50"
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={auction.banner_image || AUCTION_PLACEHOLDER}
          alt={auction.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = AUCTION_PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="absolute left-3 top-3">
          <AuctionStatusBadge status={auction.status} />
        </div>
        {auction.is_featured && (
          <div className="absolute right-3 top-3 rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-amber-300 backdrop-blur">
            Featured
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          {auction.auction_type && (
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">
              {auction.auction_type} Auction
            </p>
          )}
          <h3 className="text-base font-bold leading-snug text-white">{auction.title}</h3>

          <div className="mt-3 space-y-1.5">
            {auction.location && (
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <FiMapPin className="h-3 w-3 shrink-0" /> {auction.location}
              </p>
            )}
            {auction.start_time && (
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <FiCalendar className="h-3 w-3 shrink-0" />
                {new Date(auction.start_time).toLocaleString('en-GB', {
                  day: 'numeric', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit',
                })}
              </p>
            )}
          </div>

          {isUpcoming && auction.start_time && (
            <div className="mt-4">
              <CountdownTimer targetDate={auction.start_time} compact label="Starts in" />
            </div>
          )}
        </div>

        {/* Footer action row */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="flex items-center gap-1 text-sm font-semibold text-amber-400 transition group-hover:gap-2">
            View Auction <FiArrowRight className="h-4 w-4" />
          </span>

          {/* Only show Register button when NOT already registered */}
          {!isLive && !isRegistered && (
            <button
              onClick={handleRegister}
              className="rounded-full border border-amber-400/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-amber-300/80 transition hover:bg-amber-400/10 hover:text-amber-300"
            >
              Register
            </button>
          )}

          {/* Show approval badge when already registered */}
          {!isLive && registrationStatus === 'pending' && (
            <span className="flex items-center gap-1 rounded-full border border-amber-700/30 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-amber-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
              Pending
            </span>
          )}

          {!isLive && registrationStatus === 'approved' && (
            <span className="rounded-full border border-emerald-700/30 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-emerald-500">
              ✓ Approved
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PortalHome() {
  const { user } = useAuth() || {}

  const [liveAuctions,     setLiveAuctions]     = useState([])
  const [upcomingAuctions, setUpcomingAuctions] = useState([])
  const [recentAuctions,   setRecentAuctions]   = useState([])
  const [loading,          setLoading]          = useState(true)

  // Polls every 3 s — registration status updates across all cards automatically
  const { data: registrationMap = {} } = useMyRegistrations(user?.id)

  useEffect(() => {
    async function load() {
      try {
        const [liveRes, allRes] = await Promise.all([
          fetchLiveAuctions(),
          fetchAuctions(),
        ])
        const live = liveRes?.data || []
        const all  = allRes?.data  || []
        setLiveAuctions(live.slice(0, 3))
        setUpcomingAuctions(all.filter((a) => a.status === 'upcoming').slice(0, 4))
        setRecentAuctions(all.filter((a) => a.status === 'ended').slice(0, 3))
      } catch { /* ignore */ }
      finally { setLoading(false) }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero welcome */}
      <div className="border-b border-slate-900 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">Auction Portal</p>
              <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
                {user ? `Welcome back, ${user.name?.split(' ')[0]}.` : 'Piano Auction Portal'}
              </h1>
              <p className="mt-4 max-w-xl text-base text-slate-400">
                Bid on rare and exceptional pianos from world-renowned makers. Register, bid live, and track your lots in real time.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/auction-portal/catalogue"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  <MdGavel className="h-4 w-4" />
                  Browse Catalogue
                </Link>
                {!user && (
                  <Link
                    to="/auction-portal/register"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
                  >
                    Create Account
                  </Link>
                )}
              </div>
            </div>

            {/* Portal status widget */}
            <div className="shrink-0 rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:min-w-[280px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">Portal Status</p>
              <div className="mt-4 space-y-3">
                <StatusRow label="Account"       value={user ? 'Active' : 'Guest'}             highlight={!!user} />
                <StatusRow
                  label="Email Verified"
                  value={user?.email_verified_at ? 'Verified' : user ? 'Pending' : '—'}
                  highlight={!!user?.email_verified_at}
                />
                <StatusRow
                  label="Live Auctions"
                  value={loading ? '…' : liveAuctions.length}
                  highlight={liveAuctions.length > 0}
                  live={liveAuctions.length > 0}
                />
                <StatusRow label="Upcoming" value={loading ? '…' : upcomingAuctions.length} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">

        {/* Live auctions */}
        {(liveAuctions.length > 0 || loading) && (
          <section>
            <SectionHeader label="Now Live" title="Live Auctions" to="/auction-portal/live" live />
            {loading ? <SkeletonGrid count={3} /> : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {liveAuctions.map((a) => (
                  <AuctionCard
                    key={a.id}
                    auction={a}
                    registrationStatus={user ? (registrationMap[a.id] ?? null) : null}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Upcoming auctions */}
        {(upcomingAuctions.length > 0 || loading) && (
          <section>
            <SectionHeader label="Coming Soon" title="Upcoming Auctions" to="/auction-portal/upcoming" />
            {loading ? <SkeletonGrid count={4} /> : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {upcomingAuctions.map((a) => (
                  <AuctionCard
                    key={a.id}
                    auction={a}
                    registrationStatus={user ? (registrationMap[a.id] ?? null) : null}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Quick links */}
        <section>
          <SectionHeader label="Your Account" title="Quick Access" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'My Bids',          description: 'Track your active bids and status',       to: '/auction-portal/my-bids',     auth: true },
              { label: 'Bid History',       description: 'Review all your past bids',               to: '/auction-portal/bid-history', auth: true },
              { label: 'Watchlist',         description: 'Monitor lots you are interested in',      to: '/auction-portal/watchlist',   auth: true },
              { label: 'Auction Catalogue', description: 'Browse all upcoming and live auctions',   to: '/auction-portal/catalogue',   auth: false },
            ].map((card) => (
              <Link
                key={card.to}
                to={card.auth && !user ? '/auction-portal/login' : card.to}
                className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-amber-400/30 hover:bg-slate-800/50"
              >
                <h3 className="font-bold text-white">{card.label}</h3>
                <p className="mt-2 text-sm text-slate-400">{card.description}</p>
                <span className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400 transition group-hover:gap-2">
                  Go <FiArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently ended */}
        {recentAuctions.length > 0 && (
          <section>
            <SectionHeader label="Recently Closed" title="Past Auctions" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentAuctions.map((a) => (
                <AuctionCard
                  key={a.id}
                  auction={a}
                  registrationStatus={user ? (registrationMap[a.id] ?? null) : null}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function SectionHeader({ label, title, to, live }) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <div className="flex items-center gap-2">
          {live && (
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          )}
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">{label}</p>
        </div>
        <h2 className="mt-1 text-2xl font-bold text-white">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="flex items-center gap-1 text-sm text-slate-400 transition hover:text-white">
          View all <FiArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

function StatusRow({ label, value, highlight, live }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-2.5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className={`flex items-center gap-1.5 text-sm font-semibold ${highlight ? 'text-white' : 'text-slate-500'}`}>
        {live && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
          </span>
        )}
        {value}
      </span>
    </div>
  )
}

function SkeletonGrid({ count }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="aspect-[16/9] animate-pulse bg-slate-800" />
          <div className="space-y-3 p-5">
            <div className="h-3 w-1/3 animate-pulse rounded bg-slate-800" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-slate-800" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  )
}
