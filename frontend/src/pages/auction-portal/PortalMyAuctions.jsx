import React, { useEffect, useState } from 'react'
import { fetchUserAuctionRegistrations } from '../../services/auctionService'

export default function PortalMyAuctions() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchUserAuctionRegistrations()
      .then((res) => {
        const payload = res.data || res
        setRegistrations(payload.data || payload || [])
      })
      .catch(() => setError('Unable to load your auction registrations.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-300">My Auctions</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Your auction registration status</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Track your current auction applications and see which registrations are approved, pending or rejected.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-slate-900 p-8 text-slate-400">Loading your registrations...</div>
      ) : error ? (
        <div className="rounded-3xl bg-rose-900 p-8 text-rose-100">{error}</div>
      ) : registrations.length === 0 ? (
        <div className="rounded-3xl bg-slate-900 p-8 text-slate-300">You do not have any auction registrations yet.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {registrations.map((registration) => (
            <div key={registration.id} className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg shadow-black/20">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-amber-300">{registration.auction.title}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{registration.auction.start_time ? new Date(registration.auction.start_time).toLocaleDateString() : 'Upcoming'}</h2>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  registration.status === 'approved' ? 'bg-emerald-500 text-slate-950' : registration.status === 'pending' ? 'bg-amber-500 text-slate-950' : 'bg-rose-500 text-white'
                }`}>{registration.status}</span>
              </div>

              {registration.auction.catalogue_pdf_url && (
                <a
                  href={registration.auction.catalogue_pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-amber-300 hover:border-amber-400 hover:text-white"
                >
                  View auction catalogue
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
