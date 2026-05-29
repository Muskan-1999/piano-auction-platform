import React, { useState } from 'react'
import { register } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()
    try {
      await register({ email, password })
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert('Register failed')
    }
  }

  return (
    <form onSubmit={submit} className="auth-form">
      <h1>Register</h1>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  )
}
