import api from './axios'

export const postTelephone = (data) => api.post('/telephone-bids', data)
export const postAbsentee = (data) => api.post('/absentee-bids', data)
export const postOnline = (data) => api.post('/bidding/online', data)

export default { postTelephone, postAbsentee, postOnline }
