import { QueryClient } from '@tanstack/react-query'

/**
 * Shared QueryClient instance.
 *
 * defaultOptions:
 *  - staleTime 0     → data is always considered stale; refetch on focus
 *  - retry 1         → one retry on failure so the UI recovers quickly
 *  - refetchOnWindowFocus → always re-fetch when the user returns to the tab
 *
 * Individual queries add their own refetchInterval (e.g. 3000 ms) for polling.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
})

export default queryClient
