import React, { useEffect, useState } from 'react'

export default function CountdownTimer({ endDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isEnded: false,
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const end = new Date(endDate).getTime()
      const distance = end - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true })
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isEnded: false,
      })
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [endDate])

  if (timeLeft.isEnded) {
    return <div className="text-sm font-medium text-red-600">Auction Ended</div>
  }

  return (
    <div className="flex gap-2 text-center">
      <div className="bg-luxury-50 px-2 py-1 rounded">
        <div className="text-lg font-bold text-luxury-600">{timeLeft.days}</div>
        <div className="text-xs text-gray-600">Days</div>
      </div>
      <div className="bg-luxury-50 px-2 py-1 rounded">
        <div className="text-lg font-bold text-luxury-600">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs text-gray-600">Hrs</div>
      </div>
      <div className="bg-luxury-50 px-2 py-1 rounded">
        <div className="text-lg font-bold text-luxury-600">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs text-gray-600">Min</div>
      </div>
      <div className="bg-luxury-50 px-2 py-1 rounded">
        <div className="text-lg font-bold text-luxury-600">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs text-gray-600">Sec</div>
      </div>
    </div>
  )
}
