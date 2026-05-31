import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login: setUser } = useAuth() || {}

  async function submit(e) {
    e.preventDefault()
    try {
      const res = await login(email, password)
      setUser(res.user)
      navigate('/auction-portal')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={submit} className="auth-form">
      <h1>Login</h1>
      {error && <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}
