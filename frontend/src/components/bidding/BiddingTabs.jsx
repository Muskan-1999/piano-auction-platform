import React, { useState } from 'react'

export default function BiddingTabs({ tabs }) {
  const [active, setActive] = useState(0)
  return (
    <div>
      <div className="flex gap-4 mb-6">
        {tabs.map((t, i) => (
          <button key={t.label} onClick={() => setActive(i)} className={`px-4 py-2 text-sm font-medium ${i === active ? 'border-b-2 border-slate-900' : 'text-slate-600'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs[active].content}</div>
    </div>
  )
}
