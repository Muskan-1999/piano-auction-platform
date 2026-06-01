import React, { useEffect, useState } from 'react'
import PersonalDetailsStep from './PersonalDetailsStep'
import PianoDetailsStep from './PianoDetailsStep'
import AddressDetailsStep from './AddressDetailsStep'
import SuccessStep from './SuccessStep'
import { submitValuation } from '../../services/sellMyPianoService'

const STEPS = ['Personal details', 'Piano details', 'Piano address']

const EMPTY = {
  // Step 1
  first_name: '', last_name: '', email: '', phone: '',
  // Step 2
  valuation_type: '', piano_type: '', piano_make: '', piano_model: '',
  piano_colour: '', serial_number: '', dimensions: '', age_of_piano: '',
  ivory_keys: '', tuned_recently: '', reconditioned: '',
  ownership_history: '', condition_description: '', additional_notes: '',
  images: [],
  // Step 3
  address_line_1: '', address_line_2: '', city: '', state: '',
  postcode: '', country: 'United Kingdom',
  collection_address_different: false,
  preferred_contact_method: '', preferred_contact_time: '',
}

function validateStep(step, data) {
  const errs = {}

  if (step === 0) {
    if (!data.first_name.trim())                       errs.first_name = 'First name is required.'
    if (!data.last_name.trim())                        errs.last_name  = 'Last name is required.'
    if (!data.email.trim())                            errs.email      = 'Email address is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Enter a valid email address.'
    if (!data.phone.trim())                            errs.phone      = 'Phone number is required.'
  }

  if (step === 1) {
    if (!data.valuation_type)        errs.valuation_type        = 'Please select a valuation type.'
    if (!data.piano_type)            errs.piano_type            = 'Please select a piano type.'
    if (!data.piano_make.trim())     errs.piano_make            = 'Piano make is required.'
    if (!data.piano_colour.trim())   errs.piano_colour          = 'Piano colour is required.'
    if (!data.ivory_keys)            errs.ivory_keys            = 'Please select an ivory keys option.'
    if (!data.tuned_recently)        errs.tuned_recently        = 'Please select yes or no.'
    if (!data.reconditioned)         errs.reconditioned         = 'Please select yes or no.'
    if (!data.ownership_history.trim())     errs.ownership_history     = 'Ownership history is required.'
    if (!data.condition_description.trim()) errs.condition_description = 'Condition description is required.'
    if ((data.images || []).length > 5)     errs.images                = 'Maximum 5 images allowed.'
  }

  if (step === 2) {
    if (!data.address_line_1.trim())          errs.address_line_1           = 'Address line 1 is required.'
    if (!data.city.trim())                    errs.city                     = 'Town / city is required.'
    if (!data.postcode.trim())                errs.postcode                 = 'Postcode is required.'
    if (!data.country.trim())                 errs.country                  = 'Country is required.'
    if (!data.preferred_contact_method)       errs.preferred_contact_method = 'Please select a contact method.'
  }

  return errs
}

export default function ValuationModal({ open, initialData = {}, onClose, onSuccessClose }) {
  const [step, setStep]       = useState(0)
  const [data, setData]       = useState({ ...EMPTY, ...initialData })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiError, setApiError] = useState('')

  // Sync personal details pre-filled from the hero card
  useEffect(() => {
    if (open) {
      setData((prev) => ({ ...prev, ...initialData }))
      setStep(0)
      setErrors({})
      setSuccess(false)
      setApiError('')
    }
  }, [open])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const goNext = () => {
    const errs = validateStep(step, data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStep((s) => s + 1)
  }

  const goPrev = () => {
    setErrors({})
    setStep((s) => s - 1)
  }

  const handleSubmit = async () => {
    const errs = validateStep(2, data)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    setApiError('')
    try {
      await submitValuation(data)
      setSuccess(true)
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        'Something went wrong. Please try again.'
      setApiError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (fromSuccess = false) => {
    setData({ ...EMPTY })
    setStep(0)
    setErrors({})
    setSuccess(false)
    setApiError('')
    if (fromSuccess && onSuccessClose) onSuccessClose()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="relative w-full max-w-2xl bg-white shadow-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-4 border-b border-gray-100 flex-shrink-0">
          <h2
            className="text-xl text-gray-900"
            style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
          >
            Use Our Piano Valuation Form
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-700 transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Step indicator (hidden on success) */}
        {!success && (
          <div className="px-8 pt-5 pb-3 flex-shrink-0">
            <div className="flex items-start gap-0">
              {STEPS.map((label, i) => {
                const active    = i === step
                const completed = i < step
                return (
                  <div key={label} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full h-0.5 mb-2"
                      style={{ backgroundColor: completed || active ? '#111' : '#e5e7eb' }}
                    />
                    <span
                      className="text-[10px] uppercase tracking-widest text-center leading-tight"
                      style={{ color: active ? '#111' : completed ? '#555' : '#9ca3af' }}
                    >
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-5">
          {success ? (
            <SuccessStep onClose={() => handleClose(true)} />
          ) : (
            <>
              {step === 0 && (
                <PersonalDetailsStep data={data} onChange={setData} errors={errors} />
              )}
              {step === 1 && (
                <PianoDetailsStep data={data} onChange={setData} errors={errors} />
              )}
              {step === 2 && (
                <AddressDetailsStep data={data} onChange={setData} errors={errors} />
              )}

              {apiError && (
                <p className="mt-4 text-sm text-red-500 text-center">{apiError}</p>
              )}
            </>
          )}
        </div>

        {/* Footer buttons */}
        {!success && (
          <div className="px-8 py-5 border-t border-gray-100 flex items-center justify-between gap-4 flex-shrink-0">
            {step > 0 ? (
              <button
                type="button"
                onClick={goPrev}
                className="border border-gray-900 text-gray-900 text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < 2 ? (
              <button
                type="button"
                onClick={goNext}
                className="bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 px-10 hover:bg-gray-800 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 px-10 hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting…' : 'Submit Valuation'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
