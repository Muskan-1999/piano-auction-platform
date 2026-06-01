import React from 'react'

export default function SuccessStep({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-900 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h3
        className="text-xl font-semibold text-gray-900 mb-3"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        Form Submitted Successfully
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed max-w-sm mb-2">
        Thank you for submitting your piano valuation request.
      </p>
      <p className="text-sm text-gray-600 leading-relaxed max-w-sm mb-8">
        Our specialists will review your piano details and contact you shortly.
      </p>

      <button
        type="button"
        onClick={onClose}
        className="bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 px-10 hover:bg-gray-800 transition-colors"
      >
        Close
      </button>
    </div>
  )
}
