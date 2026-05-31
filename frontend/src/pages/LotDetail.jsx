/**
 * LotDetail  (/lots/:slug)
 *
 * Public lot page with:
 *   • Image gallery  — main image + thumbnail strip + fullscreen lightbox
 *   • Gallery navigation — prev/next arrows + keyboard + mobile swipe
 *   • Lot details sidebar — bids, reserve, watchlist, CTA
 *   • React Query polling every 3 s for live bid updates
 */

import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
} from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import api from '../api/axios'
import WatchlistButton from '../components/auction/WatchlistButton'
import AuctionStatusBadge from '../components/auction/AuctionStatusBadge'
import CountdownTimer from '../components/auction/CountdownTimer'

function fmt(n) {
  return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })
}

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect width="800" height="600" fill="%231e293b"/%3E%3C/svg%3E'

// ─── Image Gallery ───────────────────────────────────────────────────────────

function ImageGallery({ featured, gallery }) {
  const allImages = (() => {
    const imgs = []
    if (featured) imgs.push(featured)
    ;(gallery || []).forEach((img) => { if (img && img !== featured) imgs.push(img) })
    return imgs.length ? imgs : [PLACEHOLDER]
  })()

  const [activeIdx,    setActiveIdx]    = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const touchStartX = useRef(null)
  const total = allImages.length

  const prev = () => setActiveIdx((i) => (i - 1 + total) % total)
  const next = () => setActiveIdx((i) => (i + 1) % total)

  // Keyboard in lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    const h = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     setLightboxOpen(false)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [lightboxOpen, total])

  // Swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const d = e.changedTouches[0].clientX - touchStartX.current
    if (d > 50)  prev()
    if (d < -50) next()
    touchStartX.current = null
  }

  const mainImage = allImages[activeIdx] || PLACEHOLDER

  return (
    <>
      {/* Main image */}
      <div
        className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-slate-900"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={mainImage}
          alt="Lot image"
          className="h-full w-full object-contain"
          onError={(e) => { e.target.src = PLACEHOLDER }}
        />
        {total > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <FiChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <FiChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setLightboxOpen(true) }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
        >
          <FiMaximize2 className="h-4 w-4" />
        </button>
        {total > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
            {activeIdx + 1} / {total}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                i === activeIdx ? 'border-amber-400 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
                onError={(e) => { e.target.src = PLACEHOLDER }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <FiX className="h-5 w-5" />
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
            {activeIdx + 1} / {total}
          </div>
          {total > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <FiChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <FiChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <img
            src={mainImage}
            alt="Lot image"
            className="max-h-[90vh] max-w-[90vw] select-none object-contain"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => { e.target.src = PLACEHOLDER }}
          />
          {total > 1 && (
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 overflow-x-auto px-4">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIdx(i) }}
                  className={`h-12 w-16 shrink-0 overflow-hidden rounded border-2 ${
                    i === activeIdx ? 'border-amber-400' : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LotDetail() {
  const { slug } = useParams()

  const { data: lot, isLoading, error } = useQuery({
    queryKey:        ['lot', slug],
    queryFn:         async () => {
      const res = await api.get(`/public/lots/${slug}`)
      return res.data?.data ?? res.data ?? null
    },
    refetchInterval: 3000,
    enabled:         !!slug,
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      </div>
    )
  }

  if (error || !lot) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-slate-400">
        Lot not found.
      </div>
    )
  }

  const isSold     = lot.status === 'sold'
  const isLive     = lot.status === 'live'
  const reserveMet = !lot.reserve_price || (lot.current_bid || 0) >= lot.reserve_price
  const auctionStatus = lot.auction?.status

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Breadcrumb */}
      <div className="border-b border-slate-900 bg-slate-900/60">
        <div className="mx-auto max-w-screen-xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/auctions" className="hover:text-slate-300">Auctions</Link>
            {lot.auction && (
              <>
                <span>/</span>
                <Link to={`/auctions/${lot.auction.slug}`} className="hover:text-slate-300">
                  {lot.auction.title}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-slate-300">Lot {lot.lot_number}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Left: gallery + description */}
          <div className="space-y-6">
            <ImageGallery featured={lot.featured_image} gallery={lot.gallery} />

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">
                    Lot {lot.lot_number}
                  </p>
                  <h1 className="mt-1 text-2xl font-bold text-white">{lot.title}</h1>
                  {lot.brand && (
                    <p className="mt-0.5 text-sm text-slate-400">{lot.brand} {lot.model}</p>
                  )}
                </div>
                <WatchlistButton lotId={lot.id} size="md" />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {lot.year       && <Detail label="Year"      value={lot.year} />}
                {lot.condition  && <Detail label="Condition" value={lot.condition} />}
                {lot.serial_number && <Detail label="Serial" value={lot.serial_number} />}
                {lot.auction    && <Detail label="Auction"   value={lot.auction.title} />}
              </div>

              {lot.description && (
                <div
                  className="prose prose-sm prose-invert max-w-none text-slate-400"
                  dangerouslySetInnerHTML={{ __html: lot.description }}
                />
              )}
            </div>
          </div>

          {/* Right: bid info + CTA */}
          <div className="space-y-4">
            <div className="sticky top-20 space-y-4">

              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 bg-slate-950 px-5 py-5">
                  <div className="flex items-center gap-2">
                    <AuctionStatusBadge status={lot.status} />
                    {auctionStatus && auctionStatus !== lot.status && (
                      <AuctionStatusBadge status={auctionStatus} size="sm" />
                    )}
                  </div>

                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        {isSold ? 'Sold For' : 'Current Bid'}
                      </p>
                      <p className="mt-1 font-mono text-3xl font-bold text-amber-400 tabular-nums">
                        {fmt(lot.winning_bid_amount ?? lot.current_bid)}
                      </p>
                      {!isSold && (
                        <p className={`mt-1 text-[10px] font-semibold uppercase tracking-widest ${
                          reserveMet ? 'text-emerald-400' : 'text-slate-500'
                        }`}>
                          {reserveMet ? '✓ Reserve Met' : 'Reserve Not Met'}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest">Starting</p>
                      <p className="font-mono text-base font-semibold text-slate-300">{fmt(lot.starting_bid)}</p>
                      <p className="mt-2 text-[9px] text-slate-500 uppercase tracking-widest">Increment</p>
                      <p className="font-mono text-sm font-semibold text-slate-400">{fmt(lot.bid_increment)}</p>
                    </div>
                  </div>

                  {isSold && lot.winner_masked && (
                    <div className="mt-3 rounded-xl bg-slate-900 px-4 py-2.5">
                      <p className="text-[9px] uppercase tracking-widest text-slate-500">Winner</p>
                      <p className="mt-0.5 text-sm font-semibold text-white">{lot.winner_masked}</p>
                    </div>
                  )}
                </div>

                {/* Countdown */}
                {isLive && lot.ends_at && (
                  <div className="border-b border-slate-800 px-5 py-4">
                    <CountdownTimer targetDate={lot.ends_at} compact label="Ends in" />
                  </div>
                )}
                {auctionStatus === 'upcoming' && lot.auction?.start_time && (
                  <div className="border-b border-slate-800 px-5 py-4">
                    <CountdownTimer targetDate={lot.auction.start_time} compact label="Auction starts in" />
                  </div>
                )}

                {/* Actions */}
                <div className="space-y-2.5 p-5">
                  {isSold ? (
                    <div className="rounded-xl bg-slate-800 py-3 text-center text-sm font-semibold text-slate-400">
                      🔨 This lot has been sold
                    </div>
                  ) : isLive ? (
                    <Link
                      to={lot.auction?.slug ? `/auction-portal/auctions/${lot.auction.slug}` : '/auction-portal/live'}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition hover:bg-red-500"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                      </span>
                      Join Live Auction
                    </Link>
                  ) : (
                    <Link
                      to={lot.auction?.slug ? `/auction-portal/auctions/${lot.auction.slug}` : '/auction-portal/catalogue'}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
                    >
                      <MdGavel className="h-4 w-4" />
                      View Auction
                    </Link>
                  )}

                  {!isSold && lot.auction?.slug && (
                    <Link
                      to={`/auction-portal/register-to-bid/${lot.auction.slug}`}
                      className="flex w-full items-center justify-center rounded-xl border border-slate-700 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
                    >
                      Register to Bid
                    </Link>
                  )}

                  <div className="flex items-center justify-center gap-2 pt-1">
                    <WatchlistButton lotId={lot.id} />
                    <span className="text-xs text-slate-500">Save to watchlist</span>
                  </div>
                </div>
              </div>

              {lot.bids_count !== undefined && (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 px-5 py-4 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">Total Bids</p>
                  <p className="mt-1 text-2xl font-bold text-white">{lot.bids_count ?? 0}</p>
                </div>
              )}

              {lot.auction && (
                <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                  <div className="border-b border-slate-800 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Auction</p>
                  </div>
                  <div className="space-y-3 p-5 text-sm">
                    <Detail label="Title" value={lot.auction.title} />
                    {lot.auction.start_time && (
                      <Detail
                        label="Date"
                        value={new Date(lot.auction.start_time).toLocaleString('en-GB', {
                          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
                          hour: '2-digit', minute: '2-digit',
                        })}
                      />
                    )}
                    <Link
                      to={`/auction-portal/auctions/${lot.auction.slug}`}
                      className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300"
                    >
                      View full auction <FiArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-widest text-slate-600">{label}</p>
      <p className="mt-0.5 text-sm font-medium capitalize text-slate-300">{String(value)}</p>
    </div>
  )
}
