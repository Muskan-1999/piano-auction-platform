import api from '../api/axios'

export async function fetchWatchlist() {
  const res = await api.get('/watchlist')
  return res.data
}

export async function fetchWatchlistIds() {
  const res = await api.get('/watchlist')
  const items = res.data?.data || []
  return items.map((item) => item.lot_id)
}

export async function addToWatchlist(lotId) {
  const res = await api.post(`/watchlist/${lotId}`)
  return res.data
}

export async function removeFromWatchlist(lotId) {
  const res = await api.delete(`/watchlist/${lotId}`)
  return res.data
}

export async function checkInWatchlist(lotId) {
  const res = await api.get(`/watchlist/check/${lotId}`)
  return res.data
}
