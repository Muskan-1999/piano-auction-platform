/**
 * useAuctionStatus
 *
 * Tracks real-time auction status changes over WebSocket so auction cards
 * and the detail page can update without a page refresh.
 *
 * Listens on the public `auctions.{id}` channel for:
 *   .auction.started  → status becomes 'live'
 *   .auction.ended    → status becomes 'ended'
 *
 * Usage:
 *   const status = useAuctionStatus(auction)
 *   // status: 'live' | 'ended' | 'upcoming' | ...
 */

import { useEffect, useRef, useState } from 'react'
import { getEcho } from '../lib/echo'

export default function useAuctionStatus(auction) {
  const [status, setStatus] = useState(auction?.status ?? null)

  // Sync when parent swaps the auction object (e.g. after a full refetch)
  useEffect(() => {
    setStatus(auction?.status ?? null)
  }, [auction?.status])

  useEffect(() => {
    const id = auction?.id
    if (!id) return

    const echo = getEcho()
    const ch   = echo.channel(`auctions.${id}`)

    ch.listen('.auction.started', () => setStatus('live'))
    ch.listen('.auction.ended',   () => setStatus('ended'))

    return () => {
      ch.stopListening('.auction.started')
      ch.stopListening('.auction.ended')
      echo.leave(`auctions.${id}`)
    }
  }, [auction?.id])

  return status
}
