import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchLot } from '../services/lotService'

export default function LotDetail() {
  const { slug } = useParams()
  const [lot, setLot] = useState(null)

  useEffect(() => {
    fetchLot(slug).then((res) => setLot(res.data))
  }, [slug])

  if (!lot) return <div>Loading...</div>

  return (
    <div>
      <h1>{lot.data.title}</h1>
      <p>Current bid: {lot.data.current_bid}</p>
    </div>
  )
}
