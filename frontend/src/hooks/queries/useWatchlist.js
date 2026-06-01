/**
 * useWatchlist / useWatchlistIds
 *
 * React Query hooks that poll the watchlist every 5 s.
 * Mutations (add / remove) optimistically update the cache for instant UI.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  addToWatchlist,
  fetchWatchlist,
  fetchWatchlistIds,
  removeFromWatchlist,
} from '../../services/watchlistService'

export const WATCHLIST_KEY     = (userId) => ['watchlist',     userId]
export const WATCHLIST_IDS_KEY = (userId) => ['watchlist-ids', userId]

/** Full watchlist items (for the watchlist page). */
export function useWatchlist(userId) {
  return useQuery({
    queryKey:       WATCHLIST_KEY(userId),
    queryFn:        async () => {
      const res = await fetchWatchlist()
      return res?.data ?? []
    },
    refetchInterval: 5000,
    enabled:         !!userId,
    placeholderData: [],
  })
}

/** Just the set of lot IDs in the watchlist (lightweight, for buttons). */
export function useWatchlistIds(userId) {
  return useQuery({
    queryKey:       WATCHLIST_IDS_KEY(userId),
    queryFn:        fetchWatchlistIds,
    refetchInterval: 5000,
    enabled:         !!userId,
    placeholderData: [],
    select:          (ids) => new Set(ids),
  })
}

/** Toggle a lot in / out of the watchlist with optimistic updates. */
export function useToggleWatchlist(userId) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ lotId, inWatchlist }) =>
      inWatchlist ? removeFromWatchlist(lotId) : addToWatchlist(lotId),

    onMutate: async ({ lotId, inWatchlist }) => {
      await queryClient.cancelQueries({ queryKey: WATCHLIST_IDS_KEY(userId) })
      const previous = queryClient.getQueryData(WATCHLIST_IDS_KEY(userId))

      // Optimistic update
      queryClient.setQueryData(WATCHLIST_IDS_KEY(userId), (prev = []) => {
        const arr = Array.from(typeof prev === 'object' && prev instanceof Set ? prev : prev)
        return inWatchlist
          ? arr.filter((id) => id !== lotId)
          : [...arr, lotId]
      })

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(WATCHLIST_IDS_KEY(userId), context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: WATCHLIST_IDS_KEY(userId) })
      queryClient.invalidateQueries({ queryKey: WATCHLIST_KEY(userId) })
    },
  })
}
