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

export async function fetchUserBids(params = {}) {
  const res = await api.get('/user/bids', { params })
  return res.data
}

export async function fetchUserAuctionRegistrations(params = {}) {
  const res = await api.get('/user/auction-registrations', { params })
  return res.data
}

export async function registerForAuction(formData) {
  const res = await api.post('/auction-registrations', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data
}

export async function checkAuctionRegistration(auctionId) {
  const res = await api.get(`/auction-registrations/check/${auctionId}`)
  return res.data
}

export async function fetchLotBids(lotId) {
  const res = await api.get(`/lots/${lotId}/bids`)
  return res.data
}

export async function placeBid(lotId, amount, bidType = 'online') {
  const res = await api.post(`/lots/${lotId}/bid`, { amount, bid_type: bidType })
  return res.data
}
