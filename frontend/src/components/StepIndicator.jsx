import React from 'react'

export default function StepIndicator({ steps, activeIndex }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm shadow-sm">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold ${
              index === activeIndex
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-300 bg-white text-slate-500'
            }`}
          >
            {index + 1}
          </div>
          <span className={`font-medium ${index === activeIndex ? 'text-slate-900' : 'text-slate-500'}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  )
}
