import api from '../api/axios'

export async function login(email, password) {
  const res = await api.post('/login', { email, password })
  return res.data
}

export async function register(payload) {
  const res = await api.post('/register', payload)
  return res.data
}

export async function logout() {
  const res = await api.post('/logout')
  return res.data
}
