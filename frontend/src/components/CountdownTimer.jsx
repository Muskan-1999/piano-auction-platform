import React, { useEffect, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function CountdownTimer({ endDate }) {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: false })

  useEffect(() => {
    const update = () => {
      const distance = new Date(endDate).getTime() - Date.now()
      if (distance < 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true }); return }
      setTimeLeft({
        days:    Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isEnded: false,
      })
    }
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [endDate])

  if (timeLeft.isEnded) return <div className="text-sm font-medium text-red-600">{t('countdown.ended')}</div>

  return (
    <div className="flex gap-2 text-center">
      {[
        [timeLeft.days,    t('countdown.days')],
        [String(timeLeft.hours).padStart(2,'0'),   t('countdown.hours')],
        [String(timeLeft.minutes).padStart(2,'0'), t('countdown.minutes')],
        [String(timeLeft.seconds).padStart(2,'0'), t('countdown.seconds')],
      ].map(([val, label]) => (
        <div key={label} className="bg-luxury-50 px-2 py-1 rounded">
          <div className="text-lg font-bold text-luxury-600">{val}</div>
          <div className="text-xs text-gray-600">{label}</div>
        </div>
      ))}
    </div>
  )
}
