import React from 'react'

const CONFIG = {
  live: {
    label: 'LIVE',
    className: 'bg-red-600 text-white',
    dot: 'bg-white animate-ping',
    showDot: true,
  },
  upcoming: {
    label: 'UPCOMING',
    className: 'bg-amber-400 text-slate-950',
    dot: null,
    showDot: false,
  },
  ended: {
    label: 'ENDED',
    className: 'bg-slate-600 text-slate-200',
    dot: null,
    showDot: false,
  },
  sold: {
    label: 'SOLD',
    className: 'bg-slate-700 text-slate-200',
    dot: null,
    showDot: false,
  },
  draft: {
    label: 'DRAFT',
    className: 'bg-slate-800 text-slate-400',
    dot: null,
    showDot: false,
  },
}

export default function AuctionStatusBadge({ status, size = 'md' }) {
  const config = CONFIG[status] || CONFIG.draft
  const sizeClass = size === 'sm'
    ? 'px-2 py-0.5 text-[9px]'
    : 'px-3 py-1 text-[10px]'

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-widest ${sizeClass} ${config.className}`}>
      {config.showDot && (
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`} />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
      )}
      {config.label}
    </span>
  )
}
