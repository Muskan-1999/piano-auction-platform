/**
 * useBidHistory — polls the bid history for a lot every 3 seconds.
 *
 * Normalises every bid entry to the shape expected by the UI, including
 * masked bidder names and `isOwn` flag.
 */

import { useQuery } from '@tanstack/react-query'
import api from '../../api/axios'

export const BID_HISTORY_QUERY_KEY = (lotId) => ['bid-history', lotId]

function maskId(userId) {
  return `B***${String(userId ?? '').slice(-3)}`
}

export function useBidHistory(lotId, userId) {
  return useQuery({
    queryKey: BID_HISTORY_QUERY_KEY(lotId),
    queryFn: async () => {
      const res = await api.get(`/lots/${lotId}/bids`)
      const bids = res.data?.data ?? []
      return bids.map((b) => ({
        id:            b.id,
        amount:        b.amount,
        user_id:       b.user_id,
        placed_at:     b.placed_at ?? b.created_at,
        bidder_masked: b.bidder_masked ?? maskId(b.user_id),
        isOwn:         b.user_id === userId,
        status:        b.status,
        is_winner:     b.is_winner ?? false,
      }))
    },
    refetchInterval: 3000,
    enabled: !!lotId,
  })
}
