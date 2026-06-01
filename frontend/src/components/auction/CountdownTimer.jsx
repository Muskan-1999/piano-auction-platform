import React, { useCallback, useEffect, useRef, useState } from 'react'

function pad(n) {
  return String(n).padStart(2, '0')
}

function computeTimeLeft(targetDate) {
  const diff = new Date(targetDate) - Date.now()
  if (diff <= 0) return null
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export default function CountdownTimer({ targetDate, onExpire, label, compact = false }) {
  const [timeLeft, setTimeLeft] = useState(() => computeTimeLeft(targetDate))
  const expiredRef = useRef(false)

  const tick = useCallback(() => {
    const next = computeTimeLeft(targetDate)
    setTimeLeft(next)
    if (!next && !expiredRef.current) {
      expiredRef.current = true
      onExpire?.()
    }
  }, [targetDate, onExpire])

  useEffect(() => {
    expiredRef.current = false
    setTimeLeft(computeTimeLeft(targetDate))
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate, tick])

  if (!timeLeft) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        LIVE
      </span>
    )
  }

  if (compact) {
    return (
      <span className="font-mono text-sm text-amber-300">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
      </span>
    )
  }

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ]

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
      )}
      <div className="flex items-end gap-2">
        {units.map((u, i) => (
          <React.Fragment key={u.label}>
            <div className="flex flex-col items-center">
              <span className="min-w-[3ch] rounded-lg bg-slate-800 px-3 py-2 text-center font-mono text-2xl font-bold tabular-nums text-white">
                {pad(u.value)}
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">
                {u.label}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className="mb-4 text-xl font-bold text-slate-600">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
