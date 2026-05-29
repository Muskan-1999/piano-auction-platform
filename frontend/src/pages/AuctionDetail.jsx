import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAuction } from '../services/auctionService'

export default function AuctionDetail() {
  const { slug } = useParams()
  const [auction, setAuction] = useState(null)

  useEffect(() => {
    fetchAuction(slug).then((res) => setAuction(res.data))
  }, [slug])

  if (!auction) return <div>Loading...</div>

  return (
    <div>
      <h1>{auction.data.title}</h1>
      <p>{auction.data.description}</p>
    </div>
  )
}
