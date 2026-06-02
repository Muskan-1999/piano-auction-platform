import React, { useState } from 'react'

const FIELD_CLS = 'w-full border border-gray-200 rounded px-3 py-2 text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors'
const LABEL_CLS = 'block text-xs font-medium text-gray-700 mb-1'

export default function BookingForm({ auctionType, selectedDate, selectedSlot, onSubmit, onBack }) {
  const [form, setForm]       = useState({ first_name: '', last_name: '', email: '', phone: '', num_guests: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const set = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const formatted = selectedDate
    ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await onSubmit({
        auction_type:     auctionType,
        appointment_date: selectedDate,
        appointment_time: selectedSlot,
        ...form,
        num_guests: form.num_guests ? parseInt(form.num_guests, 10) : 0,
      })
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={onBack}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors flex-shrink-0"
          aria-label="Back"
        >
          ←
        </button>
        <div>
          <h2 className="text-base font-semibold text-gray-900">Enter Your Details</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatted} at {selectedSlot} — {auctionType?.toUpperCase()} Auction View
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL_CLS}>First Name *</label>
            <input name="first_name" value={form.first_name} onChange={set} required className={FIELD_CLS} />
          </div>
          <div>
            <label className={LABEL_CLS}>Last Name *</label>
            <input name="last_name" value={form.last_name} onChange={set} required className={FIELD_CLS} />
          </div>
        </div>

        <div>
          <label className={LABEL_CLS}>Email *</label>
          <input type="email" name="email" value={form.email} onChange={set} required className={FIELD_CLS} />
        </div>

        <div>
          <label className={LABEL_CLS}>Phone *</label>
          <input type="tel" name="phone" value={form.phone} onChange={set} required className={FIELD_CLS} />
        </div>

        <div>
          <label className={LABEL_CLS}>Number of Guests</label>
          <input
            type="number"
            name="num_guests"
            value={form.num_guests}
            onChange={set}
            min="2"
            max="20"
            placeholder="2"
            className={FIELD_CLS}
          />
        </div>

        <div>
          <label className={LABEL_CLS}>Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={set}
            rows={3}
            placeholder="Any additional information…"
            className={FIELD_CLS + ' resize-none'}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 text-sm font-semibold rounded hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Booking…' : 'Book Appointment'}
        </button>
      </form>
    </div>
  )
}
