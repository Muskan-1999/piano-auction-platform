/**
 * useMyRegistrations — loads all auction registrations for the logged-in user,
 * returning a map keyed by auctionId: { auctionId: 'pending' | 'approved' | 'rejected' }.
 *
 * Polls every 3 seconds so the catalogue cards always reflect the latest status.
 */

import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'

export const MY_REGISTRATIONS_QUERY_KEY = (userId) => ['my-registrations', userId]

export function useMyRegistrations(userId) {
  return useQuery({
    queryKey: MY_REGISTRATIONS_QUERY_KEY(userId),
    queryFn: async () => {
      const res = await api.get('/user/auction-registrations')
      const items = res.data?.data ?? []
      return items.reduce((map, r) => {
        map[r.auction_id] = r.status
        return map
      }, {})
    },
    refetchInterval: 3000,
    enabled: !!userId,
    placeholderData: {},
  })
}
