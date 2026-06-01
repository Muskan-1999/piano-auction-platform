/**
 * PortalWatchlist — /auction-portal/watchlist
 *
 * • React Query polls the watchlist every 5 s (fallback).
 * • Reverb listens on lots.{id} channels for watched lots:
 *     bid.placed → toast + cache invalidation
 *     lot.sold   → toast + cache invalidation
 * • Remove is optimistic via useToggleWatchlist.
 */

import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { FiArrowRight, FiHeart, FiTrash2 } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { useWatchlist, useToggleWatchlist, WATCHLIST_KEY, WATCHLIST_IDS_KEY } from '../../hooks/queries/useWatchlist'
import { getEcho } from '../../lib/echo'
import AuctionStatusBadge from '../../components/auction/AuctionStatusBadge'
import CountdownTimer from '../../components/auction/CountdownTimer'

function fmt(n) {
  return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })
}

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%231e293b"/%3E%3C/svg%3E'

// ─── Reverb listener for watchlist items ────────────────────────────────────

function useWatchlistReverb(items, userId) {
  const queryClient = useQueryClient()
  const channelsRef = useRef([])

  useEffect(() => {
    if (!items?.length) return

    const echo = getEcho()

    // Clean up old channels
    channelsRef.current.forEach((ch) => {
      ch.stopListening('.bid.placed')
      ch.stopListening('.lot.sold')
    })
    channelsRef.current = []

    items.forEach((item) => {
      const lotId = item.lot_id
      const lotTitle = item.lot?.title || `Lot ${item.lot?.lot_number}`
      const ch = echo.channel(`lots.${lotId}`)

      ch.listen('.bid.placed', ({ bid }) => {
        toast(`New bid on ${lotTitle}: ${fmt(bid.amount)}`, {
          icon: '🔔',
          duration: 4000,
          style: { background: '#0f172a', color: '#cbd5e1', border: '1px solid #334155' },
        })
        queryClient.invalidateQueries({ queryKey: WATCHLIST_KEY(userId) })
        queryClient.invalidateQueries({ queryKey: WATCHLIST_IDS_KEY(userId) })
      })

      ch.listen('.lot.sold', ({ lot }) => {
        toast(`${lotTitle} has been sold for ${fmt(lot.winning_bid_amount)}`, {
          icon: '🔨',
          duration: 6000,
          style: { background: '#111', color: '#d1d5db', border: '1px solid #374151' },
        })
        queryClient.invalidateQueries({ queryKey: WATCHLIST_KEY(userId) })
      })

      channelsRef.current.push(ch)
    })

    return () => {
      channelsRef.current.forEach((ch) => {
        ch.stopListening('.bid.placed')
        ch.stopListening('.lot.sold')
      })
      channelsRef.current = []
    }
  }, [items?.length, userId, queryClient])
}

// ─── Watchlist card ──────────────────────────────────────────────────────────

function WatchlistCard({ item, onRemove, removing }) {
  const lot = item.lot
  if (!lot) return null

  const isLive = lot.status === 'live' || lot.auction?.status === 'live'
  const isSold = lot.status === 'sold'
  const bidsCount = lot.bids_count || 0

  return (
    <div className={`group flex flex-col overflow-hidden rounded-2xl border bg-slate-900 transition ${
      isLive ? 'border-red-900/30' : 'border-slate-800'
    }`}>
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
        <img
          src={lot.featured_image || PLACEHOLDER}
          alt={lot.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

        <div className="absolute left-2 top-2 flex gap-1.5">
          <span className="rounded bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-amber-300">
            Lot {lot.lot_number}
          </span>
          {isSold && (
            <span className="rounded bg-slate-700/90 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-300">SOLD</span>
          )}
          {isLive && !isSold && (
            <span className="flex items-center gap-1 rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold text-white">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              LIVE
            </span>
          )}
        </div>

        {/* Remove button */}
        <button
          onClick={() => onRemove(lot.id)}
          disabled={removing}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 text-slate-400 backdrop-blur-sm transition hover:bg-red-600/80 hover:text-white disabled:opacity-50"
          title="Remove from watchlist"
        >
          {removing ? (
            <span className="h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" />
          ) : (
            <FiTrash2 className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {lot.brand && (
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">{lot.brand}</p>
        )}
        <h3 className="text-sm font-bold text-white">{lot.title}</h3>

        {lot.auction && (
          <p className="mt-0.5 text-xs text-slate-500">{lot.auction.title}</p>
        )}

        {/* Bid info */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-slate-500">
              {bidsCount > 0 ? 'Current Bid' : 'Starting Bid'}
            </p>
            <p className="font-mono text-base font-bold text-white tabular-nums">
              {fmt(bidsCount > 0 ? lot.current_bid : lot.starting_bid)}
            </p>
          </div>
          <div className="text-right">
            {bidsCount > 0 && (
              <>
                <p className="text-[9px] uppercase tracking-widest text-slate-500">Bids</p>
                <p className="text-sm font-semibold text-slate-300">{bidsCount}</p>
              </>
            )}
          </div>
        </div>

        {/* Auction status badge */}
        {lot.auction && (
          <div className="mt-2">
            <AuctionStatusBadge status={lot.auction.status} size="sm" />
          </div>
        )}

        {/* Countdown */}
        {isLive && lot.ends_at && !isSold && (
          <div className="mt-3">
            <CountdownTimer targetDate={lot.ends_at} compact label="Ends in" />
          </div>
        )}
        {lot.auction?.status === 'upcoming' && lot.auction?.start_time && (
          <div className="mt-3">
            <CountdownTimer targetDate={lot.auction.start_time} compact label="Starts in" />
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          {lot.auction?.slug && (
            <Link
              to={`/auction-portal/auctions/${lot.auction.slug}`}
              className={`flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-bold transition ${
                isLive
                  ? 'bg-red-600 text-white hover:bg-red-500'
                  : 'bg-amber-400 text-slate-950 hover:bg-amber-300'
              }`}
            >
              {isLive ? 'Join Live Auction' : 'View Auction'}
              <FiArrowRight className="h-4 w-4" />
            </Link>
          )}
          <Link
            to={`/lots/${lot.slug}`}
            className="flex w-full items-center justify-center rounded-xl border border-slate-700 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-600 hover:text-white"
          >
            View Lot Details
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function PortalWatchlist() {
  const { user } = useAuth() || {}
  const queryClient = useQueryClient()

  const { data: items = [], isLoading } = useWatchlist(user?.id)
  const { mutate: toggle, variables }   = useToggleWatchlist(user?.id)

  // Subscribe to Reverb events for all watched lots
  useWatchlistReverb(items, user?.id)

  function handleRemove(lotId) {
    toggle(
      { lotId, inWatchlist: true },
      {
        onSuccess: () => toast('Removed from watchlist', {
          icon: '🗑️',
          style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' },
        }),
        onError: () => toast.error('Could not remove from watchlist'),
      }
    )
  }

  const liveLots  = items.filter((i) => i.lot?.status === 'live' || i.lot?.auction?.status === 'live')
  const otherLots = items.filter((i) => i.lot?.status !== 'live' && i.lot?.auction?.status !== 'live')

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-900">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">My Account</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">My Watchlist</h1>
          <p className="mt-3 text-sm text-slate-400">
            Saved lots. You'll receive instant notifications when they receive bids or go live.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Watching',  value: items.length },
            { label: 'Live Now',  value: liveLots.length,  red: liveLots.length > 0 },
            { label: 'Upcoming',  value: otherLots.length },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">{s.label}</p>
              <p className={`mt-3 text-3xl font-bold ${s.red ? 'text-red-400' : 'text-white'}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="aspect-[16/10] animate-pulse bg-slate-800" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-800" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-slate-900 p-16 text-center">
            <FiHeart className="mx-auto h-10 w-10 text-slate-700" />
            <p className="mt-4 text-lg font-semibold text-slate-300">Your Watchlist is Empty</p>
            <p className="mt-2 text-sm text-slate-500">
              Add lots to your watchlist from any auction page to track them here.
            </p>
            <Link
              to="/auction-portal/catalogue"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-amber-300"
            >
              Browse Auctions <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {liveLots.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <h2 className="text-lg font-bold text-white">Live Now</h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {liveLots.map((item) => (
                    <WatchlistCard
                      key={item.id}
                      item={item}
                      onRemove={handleRemove}
                      removing={variables?.lotId === item.lot_id}
                    />
                  ))}
                </div>
              </section>
            )}

            {otherLots.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-bold text-white">All Watched Lots</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {otherLots.map((item) => (
                    <WatchlistCard
                      key={item.id}
                      item={item}
                      onRemove={handleRemove}
                      removing={variables?.lotId === item.lot_id}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}
