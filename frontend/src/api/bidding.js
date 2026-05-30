import api from './axios'

export const postTelephone = (data) => api.post('/bidding/telephone', data)
export const postAbsentee = (data) => api.post('/bidding/absentee', data)
export const postOnline = (data) => api.post('/bidding/online', data)

export default { postTelephone, postAbsentee, postOnline }
