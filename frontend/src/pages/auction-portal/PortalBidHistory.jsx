import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiFilter } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import { fetchUserBids } from '../../services/auctionService'

function fmt(amount) {
  return '£' + Number(amount || 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })
}

function getResult(bid) {
  const lotStatus = bid.lot?.status
  if (lotStatus === 'sold') {
    return bid.is_winning ? { label: 'Won', color: 'text-emerald-400 bg-emerald-500/10' } : { label: 'Lost', color: 'text-slate-400 bg-slate-800' }
  }
  if (bid.is_winning || bid.status === 'winning') {
    return { label: 'Winning', color: 'text-emerald-400 bg-emerald-500/10' }
  }
  if (bid.status === 'outbid') {
    return { label: 'Outbid', color: 'text-red-400 bg-red-500/10' }
  }
  if (bid.status === 'cancelled') {
    return { label: 'Cancelled', color: 'text-slate-500 bg-slate-800' }
  }
  return { label: bid.status || 'Active', color: 'text-slate-300 bg-slate-800' }
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'winning', label: 'Winning' },
  { key: 'outbid', label: 'Outbid' },
  { key: 'won', label: 'Won' },
  { key: 'lost', label: 'Lost' },
]

export default function PortalBidHistory() {
  const [bids, setBids] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const PER_PAGE = 15

  useEffect(() => {
    fetchUserBids()
      .then((res) => setBids(res?.data || []))
      .catch(() => setBids([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = bids.filter((bid) => {
    if (filter === 'all') return true
    const result = getResult(bid)
    return result.label.toLowerCase() === filter
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const won = bids.filter((b) => b.lot?.status === 'sold' && b.is_winning).length
  const outbid = bids.filter((b) => b.status === 'outbid').length
  const winning = bids.filter((b) => b.is_winning || b.status === 'winning').length

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="border-b border-slate-900 bg-slate-900">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-amber-400">Your Account</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Bid History</h1>
          <p className="mt-3 text-sm text-slate-400">
            Complete history of all bids you have placed across all auctions.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Bids', value: bids.length },
            { label: 'Currently Winning', value: winning },
            { label: 'Times Outbid', value: outbid },
            { label: 'Lots Won', value: won },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-slate-500">{s.label}</p>
              <p className="mt-3 text-3xl font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filter + table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          {/* Filter tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
            <div className="flex rounded-lg bg-slate-950 p-1">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setFilter(f.key); setPage(1) }}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                    filter === f.key ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="text-sm text-slate-500">{filtered.length} bids</span>
          </div>

          {loading ? (
            <div className="space-y-px">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 animate-pulse bg-slate-950/50" />
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="p-16 text-center">
              <MdGavel className="mx-auto h-8 w-8 text-slate-700" />
              <p className="mt-3 text-sm text-slate-400">No bids in this category.</p>
              <Link to="/auction-portal/catalogue" className="mt-3 inline-flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300">
                Browse Auctions <FiArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/60">
                      <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">Auction</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">Lot</th>
                      <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-widest text-slate-500">Amount</th>
                      <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-500">Result</th>
                      <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-slate-500">Date</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {paginated.map((bid) => {
                      const result = getResult(bid)
                      return (
                        <tr key={bid.id} className="transition hover:bg-slate-800/30">
                          <td className="px-5 py-4 text-slate-300">
                            {bid.lot?.auction?.title || 'Auction'}
                          </td>
                          <td className="px-5 py-4">
                            <div>
                              <p className="font-medium text-white">
                                Lot {bid.lot?.lot_number || '—'}
                              </p>
                              <p className="text-xs text-slate-500">{bid.lot?.title}</p>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-right font-mono font-semibold text-white">
                            {fmt(bid.amount)}
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${result.color}`}>
                              {result.label}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-slate-400">
                            {new Date(bid.placed_at || bid.created_at).toLocaleString('en-GB', {
                              day: 'numeric', month: 'short', year: 'numeric',
                              hour: '2-digit', minute: '2-digit'
                            })}
                          </td>
                          <td className="px-5 py-4">
                            {bid.lot?.auction?.slug && (
                              <Link
                                to={`/auction-portal/auctions/${bid.lot.auction.slug}`}
                                className="text-xs text-amber-400 hover:text-amber-300"
                              >
                                View
                              </Link>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-800 px-5 py-3">
                  <p className="text-sm text-slate-500">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-400 disabled:opacity-40 hover:border-slate-700 hover:text-white"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="rounded-lg border border-slate-800 px-3 py-1.5 text-xs text-slate-400 disabled:opacity-40 hover:border-slate-700 hover:text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
