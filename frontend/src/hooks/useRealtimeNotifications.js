/**
 * useRealtimeNotifications
 *
 * Wires Reverb WebSocket events to:
 *   1. react-hot-toast notifications.
 *   2. The bell notification context.
 *   3. React Query cache invalidation (so polling + WebSocket work together).
 *
 * Toast matrix:
 *  bid.placed  + isOwn   → "You are currently the highest bidder"  (green)
 *  bid.placed  + !isOwn  → "New bid placed: £X,XXX"               (slate)
 *  bid.outbid  + isOwn   → "You have been outbid"                 (amber)
 *  lot.sold              → "Lot X sold — Final: £X,XXX"           (grey)
 *  auction.ended         → "Auction has ended"                    (grey)
 *  registration.approved → "You are approved to bid!"             (green)
 *  registration.rejected → "Registration not approved"           (red)
 */

import { useCallback, useEffect, useRef } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { getEcho } from '../lib/echo'
import { useNotifications } from '../contexts/NotificationContext'
import useUserChannel from './useUserChannel'
import { AUCTION_QUERY_KEY } from './queries/useAuction'
import { BID_HISTORY_QUERY_KEY } from './queries/useBidHistory'
import { AUCTION_REG_QUERY_KEY } from './queries/useAuctionRegistration'
import { MY_REGISTRATIONS_QUERY_KEY } from './queries/useMyRegistrations'

// ─── typed toast helpers ──────────────────────────────────────────────────────

const T = {
  success: (msg) =>
    toast.success(msg, {
      duration: 5000,
      style: { background: '#052e16', color: '#bbf7d0', border: '1px solid #166534' },
    }),
  outbid: (msg) =>
    toast(msg, {
      icon: '⚠️',
      duration: 6000,
      style: { background: '#1c1400', color: '#fef08a', border: '1px solid #854d0e' },
    }),
  info: (msg) =>
    toast(msg, {
      icon: '🔔',
      duration: 4000,
      style: { background: '#0f172a', color: '#cbd5e1', border: '1px solid #334155' },
    }),
  sold: (msg) =>
    toast(msg, {
      icon: '🔨',
      duration: 6000,
      style: { background: '#111', color: '#d1d5db', border: '1px solid #374151' },
    }),
  error: (msg) =>
    toast.error(msg, {
      duration: 6000,
      style: { background: '#450a0a', color: '#fecaca', border: '1px solid #7f1d1d' },
    }),
}

function fmt(n) {
  return '£' + Number(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 0 })
}

// ─── hook ─────────────────────────────────────────────────────────────────────

export default function useRealtimeNotifications({
  user,
  auction,
  initialRegStatus = null,
  onRegistrationUpdate,
  onAuctionEnded,
}) {
  const queryClient     = useQueryClient()
  const { addNotification } = useNotifications() || {}
  const auctionRef      = useRef(auction)
  const userRef         = useRef(user)

  useEffect(() => { auctionRef.current = auction }, [auction])
  useEffect(() => { userRef.current    = user    }, [user])

  // Helper: invalidate all auction-related queries
  const invalidateAuction = useCallback(() => {
    const slug = auctionRef.current?.slug
    if (slug) queryClient.invalidateQueries({ queryKey: AUCTION_QUERY_KEY(slug) })
  }, [queryClient])

  // ── Lot channel events (bid.placed, bid.outbid, lot.sold) ─────────────────
  useEffect(() => {
    const lotIds = (auction?.auction_lots ?? []).map((l) => l.id)
    if (!lotIds.length) return

    const echo     = getEcho()
    const channels = lotIds.map((lotId) => {
      const ch = echo.channel(`lots.${lotId}`)

      ch.listen('.bid.placed', ({ bid }) => {
        const isOwn = bid.user_id === userRef.current?.id

        if (isOwn) {
          T.success('You are currently the highest bidder')
          addNotification?.({ type: 'winning', message: `Highest bidder — ${fmt(bid.amount)}` })
        } else {
          T.info(`New bid placed: ${fmt(bid.amount)}`)
          addNotification?.({ type: 'info', message: `New bid: ${fmt(bid.amount)}` })
        }

        queryClient.invalidateQueries({ queryKey: BID_HISTORY_QUERY_KEY(lotId) })
        invalidateAuction()
      })

      ch.listen('.bid.outbid', ({ bid }) => {
        if (bid.user_id === userRef.current?.id) {
          T.outbid('You have been outbid — bid again to stay in the lead')
          addNotification?.({ type: 'outbid', message: 'You have been outbid' })
        }
        queryClient.invalidateQueries({ queryKey: BID_HISTORY_QUERY_KEY(lotId) })
      })

      ch.listen('.lot.sold', ({ lot }) => {
        const msg = `Lot ${lot.lot_number} sold — Final: ${fmt(lot.winning_bid_amount ?? lot.current_bid)}`
        T.sold(msg)
        addNotification?.({ type: 'sold', message: msg })
        queryClient.invalidateQueries({ queryKey: BID_HISTORY_QUERY_KEY(lotId) })
        invalidateAuction()
      })

      return ch
    })

    return () => {
      channels.forEach((ch, i) => {
        ch.stopListening('.bid.placed')
        ch.stopListening('.bid.outbid')
        ch.stopListening('.lot.sold')
      })
    }
  }, [auction?.auction_lots?.length, queryClient, addNotification, invalidateAuction])

  // ── Auction channel: auction.ended ─────────────────────────────────────────
  useEffect(() => {
    const auctionId = auction?.id
    if (!auctionId) return

    const echo = getEcho()
    const ch   = echo.channel(`auctions.${auctionId}`)

    ch.listen('.auction.ended', (data) => {
      const msg = `Auction "${data.auction?.title ?? 'Auction'}" has ended`
      T.sold(msg)
      addNotification?.({ type: 'sold', message: msg })
      invalidateAuction()
      onAuctionEnded?.()
    })

    return () => ch.stopListening('.auction.ended')
  }, [auction?.id, queryClient, addNotification, invalidateAuction, onAuctionEnded])

  // ── Private user channel: registration decisions ──────────────────────────
  const handleApproved = useCallback((data) => {
    if (data.auction_id !== auctionRef.current?.id) return

    const msg = `You are approved to bid on "${data.auction?.title ?? 'this auction'}"!`
    T.success(msg)
    addNotification?.({ type: 'winning', message: msg })

    // Invalidate registration queries so both the banner and catalogue update
    const uid = userRef.current?.id
    if (uid) {
      queryClient.invalidateQueries({ queryKey: AUCTION_REG_QUERY_KEY(data.auction_id, uid) })
      queryClient.invalidateQueries({ queryKey: MY_REGISTRATIONS_QUERY_KEY(uid) })
    }
    onRegistrationUpdate?.('approved')
  }, [queryClient, addNotification, onRegistrationUpdate])

  const handleRejected = useCallback((data) => {
    if (data.auction_id !== auctionRef.current?.id) return

    const msg = `Registration for "${data.auction?.title ?? 'this auction'}" was not approved`
    T.error(msg)
    addNotification?.({ type: 'outbid', message: msg })

    const uid = userRef.current?.id
    if (uid) {
      queryClient.invalidateQueries({ queryKey: AUCTION_REG_QUERY_KEY(data.auction_id, uid) })
      queryClient.invalidateQueries({ queryKey: MY_REGISTRATIONS_QUERY_KEY(uid) })
    }
    onRegistrationUpdate?.('rejected')
  }, [queryClient, addNotification, onRegistrationUpdate])

  useUserChannel(user?.id, {
    onRegistrationApproved: handleApproved,
    onRegistrationRejected: handleRejected,
  })
}
