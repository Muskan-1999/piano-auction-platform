import api from '../api/axios'

export async function fetchAuctions(params = {}) {
  const res = await api.get('/public/auctions', { params })
  return res.data
}

export async function fetchAuction(slug) {
  const res = await api.get(`/public/auctions/${slug}`)
  return res.data
}

export async function fetchLiveAuctions(params = {}) {
  const res = await api.get('/public/live-auctions', { params })
  return res.data
}

export async function fetchFeatured(params = {}) {
  const res = await api.get('/public/featured-auctions', { params })
  return res.data
}
