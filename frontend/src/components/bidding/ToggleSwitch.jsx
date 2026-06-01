import React from 'react'

export default function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3">
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
        <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-slate-900' : 'bg-slate-300'}`}></div>
        <div className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </div>
      {label && <span className="text-sm text-slate-700">{label}</span>}
    </label>
  )
}
