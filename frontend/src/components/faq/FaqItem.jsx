import React from 'react'

export default function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-4 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span
          className="text-sm text-gray-800 group-hover:text-gray-600 transition-colors leading-snug"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {question}
        </span>
        <span className="flex-shrink-0 text-gray-500 text-lg leading-none select-none">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '600px' : '0' }}
      >
        <p className="text-sm text-gray-600 leading-relaxed pb-4 pr-8">
          {answer}
        </p>
      </div>
    </div>
  )
}
