/**
 * useAuctionChannel
 *
 * Subscribes to the public `lots.{lotId}` channel.
 * Fires callbacks for:
 *   .bid.placed  — a new bid was placed
 *   .bid.outbid  — a previous winner was outbid
 *   .lot.sold    — admin marked the lot as SOLD
 *
 * The channel is public — no auth required.
 */

import { useEffect, useRef, useState } from 'react'
import { getEcho } from '../lib/echo'

export default function useAuctionChannel(lotId, {
  onBidPlaced,
  onOutbid,
  onLotSold,
} = {}) {
  const [connected, setConnected] = useState(false)

  const onBidPlacedRef = useRef(onBidPlaced)
  const onOutbidRef    = useRef(onOutbid)
  const onLotSoldRef   = useRef(onLotSold)

  useEffect(() => { onBidPlacedRef.current = onBidPlaced }, [onBidPlaced])
  useEffect(() => { onOutbidRef.current    = onOutbid    }, [onOutbid])
  useEffect(() => { onLotSoldRef.current   = onLotSold   }, [onLotSold])

  useEffect(() => {
    if (!lotId) return

    const echo    = getEcho()
    const channel = echo.channel(`lots.${lotId}`)

    channel.subscribed(() => setConnected(true))
    channel.error(()     => setConnected(false))

    channel.listen('.bid.placed', (data) => onBidPlacedRef.current?.(data.bid))
    channel.listen('.bid.outbid', (data) => onOutbidRef.current?.(data.bid))
    channel.listen('.lot.sold',   (data) => onLotSoldRef.current?.(data.lot))

    return () => {
      channel.stopListening('.bid.placed')
      channel.stopListening('.bid.outbid')
      channel.stopListening('.lot.sold')
      echo.leave(`lots.${lotId}`)
      setConnected(false)
    }
  }, [lotId])

  return { connected }
}
