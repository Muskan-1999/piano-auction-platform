import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiBookmark, FiEye, FiHeart, FiZap } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import CountdownTimer from './CountdownTimer'
import useAuth from '../../hooks/useAuth'
import { addToWatchlist, removeFromWatchlist } from '../../services/watchlistService'
import toast from 'react-hot-toast'

const PIANO_PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%231e293b"/%3E%3Crect x="80" y="80" width="240" height="140" rx="8" fill="%230f172a"/%3E%3Crect x="90" y="170" width="18" height="40" fill="white"/%3E%3Crect x="113" y="170" width="18" height="40" fill="white"/%3E%3Crect x="136" y="170" width="18" height="40" fill="white"/%3E%3Crect x="159" y="170" width="18" height="40" fill="white"/%3E%3Crect x="182" y="170" width="18" height="40" fill="white"/%3E%3Crect x="205" y="170" width="18" height="40" fill="white"/%3E%3Crect x="228" y="170" width="18" height="40" fill="white"/%3E%3Crect x="251" y="170" width="18" height="40" fill="white"/%3E%3Crect x="274" y="170" width="18" height="40" fill="white"/%3E%3Crect x="102" y="170" width="13" height="28" fill="%231e293b"/%3E%3Crect x="125" y="170" width="13" height="28" fill="%231e293b"/%3E%3Crect x="171" y="170" width="13" height="28" fill="%231e293b"/%3E%3Crect x="194" y="170" width="13" height="28" fill="%231e293b"/%3E%3Crect x="240" y="170" width="13" height="28" fill="%231e293b"/%3E%3Crect x="263" y="170" width="13" height="28" fill="%231e293b"/%3E%3C/svg%3E'

function fmt(amount) {
  return '£' + Number(amount || 0).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function isReserveMet(lot) {
  if (!lot.reserve_price) return true
  return (lot.current_bid || 0) >= lot.reserve_price
}

export default function LotCard({
  lot,
  auctionSlug,
  onBidClick,
  onRegisterClick,
  registrationStatus,
  watchlistIds = new Set(),
  onWatchlistChange,
}) {
  const { user } = useAuth() || {}
  const navigate = useNavigate()
  const [watchlisting, setWatchlisting] = useState(false)
  const inWatchlist = watchlistIds.has(lot.id)

  const isSold = lot.status === 'sold'
  const isLive = lot.status === 'live'
  const bidsCount = lot.bids_count ?? lot.bids?.length ?? 0
  const reserveMet = isReserveMet(lot)

  async function toggleWatchlist(e) {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      navigate('/auction-portal/login')
      return
    }
    setWatchlisting(true)
    try {
      if (inWatchlist) {
        await removeFromWatchlist(lot.id)
        toast.success('Removed from watchlist')
      } else {
        await addToWatchlist(lot.id)
        toast.success('Added to watchlist')
      }
      onWatchlistChange?.()
    } catch {
      toast.error('Could not update watchlist')
    } finally {
      setWatchlisting(false)
    }
  }

  function handleBid(e) {
    e.preventDefault()
    if (!user) {
      navigate('/auction-portal/login')
      return
    }
    if (registrationStatus !== 'approved') {
      onRegisterClick?.()
      return
    }
    onBidClick?.(lot)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:border-slate-700 hover:shadow-slate-900/80">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={lot.featured_image || PIANO_PLACEHOLDER}
          alt={lot.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = PIANO_PLACEHOLDER }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-300 backdrop-blur">
            Lot {lot.lot_number}
          </span>
          {isSold && (
            <span className="rounded bg-slate-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-200">
              SOLD
            </span>
          )}
          {isLive && !isSold && (
            <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              LIVE
            </span>
          )}
        </div>

        {/* Watchlist button */}
        <button
          onClick={toggleWatchlist}
          disabled={watchlisting}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-sm transition ${
            inWatchlist
              ? 'bg-amber-400 text-slate-950'
              : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-amber-300'
          }`}
          title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
        >
          <FiHeart className="h-4 w-4" />
        </button>

        {/* Current bid overlay */}
        {isLive && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between rounded-xl bg-slate-950/80 px-3 py-2 backdrop-blur">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-slate-400">Current Bid</p>
                <p className="font-mono text-lg font-bold text-amber-400">{fmt(lot.current_bid)}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase tracking-widest text-slate-400">Bids</p>
                <p className="text-sm font-semibold text-white">{bidsCount}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex-1">
          {lot.brand && (
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">
              {lot.brand}
            </p>
          )}
          <h3 className="text-base font-semibold leading-snug text-white">
            {lot.title}
          </h3>
          {lot.model && (
            <p className="mt-0.5 text-sm text-slate-400">{lot.model}</p>
          )}

          {/* Bid info row */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-500">
                {bidsCount > 0 ? 'Current Bid' : 'Starting Bid'}
              </p>
              <p className="font-mono text-lg font-bold text-white">
                {bidsCount > 0 ? fmt(lot.current_bid) : fmt(lot.starting_bid)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-slate-500">Increment</p>
              <p className="font-mono text-base font-semibold text-slate-300">
                {fmt(lot.bid_increment)}
              </p>
            </div>
          </div>

          {/* Reserve status */}
          {!isSold && (
            <div className="mt-2">
              {reserveMet ? (
                <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  ✓ Reserve Met
                </span>
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  Reserve Not Met
                </span>
              )}
            </div>
          )}

          {/* Countdown for live lots */}
          {isLive && lot.ends_at && !isSold && (
            <div className="mt-3">
              <CountdownTimer targetDate={lot.ends_at} compact label="Ends in" />
            </div>
          )}

          {/* Sold info */}
          {isSold && (
            <div className="mt-3 rounded-lg bg-slate-800 px-3 py-2">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">Sold For</p>
              <p className="font-mono text-lg font-bold text-slate-200">{fmt(lot.current_bid)}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-col gap-2">
          {!isSold && (
            <>
              {isLive && (
                <button
                  onClick={handleBid}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                >
                  <MdGavel className="h-4 w-4" />
                  Bid {fmt((lot.current_bid || lot.starting_bid) + (lot.bid_increment || 0))}
                </button>
              )}
              {registrationStatus !== 'approved' && (
                <button
                  onClick={() => onRegisterClick?.()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/40 py-2 text-xs font-semibold uppercase tracking-widest text-amber-300 transition hover:bg-amber-400/10"
                >
                  Register to Bid
                </button>
              )}
            </>
          )}

          {auctionSlug && (
            <Link
              to={`/auction-portal/auctions/${auctionSlug}/lots/${lot.slug || lot.id}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              <FiEye className="h-3.5 w-3.5" />
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
