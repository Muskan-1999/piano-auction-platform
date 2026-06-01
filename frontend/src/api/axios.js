import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
const token = localStorage.getItem('authToken')

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
})

export function setAuthToken(authToken) {
  if (authToken) {
    localStorage.setItem('authToken', authToken)
    api.defaults.headers.common.Authorization = `Bearer ${authToken}`
  } else {
    localStorage.removeItem('authToken')
    delete api.defaults.headers.common.Authorization
  }
}

export default api
