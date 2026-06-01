/**
 * PortalAuctionCard
 *
 * Auction card for use inside the portal catalogue / dashboard.
 * The action button adapts in real time based on:
 *   - `auctionStatus`   (live / upcoming / ended) — updated via useAuctionStatus
 *   - `registrationStatus` (null / pending / approved / rejected)
 *
 * Button states:
 *   ┌──────────────────────────────────────────────────────────┐
 *   │ Status   │ Reg      │ Button                             │
 *   ├──────────┼──────────┼────────────────────────────────────┤
 *   │ any      │ null     │ [ Register to Bid ]  (amber)       │
 *   │ any      │ pending  │ [ Registration Pending ]  disabled │
 *   │ any      │ rejected │ [ Registration Not Approved ]      │
 *   │ upcoming │ approved │ [ View Auction ]                   │
 *   │ live     │ approved │ [ Join Auction → ]  (red/live)     │
 *   │ ended    │ any      │ [ Auction Ended ]   disabled       │
 *   └──────────────────────────────────────────────────────────┘
 */

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiMapPin } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import useAuctionStatus from '../../hooks/useAuctionStatus'
import AuctionStatusBadge from './AuctionStatusBadge'
import CountdownTimer from './CountdownTimer'

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%230f172a"/%3E%3C/svg%3E'

export default function PortalAuctionCard({ auction, registrationStatus, onRegister }) {
  const navigate    = useNavigate()
  const liveStatus  = useAuctionStatus(auction)     // tracks real-time changes
  const status      = liveStatus ?? auction.status  // fall back to server value

  const portalUrl = `/auction-portal/auctions/${auction.slug}`
  const regUrl    = `/auction-portal/register-to-bid/${auction.slug}`

  function handleRegister(e) {
    e.preventDefault()
    onRegister ? onRegister(auction) : navigate(regUrl)
  }

  // ── Button renderer ───────────────────────────────────────────────────────
  function ActionButtons() {
    if (status === 'ended') {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center rounded-xl border border-slate-700 py-2.5 text-sm font-semibold text-slate-500 cursor-not-allowed"
        >
          Auction Ended
        </button>
      )
    }

    if (!registrationStatus) {
      return (
        <button
          onClick={handleRegister}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/5 py-2.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/10"
        >
          <MdGavel className="h-4 w-4" />
          Register to Bid
        </button>
      )
    }

    if (registrationStatus === 'pending') {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-700/30 bg-amber-950/20 py-2.5 text-sm font-semibold text-amber-500 cursor-not-allowed"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
          </span>
          Registration Pending
        </button>
      )
    }

    if (registrationStatus === 'rejected') {
      return (
        <button
          disabled
          className="flex w-full items-center justify-center rounded-xl border border-red-800/30 py-2.5 text-sm font-semibold text-red-600 cursor-not-allowed"
        >
          Registration Not Approved
        </button>
      )
    }

    // Approved
    if (status === 'live') {
      return (
        <Link
          to={portalUrl}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-500"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Join Auction
          <FiArrowRight className="h-4 w-4" />
        </Link>
      )
    }

    return (
      <Link
        to={portalUrl}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
      >
        View Auction
        <FiArrowRight className="h-4 w-4" />
      </Link>
    )
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:border-slate-700 hover:shadow-xl hover:shadow-black/30">

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={auction.banner_image || PLACEHOLDER}
          alt={auction.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <AuctionStatusBadge status={status} />
        </div>
        {status === 'live' && (
          <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            LIVE
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          {auction.auction_type && (
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">
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
            {auction.visible_lot_count !== undefined && (
              <p className="flex items-center gap-1.5 text-xs text-slate-400">
                <MdGavel className="h-3 w-3 shrink-0" />
                {auction.visible_lot_count} lots
              </p>
            )}
          </div>

          {status === 'upcoming' && auction.start_time && (
            <div className="mt-4">
              <CountdownTimer targetDate={auction.start_time} compact label="Starts in" />
            </div>
          )}
        </div>

        {/* Action */}
        <div className="mt-5 flex flex-col gap-2">
          <ActionButtons />
          {/* Secondary link — always show View Auction unless we already show it */}
          {status !== 'ended' && registrationStatus === null && (
            <Link
              to={portalUrl}
              className="flex w-full items-center justify-center rounded-xl border border-slate-700 py-2 text-xs font-medium text-slate-400 transition hover:border-slate-600 hover:text-white"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
