import React from 'react'
import { useParams } from 'react-router-dom'

export default function LiveAuction() {
  const { id } = useParams()

  return (
    <div>
      <h1>Live Auction {id}</h1>
      <p>Live bidding UI will connect via WebSocket (Reverb).</p>
    </div>
  )
}
