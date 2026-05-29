import React, { useEffect, useState } from 'react'
import { fetchAuctions } from '../services/auctionService'

export default function Auctions() {
  const [auctions, setAuctions] = useState(null)

  useEffect(() => {
    fetchAuctions().then((res) => setAuctions(res.data))
  }, [])

  return (
    <div>
      <h1>Auctions</h1>
      <ul>
        {auctions?.data?.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  )
}
