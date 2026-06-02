import React from 'react'

export default function BookingConfirmation({ auctionType, selectedDate, selectedSlot, onReset }) {
  const formatted = selectedDate
    ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  return (
    <div className="flex flex-col items-center text-center py-14 px-8">
      {/* Check circle */}
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2
        className="text-2xl text-gray-900 mb-4"
        style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
      >
        Appointment Confirmed!
      </h2>

      <div className="text-sm text-gray-600 space-y-1.5 mb-5">
        <p className="font-semibold text-gray-800">
          {auctionType?.toUpperCase()} Auction View
        </p>
        <p>{formatted}</p>
        <p className="text-blue-600 font-medium">at {selectedSlot}</p>
      </div>

      <p className="text-xs text-gray-500 max-w-xs leading-relaxed mb-8">
        A confirmation has been noted. Please arrive at the viewing location at your chosen time.
        We look forward to welcoming you!
      </p>

      <button
        onClick={onReset}
        className="border border-gray-300 text-gray-700 px-8 py-2.5 text-sm hover:bg-gray-50 transition-colors rounded"
      >
        Book Another Appointment
      </button>
    </div>
  )
}
