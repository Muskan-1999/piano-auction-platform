import React from 'react'

export default function BiddingFormLayout({ title, children }) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-md">
      <h3 className="text-2xl font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
