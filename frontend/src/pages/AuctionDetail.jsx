/**
 * AuctionDetail  (/auctions/:slug)
 *
 * Public informational page for an auction.
 * React Query polls every 3 s so the status, lots and bid counts
 * stay fresh without a manual refresh.
 */

import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { FiCalendar, FiDownload, FiMapPin } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import api from '../api/axios'
import AuctionStatusBadge from '../components/auction/AuctionStatusBadge'
import CountdownTimer from '../components/auction/CountdownTimer'
import WatchlistButton from '../components/auction/WatchlistButton'

function fmt(n) {
  return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })
}

const PLACEHOLDER =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%230f172a"/%3E%3C/svg%3E'

// ─── Lot card (read-only, links to portal) ────────────────────────────────────

function LotCard({ lot, auctionSlug }) {
  const isSold = lot.status === 'sold'
  const isLive = lot.status === 'live'

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:border-slate-700">
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
            <span className="rounded bg-slate-700 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-300">SOLD</span>
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
        <div className="absolute right-2 top-2">
          <WatchlistButton lotId={lot.id} size="sm" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {lot.brand && (
          <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">{lot.brand}</p>
        )}
        <h3 className="text-sm font-bold text-white">{lot.title}</h3>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-widest text-slate-500">
              {(lot.bids_count ?? 0) > 0 ? 'Current Bid' : 'Starting Bid'}
            </p>
            <p className="font-mono text-base font-bold text-white">
              {fmt((lot.bids_count ?? 0) > 0 ? lot.current_bid : lot.starting_bid)}
            </p>
          </div>
          {(lot.bids_count ?? 0) > 0 && (
            <p className="text-xs text-slate-500">{lot.bids_count} bids</p>
          )}
        </div>

        <Link
          to={`/lots/${lot.slug}`}
          className="mt-4 flex w-full items-center justify-center rounded-xl border border-slate-700 py-2 text-xs font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
        >
          View Lot
        </Link>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AuctionDetail() {
  const { slug } = useParams()

  const { data: auction, isLoading } = useQuery({
    queryKey:        ['public-auction', slug],
    queryFn:         async () => {
      const res = await api.get(`/public/auctions/${slug}`)
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

  if (!auction) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-950 text-slate-400">
        Auction not found.
      </div>
    )
  }

  const lots    = auction.auction_lots ?? []
  const isLive  = auction.status === 'live'
  const isUpcoming = auction.status === 'upcoming'
  const isEnded = auction.status === 'ended'
  const portalUrl = `/auction-portal/auctions/${auction.slug}`

  return (
    <div className="min-h-screen bg-slate-950">

      {/* ── Banner ── */}
      <div className="relative">
        {auction.banner_image ? (
          <div className="relative h-[40vh] min-h-[220px] overflow-hidden lg:h-[50vh]">
            <img
              src={auction.banner_image}
              alt={auction.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-slate-950/10" />
          </div>
        ) : (
          <div className="h-32 bg-gradient-to-br from-slate-900 to-slate-950" />
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-screen-xl px-4 pb-8 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <AuctionStatusBadge status={auction.status} />
                <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                  {auction.title}
                </h1>
                {auction.location && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                    <FiMapPin className="h-4 w-4" /> {auction.location}
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="flex shrink-0 flex-col items-start gap-2 lg:items-end">
                {isLive && (
                  <Link
                    to={portalUrl}
                    className="flex items-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-red-500"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                    </span>
                    Join Live Auction
                  </Link>
                )}
                {!isEnded && (
                  <Link
                    to={`/auction-portal/register-to-bid/${auction.slug}`}
                    className="rounded-full border border-amber-400/40 bg-amber-400/5 px-5 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/10"
                  >
                    Register to Bid
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* Left: description + lots grid */}
          <div className="space-y-8">

            {/* Countdown */}
            {isUpcoming && auction.start_time && (
              <div className="rounded-2xl border border-amber-400/20 bg-slate-900 p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">Auction Starts In</p>
                <div className="mt-5">
                  <CountdownTimer targetDate={auction.start_time} />
                </div>
              </div>
            )}

            {/* Description */}
            {auction.description && (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">About This Auction</h2>
                <div
                  className="prose prose-sm prose-invert max-w-none text-slate-300"
                  dangerouslySetInnerHTML={{ __html: auction.description }}
                />
              </div>
            )}

            {/* Lots grid */}
            {lots.length > 0 && (
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">
                    Lots
                    <span className="ml-2 text-sm font-normal text-slate-500">({lots.length})</span>
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
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {lots.map((lot) => (
                    <LotCard key={lot.id} lot={lot} auctionSlug={auction.slug} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: auction info card */}
          <div>
            <div className="sticky top-20 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 px-5 py-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Auction Details</h3>
                </div>
                <div className="space-y-4 p-5 text-sm">
                  {[
                    { label: 'Type',    value: auction.auction_type },
                    { label: 'Start',   value: auction.start_time ? new Date(auction.start_time).toLocaleString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'TBA' },
                    { label: 'End',     value: auction.end_time ? new Date(auction.end_time).toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'TBA' },
                    auction.preview_start_time && { label: 'Preview', value: new Date(auction.preview_start_time).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) },
                    auction.location && { label: 'Location', value: auction.location },
                    { label: 'Lots',    value: `${lots.length} lots` },
                  ].filter(Boolean).map((row) => (
                    <div key={row.label}>
                      <p className="text-[9px] uppercase tracking-widest text-slate-600">{row.label}</p>
                      <p className="mt-0.5 capitalize text-slate-200">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catalogue PDF */}
              {auction.catalogue_pdf_url ? (
                <a
                  href={auction.catalogue_pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 text-amber-300 transition hover:bg-amber-400/10"
                >
                  <FiDownload className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold">View Catalogue PDF</p>
                    <p className="text-[10px] text-amber-400/50">Opens in new tab</p>
                  </div>
                </a>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-center">
                  <p className="text-sm text-slate-500">Catalogue Coming Soon</p>
                </div>
              )}

              {/* Portal CTA */}
              <Link
                to={portalUrl}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
              >
                <MdGavel className="h-4 w-4" />
                {isLive ? 'Join Live Auction' : 'View in Auction Portal'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}