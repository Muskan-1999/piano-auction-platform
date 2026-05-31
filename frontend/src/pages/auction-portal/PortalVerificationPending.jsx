import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/axios'

export default function PortalVerificationPending() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function resendVerification() {
    setMessage('')
    setLoading(true)

    try {
      const response = await api.post('/email/verification-notification')
      setMessage(response.data.message || 'Verification email resent.')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Unable to resend verification email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-xl shadow-black/30">
      <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Email verification pending</p>
      <h1 className="mt-4 text-4xl font-semibold text-white">Verify your email to start bidding</h1>
      <p className="mt-4 text-sm leading-6 text-slate-300">A verification link has been sent to your inbox. Please confirm your email before placing bids or joining live auctions.</p>

      <div className="mt-8 space-y-4">
        <button type="button" onClick={resendVerification} disabled={loading} className="inline-flex items-center rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300">
          {loading ? 'Sending...' : 'Resend verification email'}
        </button>
        <p className="text-sm text-slate-300">If you still have not received the link, check your spam folder or update your email address in your account settings.</p>
        <Link to="/auction-portal" className="inline-flex text-sm font-semibold text-amber-300 hover:text-white">Return to portal home</Link>
        {message && <p className="rounded-2xl bg-slate-800 p-4 text-sm text-slate-100">{message}</p>}
      </div>
    </div>
  )
}
