import React, { useState } from 'react'
import { submitDeliveryQuote } from '../../services/deliveryQuoteService'

const STEPS = [
  { id: 1, label: 'Personal details' },
  { id: 2, label: 'Piano details' },
  { id: 3, label: 'Delivery details' },
]

const inputCls =
  'w-full border border-gray-300 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 transition-colors bg-white'

const labelCls = 'block text-xs font-semibold text-gray-700 mb-1'

function Field({ label, required, children }) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                current >= s.id ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {current > s.id ? '✓' : s.id}
            </div>
            <span
              className={`text-[10px] mt-1 whitespace-nowrap hidden sm:block ${
                current >= s.id ? 'text-gray-700' : 'text-gray-400'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-px w-12 sm:w-20 mx-1 ${
                current > s.id ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default function DeliveryQuoteForm({ defaultPianoType = 'Grand Piano', hideTitle = false }) {
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    pianoMake: '', pianoModel: '', pianoType: defaultPianoType, estimatedValue: '',
    address1: '', address2: '', city: '', postcode: '',
    hasStairs: 'no', numStairs: '', deliveryNotes: '',
  })

  const update = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }))
  const setField = (field, val) => setForm((p) => ({ ...p, [field]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitDeliveryQuote(form)
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="py-16 px-6 lg:px-10 bg-gray-50">
        <div className="max-w-xl mx-auto text-center py-8">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="text-green-600">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-xl text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>
            Quote Request Received
          </h3>
          <p className="text-sm text-gray-600">
            Thank you! We will be in touch with your delivery quote shortly.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-xl mx-auto">
        {!hideTitle && (
          <>
            <h2 className="text-2xl text-center text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}>
              Get A Piano Delivery Quote
            </h2>
            <p className="text-sm text-gray-500 text-center mb-10">
              If you are buying a piano, get a quote to have it delivered.
            </p>
          </>
        )}

        <StepIndicator current={step} />

        <div className="border border-gray-200 p-7">
          {/* ── Step 1: Personal Details ── */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2) }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First Name" required>
                  <input required className={inputCls} placeholder="First name" value={form.firstName} onChange={update('firstName')} />
                </Field>
                <Field label="Last Name" required>
                  <input required className={inputCls} placeholder="Last name" value={form.lastName} onChange={update('lastName')} />
                </Field>
              </div>
              <Field label="Email" required>
                <input required type="email" className={inputCls} placeholder="Email address" value={form.email} onChange={update('email')} />
              </Field>
              <Field label="Phone" required>
                <input required type="tel" className={inputCls} placeholder="Phone number" value={form.phone} onChange={update('phone')} />
              </Field>
              <button type="submit" className="w-full bg-gray-900 text-white text-sm py-3 font-medium hover:bg-gray-800 transition-colors mt-2">
                Next
              </button>
            </form>
          )}

          {/* ── Step 2: Piano Details ── */}
          {step === 2 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(3) }} className="space-y-4">
              <Field label="Piano Make">
                <input className={inputCls} placeholder="e.g. Steinway" value={form.pianoMake} onChange={update('pianoMake')} />
              </Field>
              <Field label="Piano Model">
                <input className={inputCls} placeholder="e.g. Model B" value={form.pianoModel} onChange={update('pianoModel')} />
              </Field>
              <Field label="Piano Type">
                <select className={inputCls} value={form.pianoType} onChange={update('pianoType')}>
                  <option value="Grand Piano">Grand Piano</option>
                  <option value="Upright Piano">Upright Piano</option>
                </select>
              </Field>
              <Field label="Estimated Value">
                <input className={inputCls} placeholder="e.g. £5,000" value={form.estimatedValue} onChange={update('estimatedValue')} />
              </Field>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-700 text-sm py-3 hover:bg-gray-50 transition-colors">Back</button>
                <button type="submit" className="flex-1 bg-gray-900 text-white text-sm py-3 font-medium hover:bg-gray-800 transition-colors">Next</button>
              </div>
            </form>
          )}

          {/* ── Step 3: Delivery Details ── */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Address Line 1" required>
                <input required className={inputCls} value={form.address1} onChange={update('address1')} />
              </Field>
              <Field label="Address Line 2">
                <input className={inputCls} value={form.address2} onChange={update('address2')} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" required>
                  <input required className={inputCls} value={form.city} onChange={update('city')} />
                </Field>
                <Field label="Postcode" required>
                  <input required className={inputCls} value={form.postcode} onChange={update('postcode')} />
                </Field>
              </div>

              {/* Stairs toggle */}
              <div>
                <label className={labelCls}>Are there stairs at the delivery address?</label>
                <div className="flex gap-6 mt-1">
                  {[{ val: 'no', label: 'No' }, { val: 'yes', label: 'Yes' }].map(({ val, label }) => (
                    <label key={val} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="radio" name="hasStairs" value={val} checked={form.hasStairs === val} onChange={() => setField('hasStairs', val)} className="accent-gray-900" />
                      {label}
                    </label>
                  ))}
                </div>
              </div>

              {form.hasStairs === 'yes' && (
                <Field label="Number of stairs">
                  <input type="number" min="1" className={inputCls} value={form.numStairs} onChange={update('numStairs')} />
                </Field>
              )}

              <Field label="Additional delivery notes">
                <textarea rows={3} className={`${inputCls} resize-none`} value={form.deliveryNotes} onChange={update('deliveryNotes')} />
              </Field>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 px-3 py-2">
                  {error}
                </p>
              )}

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-700 text-sm py-3 hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gray-900 text-white text-sm py-3 font-medium hover:bg-gray-800 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Submitting…
                    </>
                  ) : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
