import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import api from '../../api/axios'

export default function PortalAccount() {
  const { user } = useAuth() || {}
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
    <div className="space-y-8">
      <div className="rounded-3xl bg-slate-900 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Account</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">Profile and verification</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">View your account details, verification status and bidding profile.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-lg shadow-black/20">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-white">Personal information</h2>
              <p className="mt-3 text-sm text-slate-300">Update your registered contact details and verification status.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Name</p>
                <p className="mt-2 text-base text-white">{user?.name || '-'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Email</p>
                <p className="mt-2 text-base text-white">{user?.email || '-'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Phone</p>
                <p className="mt-2 text-base text-white">{user?.phone || '-'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Verified</p>
                <p className="mt-2 text-base text-white">{user?.email_verified_at ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-lg shadow-black/20">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Verification</p>
            <p className="text-base leading-6 text-slate-300">{user?.email_verified_at ? 'Your email is verified. You can place bids and participate in auction events.' : 'Please verify your email to unlock bidding and absentee bid actions.'}</p>
            {!user?.email_verified_at && (
              <button
                type="button"
                onClick={resendVerification}
                className="mt-4 inline-flex items-center rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Resend verification email'}
              </button>
            )}
            {message && <p className="text-sm text-slate-200">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
