import api, { setAuthToken } from '../api/axios'
import { resetEcho } from '../lib/echo'

export async function login(email, password) {
  const res = await api.post('/login', { email, password })
  setAuthToken(res.data.token)
  // Reset Echo so the next subscription uses the new Bearer token
  resetEcho()
  return res.data
}

export async function register(payload) {
  const res = await api.post('/register', payload)
  setAuthToken(res.data.token)
  resetEcho()
  return res.data
}

export async function logout() {
  try {
    await api.post('/logout')
  } catch (_) { /* ignore network errors on logout */ }
  setAuthToken(null)
  // Reset Echo so the next visitor gets an unauthenticated connection
  resetEcho()
}
