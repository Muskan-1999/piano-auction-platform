import axios from 'axios'
import api from './axios'

// No-auth instance for public guest bid endpoints
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const postTelephone = (data) => publicApi.post('/telephone-bids', data)
export const postAbsentee = (data) => publicApi.post('/absentee-bids', data)
export const postOnline = (data) => api.post('/bidding/online', data)

export default { postTelephone, postAbsentee, postOnline }
