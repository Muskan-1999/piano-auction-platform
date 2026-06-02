import React from 'react'

export default function BookingTimeSlots({ slots, selectedSlot, onSlotSelect, onConfirm }) {
  if (slots.length === 0) {
    return (
      <div className="mt-5 text-xs text-gray-500 text-center py-4 border-t border-gray-100">
        No available slots for this date.
      </div>
    )
  }

  return (
    <div className="mt-5 border-t border-gray-100 pt-5">
      <p className="text-xs font-semibold text-gray-600 mb-3 uppercase tracking-wide">
        Available Times
      </p>
      <div className="grid grid-cols-3 gap-2">
        {slots.map(slot => (
          <button
            key={slot}
            onClick={() => onSlotSelect(slot)}
            className={[
              'py-2 text-sm rounded border transition-all',
              selectedSlot === slot
                ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50',
            ].join(' ')}
          >
            {slot}
          </button>
        ))}
      </div>

      {selectedSlot && (
        <button
          onClick={onConfirm}
          className="mt-4 w-full bg-blue-600 text-white py-3 text-sm font-semibold hover:bg-blue-700 transition-colors rounded"
        >
          Confirm {selectedSlot}
        </button>
      )}
    </div>
  )
}
