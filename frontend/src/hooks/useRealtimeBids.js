/**
 * useRealtimeBids
 *
 * Hybrid real-time bid state for a single lot.
 *
 * Data source:
 *  • React Query polls /lots/{id}/bids every 3 seconds (polling fallback).
 *  • Reverb WebSocket fires instantly when a bid is placed (< 1 second).
 *  • When a Reverb event arrives, the React Query cache is immediately
 *    invalidated, triggering a fresh refetch.
 *  • The local `extraBids` state prepends new bids to the list instantly
 *    before the refetch completes, so the UI never lags.
 *
 * Guarantees:
 *  • Updates within 1 second when Reverb is connected.
 *  • Updates within 3 seconds when Reverb fails.
 *  • Users never need to refresh.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useBidHistory, BID_HISTORY_QUERY_KEY } from './queries/useBidHistory'
import { AUCTION_QUERY_KEY } from './queries/useAuction'
import useAuctionChannel from './useAuctionChannel'

export function timeAgo(dateString) {
  if (!dateString) return ''
  const secs = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  if (secs < 5)    return 'Just now'
  if (secs < 60)   return `${secs} sec ago`
  if (secs < 120)  return '1 min ago'
  if (secs < 3600) return `${Math.floor(secs / 60)} min ago`
  return new Date(dateString).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function maskId(userId) {
  return `B***${String(userId ?? '').slice(-3)}`
}

export default function useRealtimeBids(lot, userId) {
  const lotId       = lot?.id
  const increment   = lot?.bid_increment ?? 50
  const auctionSlug = lot?.auction?.slug

  const queryClient = useQueryClient()

  // Extra bids prepended instantly from WebSocket before query refetches
  const [extraBids,       setExtraBids]       = useState([])
  const [isOwnBidLeading, setIsOwnBidLeading] = useState(false)
  const [wasOutbid,       setWasOutbid]       = useState(false)
  const [soldData,        setSoldData]        = useState(
    lot?.status === 'sold'
      ? {
          winnerMasked: lot.winner_masked ?? null,
          amount:       lot.winning_bid_amount ?? lot.current_bid,
          winnerId:     lot.winner_id,
        }
      : null
  )

  const userIdRef = useRef(userId)
  useEffect(() => { userIdRef.current = userId }, [userId])

  // Poll-based history from React Query
  const { data: polledHistory = [], isLoading } = useBidHistory(lotId, userId)

  // Merge: extra (WebSocket) bids at the top, then polled bids (de-duplicated)
  const bidHistory = (() => {
    const extraIds = new Set(extraBids.map((b) => b.id).filter(Boolean))
    const dedupedPolled = polledHistory.filter((b) => !extraIds.has(b.id))
    return [...extraBids, ...dedupedPolled].slice(0, 50)
  })()

  // Current bid = top of merged history, or lot's current_bid
  const currentBid = bidHistory[0]?.amount ?? lot?.current_bid ?? lot?.starting_bid ?? 0
  const nextBid    = currentBid + increment
  const bidsCount  = bidHistory.length
  const leadingBid = bidHistory[0] ?? null

  // Sync leading status from polled data
  useEffect(() => {
    if (polledHistory.length > 0) {
      setIsOwnBidLeading(polledHistory[0].user_id === userId)
    }
  }, [polledHistory, userId])

  // Clear extra bids once the polled history catches up
  useEffect(() => {
    if (extraBids.length > 0 && polledHistory.length > 0) {
      const polledTop = polledHistory[0]?.amount ?? 0
      const extraTop  = extraBids[0]?.amount ?? 0
      if (polledTop >= extraTop) {
        setExtraBids([])
      }
    }
  }, [polledHistory])

  // ── Reverb: bid placed ────────────────────────────────────────────────────
  const handleBidPlaced = useCallback((bid) => {
    const isOwn = bid.user_id === userIdRef.current

    const entry = {
      id:            bid.id,
      amount:        bid.amount,
      user_id:       bid.user_id,
      placed_at:     bid.placed_at ?? new Date().toISOString(),
      bidder_masked: bid.bidder_masked ?? maskId(bid.user_id),
      isOwn,
      status:        bid.status,
      is_winner:     false,
    }

    setExtraBids((prev) => [entry, ...prev.slice(0, 9)])
    setIsOwnBidLeading(isOwn)
    if (isOwn) setWasOutbid(false)

    // Instantly invalidate React Query cache
    queryClient.invalidateQueries({ queryKey: BID_HISTORY_QUERY_KEY(lotId) })
    if (auctionSlug) {
      queryClient.invalidateQueries({ queryKey: AUCTION_QUERY_KEY(auctionSlug) })
    }
  }, [lotId, auctionSlug, queryClient])

  // ── Reverb: outbid ────────────────────────────────────────────────────────
  const handleOutbid = useCallback((bid) => {
    if (bid.user_id === userIdRef.current) {
      setIsOwnBidLeading(false)
      setWasOutbid(true)
    }
  }, [])

  // ── Reverb: lot sold ──────────────────────────────────────────────────────
  const handleLotSold = useCallback((lotData) => {
    setSoldData({
      winnerMasked: lotData.winner_masked ?? null,
      amount:       lotData.winning_bid_amount ?? lotData.current_bid,
      winnerId:     lotData.winner_id,
    })
    // Force a fresh fetch to get the authoritative sold data
    queryClient.invalidateQueries({ queryKey: BID_HISTORY_QUERY_KEY(lotId) })
    if (auctionSlug) {
      queryClient.invalidateQueries({ queryKey: AUCTION_QUERY_KEY(auctionSlug) })
    }
  }, [lotId, auctionSlug, queryClient])

  useAuctionChannel(lotId, {
    onBidPlaced: handleBidPlaced,
    onOutbid:    handleOutbid,
    onLotSold:   handleLotSold,
  })

  const isOwnWin = soldData !== null && soldData.winnerId === userId

  return {
    currentBid,
    bidHistory,
    bidsCount,
    leadingBid,
    nextBid,
    isOwnBidLeading,
    wasOutbid,
    soldData,
    isOwnWin,
    loading: isLoading && bidHistory.length === 0,
    timeAgo,
  }
}
