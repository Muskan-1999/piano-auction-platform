/**
 * PortalAuctionDetail
 *
 * Full live-auction page with two-layer update strategy:
 *
 *   Layer 1 — React Query (polling every 3 s):
 *     • Auction data     useAuction(slug)
 *     • Bid history      useBidHistory(lotId)
 *     • Reg status       useAuctionRegistration(auctionId, userId)
 *
 *   Layer 2 — Reverb WebSocket (instant, < 1 s):
 *     • bid.placed   → prepend to history + invalidate React Query cache
 *     • bid.outbid   → outbid toast + invalidate
 *     • lot.sold     → SOLD banner + invalidate
 *     • auction.ended → disabled controls + invalidate
 *     • registration.approved / rejected → banner update + invalidate
 *
 * If Reverb disconnects the user will still see updates within 3 seconds.
 * Users never need to manually refresh.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  FiAlertCircle,
  FiCalendar,
  FiCheck,
  FiClock,
  FiDownload,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiUsers,
  FiX,
} from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import toast from 'react-hot-toast'

import useAuth from '../../hooks/useAuth'
import useRealtimeBids, { timeAgo } from '../../hooks/useRealtimeBids'
import useRealtimeNotifications from '../../hooks/useRealtimeNotifications'
import useAuctionChannel from '../../hooks/useAuctionChannel'
import { useAuction } from '../../hooks/queries/useAuction'
import { useAuctionRegistration } from '../../hooks/queries/useAuctionRegistration'
import WatchlistButton from '../../components/auction/WatchlistButton'
import api from '../../api/axios'
import AuctionStatusBadge from '../../components/auction/AuctionStatusBadge'
import CountdownTimer from '../../components/auction/CountdownTimer'

// ─── helpers ────────────────────────────────────────────────────────────────

function fmt(n) {
  return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })
}

function fmtDate(dt) {
  if (!dt) return 'TBA'
  return new Date(dt).toLocaleString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

// ─── Registration Banner ─────────────────────────────────────────────────────

function RegistrationBanner({ status, onRegister }) {
  if (status === 'approved') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-700/40 bg-emerald-950/40 px-5 py-3">
        <FiCheck className="h-5 w-5 shrink-0 text-emerald-400" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-emerald-300">Approved to Bid</p>
          <p className="text-xs text-emerald-400/70">You are registered and approved. Place your bids below.</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
          Active
        </span>
      </div>
    )
  }
  if (status === 'pending') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-amber-700/40 bg-amber-950/30 px-5 py-3">
        <FiAlertCircle className="h-5 w-5 shrink-0 text-amber-400" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-amber-300">Registration Pending</p>
          <p className="text-xs text-amber-400/70">
            Your registration is under review. This page updates automatically on approval — no refresh needed.
          </p>
        </div>
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
        </span>
      </div>
    )
  }
  if (status === 'rejected') {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-red-800/40 bg-red-950/30 px-5 py-3">
        <FiX className="h-5 w-5 shrink-0 text-red-400" />
        <p className="text-sm text-red-300">Your registration was not approved for this auction.</p>
      </div>
    )
  }
  return (
    <button
      onClick={onRegister}
      className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/5 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/10"
    >
      <MdGavel className="h-4 w-4" />
      Register to Bid
    </button>
  )
}

// ─── Live Bid Panel ──────────────────────────────────────────────────────────

function LiveBidPanel({ lot, registrationStatus, userId, auctionEnded }) {
  const {
    currentBid, bidHistory, bidsCount, leadingBid,
    nextBid, isOwnBidLeading, wasOutbid, soldData, isOwnWin, loading,
  } = useRealtimeBids(lot, userId)

  const [bidAmount,  setBidAmount]  = useState(nextBid)
  const [submitting, setSubmitting] = useState(false)
  const [apiError,   setApiError]   = useState('')

  // Keep bid amount in sync with market price
  useEffect(() => { setBidAmount(nextBid) }, [nextBid])

  // Show outbid toast
  useEffect(() => {
    if (wasOutbid) {
      toast('You have been outbid — bid higher to stay in the lead', {
        icon: '⚠️',
        duration: 6000,
        style: { background: '#1c1400', color: '#fef08a', border: '1px solid #854d0e' },
      })
    }
  }, [wasOutbid])

  // Show winning toast
  useEffect(() => {
    if (isOwnBidLeading && bidsCount > 0) {
      toast.success('You are currently the highest bidder!', {
        duration: 4000,
        style: { background: '#052e16', color: '#bbf7d0', border: '1px solid #166534' },
      })
    }
  }, [isOwnBidLeading])

  const isSold     = lot.status === 'sold' || soldData !== null
  const isLive     = lot.status === 'live' && !isSold && !auctionEnded
  const canBid     = registrationStatus === 'approved' && isLive
  const reserveMet = !lot.reserve_price || currentBid >= lot.reserve_price

  function inc() { setBidAmount((p) => p + (lot.bid_increment || 50)) }
  function dec() { setBidAmount((p) => Math.max(nextBid, p - (lot.bid_increment || 50))) }

  async function placeBid() {
    if (!canBid || submitting) return
    setApiError('')
    setSubmitting(true)
    try {
      await api.post(`/lots/${lot.id}/bid`, { amount: bidAmount, bid_type: 'online' })
      // Success — WebSocket will deliver the confirmation + React Query will poll
    } catch (err) {
      const msg = err?.response?.data?.message || 'Failed to place bid. Please try again.'
      setApiError(msg)
      toast.error(msg, { duration: 5000 })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900">

      {/* ── Current bid display ── */}
      <div className="border-b border-slate-800 bg-slate-950 px-5 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-500">Current Bid</p>
            <p className="mt-1 font-mono text-4xl font-bold text-amber-400 tabular-nums">
              {fmt(currentBid)}
            </p>
            <p className={`mt-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest ${
              reserveMet ? 'text-emerald-400' : 'text-slate-500'
            }`}>
              {reserveMet && <FiCheck className="h-3 w-3" />}
              {reserveMet ? 'Reserve Met' : 'Reserve Not Met'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-500">Increment</p>
            <p className="mt-1 font-mono text-xl font-semibold text-slate-300">{fmt(lot.bid_increment)}</p>
            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-500">Total Bids</p>
            <p className="mt-0.5 text-2xl font-bold text-white tabular-nums">{bidsCount}</p>
          </div>
        </div>

        {/* Leading bidder */}
        {leadingBid && (
          <div className={`mt-4 rounded-xl px-4 py-3 ${
            leadingBid.isOwn
              ? 'border border-emerald-700/40 bg-emerald-950/30'
              : 'bg-slate-900'
          }`}>
            <p className="text-[9px] uppercase tracking-widest text-slate-500">Leading Bidder</p>
            <p className="mt-0.5 text-sm font-semibold text-white">
              {leadingBid.isOwn ? '🏆 You are in the lead' : leadingBid.bidder_masked}
            </p>
          </div>
        )}
      </div>

      {/* ── SOLD state ── */}
      {isSold ? (
        <div className="space-y-4 px-5 py-7 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-6 py-2.5 text-sm font-bold uppercase tracking-widest text-slate-200">
            🔨 SOLD
          </div>
          <p className="font-mono text-3xl font-bold text-white">
            {fmt(soldData?.amount ?? lot.winning_bid_amount ?? currentBid)}
          </p>
          {soldData?.winnerMasked && (
            <p className="text-sm text-slate-400">
              Won by{' '}
              <span className="font-semibold text-slate-200">{soldData.winnerMasked}</span>
            </p>
          )}
          {isOwnWin && (
            <div className="rounded-xl border border-emerald-700/30 bg-emerald-950/40 px-5 py-4">
              <p className="text-sm font-semibold text-emerald-300">
                🎉 Congratulations! You won this lot.
              </p>
            </div>
          )}
        </div>

      ) : auctionEnded ? (
        /* ── Auction ended (not sold) ── */
        <div className="px-5 py-6 text-center">
          <p className="text-sm font-semibold text-slate-400">Auction Ended</p>
          <p className="mt-1 text-xs text-slate-600">Bidding is now closed.</p>
        </div>

      ) : (
        /* ── Bid form ── */
        <div className="space-y-5 p-5">
          {canBid ? (
            <>
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">Your Bid</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={dec}
                    disabled={bidAmount <= nextBid}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:bg-slate-800 disabled:opacity-30"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  <div className="flex-1 rounded-xl border border-amber-400/30 bg-slate-950 px-4 py-2.5 text-center font-mono text-2xl font-bold text-amber-400">
                    {fmt(bidAmount)}
                  </div>
                  <button
                    onClick={inc}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:bg-slate-800"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>
                <p className="mt-1.5 text-center text-[10px] text-slate-600">
                  Min next bid: {fmt(nextBid)}
                </p>
              </div>

              {wasOutbid && (
                <div className="flex items-start gap-2 rounded-xl border border-amber-700/40 bg-amber-950/30 px-4 py-3 text-sm text-amber-300">
                  <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  You have been outbid. Bid higher to reclaim the lead.
                </div>
              )}
              {isOwnBidLeading && (
                <div className="flex items-start gap-2 rounded-xl border border-emerald-700/40 bg-emerald-950/30 px-4 py-3 text-sm text-emerald-300">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0" />
                  You are currently the highest bidder.
                </div>
              )}
              {apiError && (
                <div className="flex items-start gap-2 rounded-xl border border-red-800/40 bg-red-950/40 px-4 py-3 text-sm text-red-300">
                  <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  {apiError}
                </div>
              )}

              <button
                onClick={placeBid}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/10 transition hover:bg-amber-300 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                    Placing…
                  </>
                ) : (
                  <>
                    <MdGavel className="h-5 w-5" />
                    Bid {fmt(bidAmount)}
                  </>
                )}
              </button>
            </>
          ) : (
            <p className="rounded-xl bg-slate-800 px-4 py-3 text-center text-sm text-slate-400">
              {registrationStatus !== 'approved'
                ? 'Register and get approved to place bids.'
                : 'Bidding is not currently active for this lot.'}
            </p>
          )}
        </div>
      )}

      {/* ── Live bid feed ── */}
      <div className="border-t border-slate-800">
        <div className="flex items-center justify-between px-5 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Live Bid Feed</p>
          {!loading && bidsCount > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-red-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
              </span>
              Live
            </span>
          )}
        </div>

        <div className="max-h-56 overflow-y-auto px-3 pb-3">
          {loading ? (
            <div className="space-y-1.5">
              {[1, 2, 3].map((i) => <div key={i} className="h-8 animate-pulse rounded-lg bg-slate-800" />)}
            </div>
          ) : bidHistory.length === 0 ? (
            <p className="py-5 text-center text-xs text-slate-600">No bids yet — be the first!</p>
          ) : (
            <div className="space-y-1">
              {bidHistory.map((b, i) => (
                <div
                  key={b.id ?? i}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                    i === 0
                      ? b.isOwn ? 'bg-amber-400/10 text-amber-300' : 'bg-slate-800 text-white'
                      : 'text-slate-400'
                  }`}
                >
                  <span className="min-w-[64px] font-medium">
                    {b.isOwn ? 'You' : (b.bidder_masked || '???')}
                  </span>
                  <span className="flex-1 text-center font-mono font-semibold">{fmt(b.amount)}</span>
                  <span className="min-w-[60px] text-right text-slate-500">{timeAgo(b.placed_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Lot Row ─────────────────────────────────────────────────────────────────

function LotRow({ lot, isActive, onClick }) {
  const [liveBid,   setLiveBid]   = useState(lot.current_bid || lot.starting_bid || 0)
  const [liveCount, setLiveCount] = useState(lot.bids_count || 0)

  useAuctionChannel(lot.id, {
    onBidPlaced: (bid) => { setLiveBid(bid.amount); setLiveCount((p) => p + 1) },
  })

  const isSold = lot.status === 'sold'
  const isLive = lot.status === 'live'

  return (
    <div
      className={`relative rounded-xl border transition ${
        isActive
          ? 'border-amber-400/40 bg-amber-400/5'
          : 'border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      {/* Clickable row area */}
      <button
        onClick={() => onClick(lot)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-400/80">
                Lot {lot.lot_number}
              </span>
              {isSold && (
                <span className="rounded bg-slate-700 px-1.5 py-0.5 text-[9px] font-bold uppercase text-slate-300">SOLD</span>
              )}
              {isLive && !isSold && (
                <span className="flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  LIVE
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm font-semibold text-white">{lot.title}</p>
            {lot.brand && <p className="text-xs text-slate-500">{lot.brand}</p>}
          </div>

          {/* Bid info + watchlist */}
          <div className="flex shrink-0 items-start gap-3">
            <div className="text-right">
              <p className="font-mono text-sm font-bold text-white tabular-nums">{fmt(liveBid)}</p>
              <p className="text-[10px] text-slate-500">{liveCount} bids</p>
            </div>
            {/* stopPropagation so the heart click doesn't also select the lot */}
            <div onClick={(e) => e.stopPropagation()}>
              <WatchlistButton lotId={lot.id} size="sm" />
            </div>
          </div>
        </div>
      </button>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function PortalAuctionDetail() {
  const { slug }   = useParams()
  const { user }   = useAuth() || {}
  const navigate   = useNavigate()

  const [activeLot,    setActiveLot]    = useState(null)
  const [auctionEnded, setAuctionEnded] = useState(false)

  // ── Layer 1: React Query (polling every 3 s) ──────────────────────────────
  const {
    data: auction,
    isLoading,
    error,
  } = useAuction(slug)

  const {
    data: regData,
  } = useAuctionRegistration(auction?.id, user?.id)

  const registrationStatus = regData?.status ?? null

  // ── Layer 2: Reverb WebSocket (instant updates + cache invalidation) ──────
  useRealtimeNotifications({
    user,
    auction,
    onAuctionEnded: () => setAuctionEnded(true),
    onRegistrationUpdate: () => {/* React Query handles this via invalidation */},
  })

  // Auto-select the first live lot (or just first lot)
  useEffect(() => {
    if (!auction?.auction_lots?.length) return
    setActiveLot((prev) => {
      if (prev) {
        // Keep previous selection if still in the list
        const still = auction.auction_lots.find((l) => l.id === prev.id)
        if (still) return still
      }
      return (
        auction.auction_lots.find((l) => l.status === 'live') ??
        auction.auction_lots[0] ??
        null
      )
    })
  }, [auction?.auction_lots])

  // Sync auctionEnded from polling
  useEffect(() => {
    if (auction?.status === 'ended') setAuctionEnded(true)
  }, [auction?.status])

  // ── Render states ─────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
          <p className="text-sm text-slate-400">Loading auction…</p>
        </div>
      </div>
    )
  }

  if (error || !auction) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
        <div>
          <p className="text-slate-300">Auction not found or unavailable.</p>
          <Link to="/auction-portal/catalogue" className="mt-4 inline-block text-sm text-amber-400 hover:text-amber-300">
            ← Back to Catalogue
          </Link>
        </div>
      </div>
    )
  }

  const lots       = auction.auction_lots ?? []
  const isLive     = auction.status === 'live'
  const isUpcoming = auction.status === 'upcoming'
  const isEnded    = auction.status === 'ended' || auctionEnded

  return (
    <div className="min-h-screen bg-slate-950">

      {/* ── Hero Banner ── */}
      <div className="relative">
        {auction.banner_image ? (
          <div className="relative h-[38vh] min-h-[240px] overflow-hidden lg:h-[46vh]">
            <img src={auction.banner_image} alt={auction.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/10" />
          </div>
        ) : (
          <div className="relative h-40 bg-gradient-to-br from-slate-900 via-slate-950 to-black" />
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-screen-2xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <AuctionStatusBadge status={isEnded ? 'ended' : auction.status} />
                <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {auction.title}
                </h1>
                {auction.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                    <FiMapPin className="h-4 w-4" /> {auction.location}
                  </p>
                )}
              </div>

              {isLive && !isEnded && (
                <div className="flex items-center gap-2 rounded-full bg-red-600/20 px-5 py-2.5 text-sm font-bold text-red-400">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
                  </span>
                  LIVE NOW
                </div>
              )}

              {isEnded && (
                <div className="flex items-center gap-2 rounded-full bg-slate-700 px-5 py-2.5 text-sm font-bold text-slate-200">
                  🔨 AUCTION ENDED
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main layout ── */}
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

          {/* ── Left: auth / registration / lots list ── */}
          <div className="space-y-6">

            {/* Auth / registration banner */}
            {user ? (
              <RegistrationBanner
                status={registrationStatus}
                onRegister={() => navigate(`/auction-portal/register-to-bid/${slug}`)}
              />
            ) : (
              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
                <p className="text-sm text-slate-400">Log in to register and place bids</p>
                <div className="flex gap-2">
                  <Link to="/auction-portal/login" className="rounded-full border border-slate-700 px-4 py-1.5 text-sm text-slate-300 transition hover:text-white">Login</Link>
                  <Link to="/auction-portal/register" className="rounded-full bg-amber-400 px-4 py-1.5 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Register</Link>
                </div>
              </div>
            )}

            {/* Upcoming countdown */}
            {isUpcoming && auction.start_time && (
              <div className="rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Auction Starts In</p>
                <div className="mt-5">
                  <CountdownTimer targetDate={auction.start_time} />
                </div>
              </div>
            )}

            {/* Lots */}
            {lots.length > 0 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    Lots <span className="ml-1 text-sm font-normal text-slate-500">({lots.length})</span>
                  </h2>
                  {isLive && (
                    <div className="flex items-center gap-1.5 text-xs text-red-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                      </span>
                      Live bidding active
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {lots.map((lot) => (
                    <LotRow
                      key={lot.id}
                      lot={lot}
                      isActive={activeLot?.id === lot.id}
                      onClick={setActiveLot}
                    />
                  ))}
                </div>
              </div>
            )}

            {lots.length === 0 && !isLoading && (
              <div className="rounded-2xl bg-slate-900 p-10 text-center">
                <p className="text-slate-400">No lots listed yet. Check back closer to the auction date.</p>
              </div>
            )}
          </div>

          {/* ── Right: sticky bid panel + info ── */}
          <div className="space-y-5">
            <div className="sticky top-20 space-y-5">

              {/* Bid panel */}
              {activeLot ? (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="truncate text-sm font-bold text-white">
                      Lot {activeLot.lot_number}: {activeLot.title}
                    </h3>
                    {lots.length > 1 && <p className="ml-2 shrink-0 text-[10px] text-slate-500">← select a lot</p>}
                  </div>
                  <LiveBidPanel
                    lot={activeLot}
                    registrationStatus={registrationStatus}
                    userId={user?.id}
                    auctionEnded={isEnded}
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
                  <p className="text-sm text-slate-400">Select a lot to view bidding.</p>
                </div>
              )}

              {/* Auction details */}
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 px-5 py-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Auction Details</h3>
                </div>
                <div className="space-y-4 p-5 text-sm">
                  {[
                    { icon: <MdGavel className="h-4 w-4" />,    label: 'Type',    value: auction.auction_type },
                    { icon: <FiCalendar className="h-4 w-4" />, label: 'Start',   value: fmtDate(auction.start_time) },
                    { icon: <FiClock className="h-4 w-4" />,    label: 'End',     value: fmtDate(auction.end_time) },
                    auction.preview_start_time && { icon: <FiCalendar className="h-4 w-4" />, label: 'Preview', value: fmtDate(auction.preview_start_time) },
                    auction.location && { icon: <FiMapPin className="h-4 w-4" />, label: 'Location', value: auction.location },
                    { icon: <FiUsers className="h-4 w-4" />,    label: 'Lots',    value: `${lots.length} lots` },
                  ].filter(Boolean).map((row) => (
                    <div key={row.label} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-slate-600">{row.icon}</span>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-slate-600">{row.label}</p>
                        <p className="mt-0.5 capitalize text-slate-200">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catalogue PDF */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Catalogue</p>
                {auction.catalogue_pdf_url ? (
                  <a
                    href={auction.catalogue_pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-amber-400/20 bg-amber-400/5 p-3 text-amber-300 transition hover:bg-amber-400/10"
                  >
                    <FiDownload className="h-5 w-5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">View Catalogue PDF</p>
                      <p className="text-[10px] text-amber-400/50">Opens in new tab</p>
                    </div>
                  </a>
                ) : (
                  <p className="rounded-xl bg-slate-950 px-4 py-3 text-center text-sm text-slate-500">
                    Catalogue Coming Soon
                  </p>
                )}
              </div>

              {/* Register to bid CTA */}
              {user && !registrationStatus && !isEnded && (
                <button
                  onClick={() => navigate(`/auction-portal/register-to-bid/${slug}`)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/5 py-3.5 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/10"
                >
                  <MdGavel className="h-4 w-4" />
                  Register to Bid
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
