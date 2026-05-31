import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import useAuth from '../../hooks/useAuth'
import { useMyRegistrations } from '../../hooks/queries/useMyRegistrations'
import { fetchAuctions } from '../../services/auctionService'
import PortalAuctionCard from '../../components/auction/PortalAuctionCard'

const STATUS_FILTERS = [
  { key: 'all',      label: 'All Auctions' },
  { key: 'live',     label: 'Live' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'ended',    label: 'Ended' },
]

export default function PortalCatalogue() {
  const { user }     = useAuth() || {}
  const navigate     = useNavigate()

  const [auctions,     setAuctions]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [search,       setSearch]       = useState('')

  // Polling-based registration map: { auctionId: 'pending'|'approved'|'rejected' }
  // Polls every 3 s — updates instantly when registration is approved/rejected
  const { data: registrationMap = {} } = useMyRegistrations(user?.id)

  // Load auctions once (catalogue doesn't need to poll rapidly)
  useEffect(() => {
    fetchAuctions()
      .then((res) => setAuctions(res?.data || []))
      .catch(() => setAuctions([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = auctions.filter((a) => {
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    const matchSearch =
      !search ||
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.location?.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  function handleRegister(auction) {
    if (!user) {
      navigate('/auction-portal/login')
    } else {
      navigate(`/auction-portal/register-to-bid/${auction.slug}`)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-900">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">Auction Portal</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Auction Catalogue</h1>
          <p className="mt-3 max-w-xl text-sm text-slate-400">
            Browse live, upcoming and past piano auctions. Register to bid and join the action.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search auctions or locations…"
                className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 outline-none focus:border-amber-400/50"
              />
            </div>
            <div className="flex rounded-xl border border-slate-800 bg-slate-950 p-1">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setStatusFilter(f.key)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    statusFilter === f.key
                      ? 'bg-amber-400 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="aspect-[16/9] animate-pulse bg-slate-800" />
                <div className="space-y-3 p-5">
                  <div className="h-3 w-1/4 animate-pulse rounded bg-slate-800" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-slate-800" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl bg-slate-900 p-16 text-center">
            <MdGavel className="mx-auto h-10 w-10 text-slate-700" />
            <p className="mt-4 text-slate-400">No auctions found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((auction) => (
              <PortalAuctionCard
                key={auction.id}
                auction={auction}
                registrationStatus={user ? (registrationMap[auction.id] ?? null) : null}
                onRegister={handleRegister}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
