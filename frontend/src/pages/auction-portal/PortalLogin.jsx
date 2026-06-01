import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import useAuth from '../../hooks/useAuth'

export default function PortalLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login: setUser } = useAuth() || {}

  async function submit(e) {
    e.preventDefault()
    setError('')

    try {
      const res = await login(email, password)
      setUser(res.user)
      navigate('/auction-portal')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-xl shadow-black/30">
      <h1 className="text-3xl font-semibold text-white">Login to the Auction Portal</h1>
      <p className="mt-2 text-sm text-slate-400">Enter your account details to access live auctions and bid history.</p>

      {error && <div className="mt-6 rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

      <form onSubmit={submit} className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
        </div>
        <button type="submit" className="w-full rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300">Login</button>
      </form>
    </div>
  )
}
