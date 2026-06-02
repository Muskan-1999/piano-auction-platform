import React, { useState, useEffect } from 'react'

const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getFirstDayOffset(year, month) {
  // Returns 0=Mon … 6=Sun for the first day of the month
  return (new Date(year, month, 1).getDay() + 6) % 7
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

export default function BookingCalendar({ availableDates, selectedDate, onDateSelect }) {
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  // Initialise view to the month of the first available date (or today)
  const initYear  = availableDates.length ? parseInt(availableDates[0].split('-')[0]) : today.getFullYear()
  const initMonth = availableDates.length ? parseInt(availableDates[0].split('-')[1]) - 1 : today.getMonth()

  const [viewYear,  setViewYear]  = useState(initYear)
  const [viewMonth, setViewMonth] = useState(initMonth)

  useEffect(() => {
    if (availableDates.length) {
      setViewYear(parseInt(availableDates[0].split('-')[0]))
      setViewMonth(parseInt(availableDates[0].split('-')[1]) - 1)
    }
  }, [availableDates])

  const offset    = getFirstDayOffset(viewYear, viewMonth)
  const daysCount = getDaysInMonth(viewYear, viewMonth)
  const cells     = [...Array(offset).fill(null), ...Array.from({ length: daysCount }, (_, i) => i + 1)]

  const padded = (d) => `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

  const isAvailable = (d) => d && availableDates.includes(padded(d))
  const isSelected  = (d) => d && selectedDate === padded(d)
  const isToday     = (d) => d && padded(d) === todayStr

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  // Timezone display
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  const tzTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: tz,
  }).format(new Date())

  const tzLong = new Intl.DateTimeFormat('en-US', {
    timeZoneName: 'long', timeZone: tz,
  }).formatToParts(new Date()).find(p => p.type === 'timeZoneName')?.value || tz

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900 mb-5">Select a Date &amp; Time</h2>

      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 text-lg leading-none"
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-800">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors text-gray-500 text-lg leading-none"
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_HEADERS.map(d => (
          <div key={d} className="text-center text-[11px] font-semibold text-gray-400 py-1 uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) => {
          const available = isAvailable(day)
          const selected  = isSelected(day)
          const todayDay  = isToday(day)

          return (
            <div key={idx} className="flex items-center justify-center">
              {day ? (
                <button
                  onClick={() => available && onDateSelect(padded(day))}
                  disabled={!available}
                  className={[
                    'relative w-8 h-8 rounded-full text-sm transition-all',
                    selected
                      ? 'bg-blue-600 text-white font-semibold'
                      : available
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 font-medium cursor-pointer'
                        : 'text-gray-400 cursor-default',
                  ].join(' ')}
                >
                  {day}
                  {todayDay && !selected && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                  )}
                </button>
              ) : (
                <span className="w-8 h-8" />
              )}
            </div>
          )
        })}
      </div>

      {/* Timezone row */}
      <div className="mt-5 flex items-center gap-1.5 text-xs text-gray-500">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" />
          <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Time zone</span>
        <span className="text-gray-700 font-medium ml-1">{tzLong} ({tzTime})</span>
        <button className="text-gray-400 hover:text-gray-600 ml-0.5">▾</button>
      </div>
    </div>
  )
}
