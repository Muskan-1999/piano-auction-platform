/**
 * useAuctionStatus — derives the live auction status from the React Query
 * auction cache, providing a simple string ('live' | 'ended' | 'upcoming' …).
 *
 * This is the polling side of the status. The WebSocket side lives in
 * useRealtimeNotifications which calls queryClient.invalidateQueries on
 * auction.ended / auction.started events.
 */

import { useQueryClient } from '@tanstack/react-query'
import { AUCTION_QUERY_KEY } from './useAuction'
import { useAuction } from './useAuction'

export function useAuctionStatus(slug) {
  const { data: auction } = useAuction(slug)
  return auction?.status ?? null
}
