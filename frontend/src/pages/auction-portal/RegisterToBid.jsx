import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAuction, registerForAuction } from '../../services/auctionService'

export default function RegisterToBid() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [auction, setAuction] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    country: '',
    address: '',
    government_id: null,
    proof_of_address: null,
    terms: false,
  })

  useEffect(() => {
    if (!slug) return

    fetchAuction(slug)
      .then((res) => {
        const payload = res.data || res
        setAuction(payload.data || payload)
      })
      .catch(() => setError('Unable to load auction details.'))
      .finally(() => setLoading(false))
  }, [slug])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)

    if (!auction) {
      setError('Auction information is missing.')
      setSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.append('auction_id', auction.id)
    formData.append('first_name', formState.first_name)
    formData.append('last_name', formState.last_name)
    formData.append('phone', formState.phone)
    formData.append('country', formState.country)
    formData.append('address', formState.address)
    formData.append('terms', formState.terms ? '1' : '0')
    if (formState.government_id) {
      formData.append('government_id', formState.government_id)
    }
    if (formState.proof_of_address) {
      formData.append('proof_of_address', formState.proof_of_address)
    }

    try {
      await registerForAuction(formData)
      setSuccess('Your auction registration has been submitted. We will notify you after approval.')
      setFormState({
        first_name: '',
        last_name: '',
        phone: '',
        country: '',
        address: '',
        government_id: null,
        proof_of_address: null,
      })
      setTimeout(() => navigate('/auction-portal/my-auctions'), 1500)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to submit registration. Please check your details.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleChange(event) {
    const { name, value, files } = event.target
    if (files) {
      setFormState((prev) => ({ ...prev, [name]: files[0] }))
      return
    }

    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Register to Bid</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Register for {auction?.title || 'Auction'}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
          Complete your bidder registration to apply for approved bidding access on this auction.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-slate-900 p-8 text-slate-400">Loading auction details...</div>
      ) : error ? (
        <div className="rounded-3xl bg-rose-900 p-8 text-rose-100">{error}</div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-6 rounded-3xl bg-slate-900 p-8 shadow-lg shadow-black/20">
            <div>
              <label className="text-sm font-medium text-slate-200">First name</label>
              <input
                name="first_name"
                value={formState.first_name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Last name</label>
              <input
                name="last_name"
                value={formState.last_name}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Phone</label>
              <input
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Country</label>
              <input
                name="country"
                value={formState.country}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="text-sm font-medium text-slate-200">Address</label>
              <textarea
                name="address"
                value={formState.address}
                onChange={handleChange}
                required
                rows={4}
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Government ID</label>
              <input
                name="government_id"
                type="file"
                accept="image/*,.pdf"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-200">Proof of address</label>
              <input
                name="proof_of_address"
                type="file"
                accept="image/*,.pdf"
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none"
              />
            </div>
            <div className="flex items-start gap-3">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={formState.terms}
                onChange={(event) => setFormState((prev) => ({ ...prev, terms: event.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-amber-400 focus:ring-amber-300"
              />
              <label htmlFor="terms" className="text-sm leading-6 text-slate-300">
                I agree to the terms and conditions for bidder registration.
              </label>
            </div>
            {success && <div className="rounded-2xl bg-emerald-900 p-4 text-sm text-emerald-100">{success}</div>}
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit Registration'}
            </button>
            {error && <p className="text-sm text-rose-300">{error}</p>}
          </div>

          <div className="space-y-6 rounded-3xl bg-slate-900 p-8 shadow-lg shadow-black/20">
            <div>
              <h2 className="text-xl font-semibold text-white">Auction summary</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{auction?.description}</p>
            </div>
            <div className="space-y-2 rounded-3xl bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Auction date</p>
              <p className="text-lg font-semibold text-white">{auction?.start_time ? new Date(auction.start_time).toLocaleDateString() : 'TBA'}</p>
            </div>
            {auction?.catalogue_pdf_url && (
              <a
                href={auction.catalogue_pdf_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-amber-300 hover:border-amber-400 hover:text-white"
              >
                View auction catalogue PDF
              </a>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
