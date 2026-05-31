/**
 * useAuction — polls the auction detail every 3 seconds.
 *
 * Strategy: React Query is the source of truth for auction data.
 * Reverb WebSocket events call queryClient.invalidateQueries() for an instant
 * refresh on top of the 3-second fallback polling.
 */

import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'

export const AUCTION_QUERY_KEY = (slug) => ['auction', slug]

export function useAuction(slug) {
  return useQuery({
    queryKey: AUCTION_QUERY_KEY(slug),
    queryFn: async () => {
      const res = await api.get(`/public/auctions/${slug}`)
      // API returns { success, data: { ...auctionFields, auction_lots: [...] } }
      return res.data?.data ?? res.data ?? null
    },
    refetchInterval: 3000,
    enabled: !!slug,
  })
}
