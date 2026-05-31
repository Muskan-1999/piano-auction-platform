/**
 * useAuctionRegistration — polls the user's registration status for a single
 * auction every 3 seconds.
 *
 * This acts as the polling fallback for the Reverb private channel.
 * When the private channel is not available (auth failure, disconnect),
 * the registration status will still update within 3 seconds.
 */

import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'

export const AUCTION_REG_QUERY_KEY = (auctionId, userId) => [
  'auction-registration',
  auctionId,
  userId,
]

export function useAuctionRegistration(auctionId, userId) {
  return useQuery({
    queryKey: AUCTION_REG_QUERY_KEY(auctionId, userId),
    queryFn: async () => {
      const res = await api.get(`/auction-registrations/check/${auctionId}`)
      return res.data ?? null
    },
    refetchInterval: 3000,
    enabled: !!auctionId && !!userId,
  })
}
