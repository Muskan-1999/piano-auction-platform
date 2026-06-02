import React, { useState, useEffect } from 'react'
import api from '../../api/axios'
import BookingDefault from './BookingDefault'
import BookingCalendar from './BookingCalendar'
import BookingTimeSlots from './BookingTimeSlots'
import BookingForm from './BookingForm'
import BookingConfirmation from './BookingConfirmation'

const LOCATION = {
  uk: 'Griffin Transport, 1 Sydney Rd, Watford WD18 7XX',
  eu: 'Schumanweg 1, 2411 NH Bodegraven, Netherlands',
}

const INFO = {
  uk: {
    title:     'UK Auction View',
    dateRange: '19th – 22nd June 2026 – UK | (23rd June) Auction',
    opening:   '09:00 to 17:00',
  },
  eu: {
    title:     'EU Auction View',
    dateRange: 'TBD – EU / TBD Auction',
    opening:   '09:00 to 17:00',
  },
}

function PianoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="8" width="36" height="28" rx="2" fill="#111827" />
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={5 + i * 5} y="8" width="4" height="20" rx="1" fill="white" />
      ))}
      {[0,1,3,4,5].map(i => (
        <rect key={i} x={8 + i * 5} y="8" width="3" height="13" rx="1" fill="#111827" />
      ))}
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function BookingWidget() {
  // step: 'default' | 'booking' | 'form' | 'confirmation'
  const [step,           setStep]           = useState('default')
  const [auctionType,    setAuctionType]    = useState(null)
  const [selectedDate,   setSelectedDate]   = useState(null)
  const [selectedSlot,   setSelectedSlot]   = useState(null)
  const [availableDates, setAvailableDates] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingDates,   setLoadingDates]   = useState(false)
  const [loadingSlots,   setLoadingSlots]   = useState(false)

  // Fetch available dates whenever auction type changes
  useEffect(() => {
    if (!auctionType) return
    setLoadingDates(true)
    setAvailableDates([])
    api.get(`viewing-appointments/available-dates?type=${auctionType}`)
      .then(res => setAvailableDates(res.data?.dates ?? []))
      .catch(() => setAvailableDates([]))
      .finally(() => setLoadingDates(false))
  }, [auctionType])

  // Fetch available slots whenever date changes
  useEffect(() => {
    if (!selectedDate || !auctionType) return
    setLoadingSlots(true)
    setSelectedSlot(null)
    setAvailableSlots([])
    api.get(`viewing-appointments/available-slots?type=${auctionType}&date=${selectedDate}`)
      .then(res => setAvailableSlots(res.data?.slots ?? []))
      .catch(() => setAvailableSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [selectedDate, auctionType])

  const handleTypeSelect = (type) => {
    setAuctionType(type)
    setSelectedDate(null)
    setSelectedSlot(null)
    setStep('booking')
  }

  const handleBack = () => {
    if (step === 'form') {
      setStep('booking')
    } else {
      setStep('default')
      setAuctionType(null)
      setSelectedDate(null)
      setSelectedSlot(null)
    }
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  const handleSubmit = async (data) => {
    const res = await api.post('viewing-appointments', data)
    if (res.data?.status === 'success') {
      setStep('confirmation')
    }
  }

  const handleReset = () => {
    setStep('default')
    setAuctionType(null)
    setSelectedDate(null)
    setSelectedSlot(null)
    setAvailableDates([])
    setAvailableSlots([])
  }

  const info = auctionType ? INFO[auctionType] : null

  return (
    <section className="py-16 px-4 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">

          {/* ── Default: type selection ── */}
          {step === 'default' && (
            <BookingDefault onSelect={handleTypeSelect} />
          )}

          {/* ── Booking: calendar + time slots ── */}
          {step === 'booking' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
              {/* Left panel — info */}
              <div className="border-b lg:border-b-0 lg:border-r border-gray-200 p-6 flex flex-col">
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-4 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors self-start"
                  aria-label="Back"
                >
                  ←
                </button>

                {/* Logo */}
                <div className="flex items-center gap-2.5 mb-4">
                  <PianoIcon />
                  <span className="font-bold text-gray-900 text-sm">Piano Auctions Ltd</span>
                </div>

                <h2
                  className="text-lg text-gray-900 mb-4"
                  style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
                >
                  {info?.title}
                </h2>

                {/* Meta */}
                <div className="space-y-2.5 text-xs text-gray-600 mb-5">
                  <div className="flex items-center gap-2">
                    <ClockIcon />
                    <span>1 hr</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <PinIcon />
                    <span>{LOCATION[auctionType]}</span>
                  </div>
                </div>

                {/* Viewing info */}
                <div className="text-xs text-gray-600 space-y-3 border-t border-gray-100 pt-4 flex-1">
                  <div>
                    <p className="font-semibold text-gray-700 mb-0.5">Our Auction Views</p>
                    <p>{info?.dateRange}</p>
                  </div>
                  <p className="font-bold text-gray-800 uppercase text-[10px] tracking-wide leading-snug">
                    Please make sure you have read the information regarding viewing days above.
                  </p>
                  <div>
                    <p className="font-semibold text-gray-700 mb-0.5">Booking</p>
                    <p className="leading-relaxed">
                      Please choose the nearest hour for your appointment. In the next step,
                      you'll be asked for your approximate arrival time.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-0.5">Appointment Length</p>
                    <p>We recommend 1 hour, but you can stay as long as you like.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700 mb-0.5">Opening Times</p>
                    <p>We are open from {info?.opening}</p>
                  </div>
                </div>
              </div>

              {/* Right panel — calendar + slots */}
              <div className="p-6 overflow-y-auto">
                {loadingDates ? (
                  <div className="flex items-center justify-center h-48">
                    <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    <BookingCalendar
                      availableDates={availableDates}
                      selectedDate={selectedDate}
                      onDateSelect={handleDateSelect}
                    />

                    {selectedDate && (
                      loadingSlots ? (
                        <div className="mt-5 flex justify-center">
                          <div className="w-5 h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                        </div>
                      ) : (
                        <BookingTimeSlots
                          slots={availableSlots}
                          selectedSlot={selectedSlot}
                          onSlotSelect={setSelectedSlot}
                          onConfirm={() => setStep('form')}
                        />
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── Form ── */}
          {step === 'form' && (
            <BookingForm
              auctionType={auctionType}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onSubmit={handleSubmit}
              onBack={() => setStep('booking')}
            />
          )}

          {/* ── Confirmation ── */}
          {step === 'confirmation' && (
            <BookingConfirmation
              auctionType={auctionType}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onReset={handleReset}
            />
          )}
        </div>
      </div>
    </section>
  )
}
