import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiTrendingDown, FiTrendingUp, FiZap } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import { fetchUserBids } from '../../services/auctionService'
import { getEcho } from '../../lib/echo'
import { useNotifications } from '../../contexts/NotificationContext'
import useAuth from '../../hooks/useAuth'

function fmt(amount) {
  return '£' + Number(amount || 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })
}

function BidStatusBadge({ bid }) {
  if (bid.is_winning || bid.status === 'winning') {
    return (
      <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
        <FiTrendingUp className="h-3.5 w-3.5" />
        Highest Bidder
      </span>
    )
  }
  if (bid.status === 'outbid') {
    return (
      <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold text-red-400">
        <FiTrendingDown className="h-3.5 w-3.5" />
        Outbid
      </span>
    )
  }
  if (bid.lot?.status === 'sold') {
    return (
      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-slate-300">
        Lot Sold
      </span>
    )
  }
  return (
    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-400">
      {bid.status || 'Active'}
    </span>
  )
}

export default function PortalMyBids() {
  const { user } = useAuth() || {}
  const { addNotification } = useNotifications() || {}
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('active')
  const channelsRef = useRef([])

  async function load() {
    try {
      const res = await fetchUserBids()
      setBids(res?.data || [])
    } catch {
      setBids([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // Subscribe to real-time updates for lots where user has bids
  useEffect(() => {
    if (!bids.length || !user) return

    const echo = getEcho()
    const lotIds = [...new Set(bids.map((b) => b.lot_id).filter(Boolean))]

    channelsRef.current.forEach((ch) => {
      ch.stopListening('.bid.placed')
      ch.stopListening('.bid.outbid')
    })
    channelsRef.current = []

    lotIds.forEach((lotId) => {
      const channel = echo.channel(`lots.${lotId}`)

      channel.listen('.bid.placed', (data) => {
        const bid = data.bid
        if (bid.user_id !== user?.id) {
          setBids((prev) =>
            prev.map((b) =>
              b.lot_id === lotId && (b.is_winning || b.status === 'winning')
                ? { ...b, status: 'outbid', is_winning: false }
                : b
            )
          )
        } else {
          setBids((prev) =>
            prev.map((b) =>
              b.lot_id === lotId
                ? { ...b, status: 'outbid', is_winning: false }
                : b
            )
          )
        }
      })

      channel.listen('.bid.outbid', (data) => {
        const bid = data.bid
        if (bid.user_id === user?.id) {
          setBids((prev) =>
            prev.map((b) =>
              b.id === bid.id ? { ...b, status: 'outbid', is_winning: false } : b
            )
          )
          const lotTitle = bids.find((b) => b.lot_id === lotId)?.lot?.title || `Lot ${lotId}`
          addNotification?.({
            type: 'outbid',
            message: `You have been outbid on ${lotTitle}`,
          })
        }
      })

      channelsRef.current.push(channel)
    })

    return () => {
      channelsRef.current.forEach((ch) => {
        ch.stopListening('.bid.placed')
        ch.stopListening('.bid.outbid')
      })
    }
  }, [bids.length, user?.id])

  const activeBids = bids.filter((b) => b.is_winning || b.status === 'winning')
  const outbidBids = bids.filter((b) => b.status === 'outbid')
  const displayBids = filter === 'active' ? activeBids : filter === 'outbid' ? outbidBids : bids

  const totalValue = activeBids.reduce((sum, b) => sum + (b.amount || 0), 0)

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-900">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">Live Dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">My Active Bids</h1>
          <p className="mt-3 text-sm text-slate-400">
            Real-time tracking of your bids. Updates instantly when you are outbid.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Highest Bids" value={activeBids.length} highlight />
          <StatCard label="Times Outbid" value={outbidBids.length} />
          <StatCard label="Total Bid Value" value={fmt(totalValue)} />
        </div>

        {/* Filter tabs */}
        <div className="flex rounded-xl border border-slate-800 bg-slate-900 p-1 w-fit">
          {[
            { key: 'active', label: 'Highest Bidder', count: activeBids.length },
            { key: 'outbid', label: 'Outbid', count: outbidBids.length },
            { key: 'all', label: 'All Bids', count: bids.length },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === f.key ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f.label}
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                filter === f.key ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Bid cards */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-900" />
            ))}
          </div>
        ) : displayBids.length === 0 ? (
          <div className="rounded-2xl bg-slate-900 p-12 text-center">
            <MdGavel className="mx-auto h-10 w-10 text-slate-700" />
            <p className="mt-4 text-slate-400">
              {filter === 'active' ? 'You are not the highest bidder on any lots.' : 'No bids in this category.'}
            </p>
            <Link to="/auction-portal/catalogue" className="mt-4 inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300">
              Browse Auctions <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {displayBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function BidCard({ bid }) {
  const isWinning = bid.is_winning || bid.status === 'winning'
  const isSold = bid.lot?.status === 'sold'

  return (
    <div className={`rounded-2xl border bg-slate-900 p-5 transition ${
      isWinning ? 'border-emerald-800/30' : 'border-slate-800'
    }`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/80">
            {bid.lot?.auction?.title || 'Auction'}
          </p>
          <h3 className="mt-1 text-base font-bold text-white">
            Lot {bid.lot?.lot_number}: {bid.lot?.title || 'Piano'}
          </h3>
          {bid.lot?.brand && (
            <p className="mt-0.5 text-sm text-slate-400">{bid.lot?.brand}</p>
          )}
        </div>

        <BidStatusBadge bid={bid} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Your Bid</p>
          <p className="mt-1 font-mono text-lg font-bold text-white">{fmt(bid.amount)}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Lot Status</p>
          <p className="mt-1 text-sm font-semibold capitalize text-slate-300">{bid.lot?.status || '—'}</p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Placed</p>
          <p className="mt-1 text-sm text-slate-300">
            {new Date(bid.placed_at || bid.created_at).toLocaleString('en-GB', {
              day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
            })}
          </p>
        </div>
        <div>
          {bid.lot?.auction?.slug && (
            <Link
              to={`/auction-portal/auctions/${bid.lot.auction.slug}`}
              className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 mt-1"
            >
              View <FiArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>

      {isWinning && (
        <div className="mt-4 rounded-xl bg-emerald-950/30 px-4 py-2.5 text-sm text-emerald-300">
          🏆 You are currently the highest bidder on this lot.
        </div>
      )}
      {bid.status === 'outbid' && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-red-950/20 px-4 py-2.5">
          <p className="text-sm text-red-300">⚠️ You have been outbid on this lot.</p>
          {bid.lot?.auction?.slug && (
            <Link
              to={`/auction-portal/auctions/${bid.lot.auction.slug}`}
              className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white hover:bg-red-500"
            >
              Bid Again
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, highlight }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${highlight ? 'text-white' : 'text-slate-300'}`}>{value}</p>
    </div>
  )
}
