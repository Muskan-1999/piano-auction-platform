import React, { useState } from 'react'
import { register } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Register() {
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
      console.error(err)
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <form onSubmit={submit} className="auth-form">
      <h1>Register to Bid</h1>
      {error && <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</div>}
      <input placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  )
}
