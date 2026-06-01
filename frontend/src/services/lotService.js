import api from '../api/axios'

export async function fetchLots(params = {}) {
  const res = await api.get('/public/lots', { params })
  return res.data
}

export async function fetchLot(slug) {
  const res = await api.get(`/public/lots/${slug}`)
  return res.data
}
