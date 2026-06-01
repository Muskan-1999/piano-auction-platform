import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import useAuth from '../../hooks/useAuth'

export default function PortalRegister() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login: setUser } = useAuth() || {}

  async function submit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      const res = await register({
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        password,
        password_confirmation: confirmPassword,
      })

      setUser(res.user)
      navigate('/auction-portal/verify')
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-10 shadow-xl shadow-black/30">
      <h1 className="text-3xl font-semibold text-white">Register to Bid</h1>
      <p className="mt-2 text-sm text-slate-400">Create your account, verify your email and start bidding.</p>

      {error && <div className="mt-6 rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">{error}</div>}

      <form onSubmit={submit} className="mt-8 grid gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">First name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Last name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300">Phone number</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">Confirm password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400" />
          </div>
        </div>
        <button type="submit" className="rounded-2xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-amber-300">Create account</button>
      </form>
    </div>
  )
}
