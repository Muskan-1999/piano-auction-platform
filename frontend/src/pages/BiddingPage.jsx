import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiPhone, FiMail, FiBookOpen, FiCalendar, FiChevronRight, FiFileText, FiAlertCircle } from 'react-icons/fi'
import InputField from '../components/bidding/InputField'
import TextAreaField from '../components/bidding/TextAreaField'
import pianoImage from '../assets/hero.png'
import biddingApi from '../api/bidding'

export default function BiddingPage() {
  const navigate = useNavigate()
  const telSuccessRef = useRef(null)
  const absSuccessRef = useRef(null)

  // Telephone (step 1 = personal, step 2 = bid details)
  const [tel, setTel] = useState({ first_name: '', last_name: '', email: '', phone: '', address: '', postcode: '', country: '', lot_number: '', description: '', preferred_call_time: '', one_piano_only: 'yes', additional_notes: '' })
  const [telStep, setTelStep] = useState(1)
  const [telErrors, setTelErrors] = useState({})
  const [telSuccess, setTelSuccess] = useState('')

  // Absentee (step 1 = personal, step 2 = bid details) — NO step 3
  const [abs, setAbs] = useState({ first_name: '', last_name: '', email: '', phone: '', address: '', postcode: '', country: '', lot_number: '', description: '', max_bid_per_lot: '', currency: 'GBP', one_piano_only: 'yes', additional_notes: '' })
  const [absStep, setAbsStep] = useState(1)
  const [absErrors, setAbsErrors] = useState({})
  const [absSuccess, setAbsSuccess] = useState('')

  const [selectedFeatured, setSelectedFeatured] = useState('catalogue')

  const validateStep1 = (data) => {
    const errors = {}
    if (!data.first_name?.trim()) errors.first_name = 'First Name is required'
    if (!data.last_name?.trim()) errors.last_name = 'Last Name is required'
    if (!data.email?.trim()) errors.email = 'Email is required'
    if (!data.phone?.trim()) errors.phone = 'Phone is required'
    if (!data.address?.trim()) errors.address = 'Address is required'
    if (!data.postcode?.trim()) errors.postcode = 'Postcode is required'
    if (!data.country?.trim()) errors.country = 'Country is required'
    return errors
  }

  const validateStep2Telephone = (data) => {
    const errors = {}
    if (!data.lot_number?.trim()) errors.lot_number = 'Lot Number is required'
    if (!data.description?.trim()) errors.description = 'Description is required'
    return errors
  }

  const validateStep2Absentee = (data) => {
    const errors = {}
    if (!data.lot_number?.trim()) errors.lot_number = 'Lot Number is required'
    if (!data.description?.trim()) errors.description = 'Description is required'
    if (!data.max_bid_per_lot?.toString().trim()) errors.max_bid_per_lot = 'Maximum bid is required'
    if (data.max_bid_per_lot && Number(data.max_bid_per_lot) <= 0) errors.max_bid_per_lot = 'Maximum bid must be greater than zero'
    return errors
  }

const featuredCards = [
  {
    key: 'catalogue',
    title: 'View Catalogue',
    description: 'Take a look at our latest piano on offer in our auction catalogue.',
    icon: <FiBookOpen className="h-5 w-5" />,
    button: 'View Catalogue',
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&q=80',
    action: () => navigate('/auction-portal/catalogue')
  },
  {
    key: 'appointment',
    title: 'Book Appointment',
    description: 'Book your appointment to come and see our pianos.',
    icon: <FiCalendar className="h-5 w-5" />,
    button: 'Book an Appointment',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80',
    action: () => navigate('/auction-portal')
  },
  {
    key: 'contact',
    title: 'Contact us',
    description: "If you need to speak to us, please don't hesitate to get in touch.",
    icon: <FiMail className="h-5 w-5" />,
    button: 'Contact Us',
    image: 'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=600&q=80',
    action: () => navigate('/contact-us')
  },
]
  const submitTelephone = async (e) => {
    e.preventDefault()
    const errors = validateStep2Telephone(tel)
    if (Object.keys(errors).length > 0) { setTelErrors(errors); return }
    try {
      await biddingApi.postTelephone({
        first_name: tel.first_name, last_name: tel.last_name, email: tel.email,
        phone: tel.phone, address: tel.address, postcode: tel.postcode, country: tel.country,
        lot_number: tel.lot_number, description: tel.description,
        preferred_call_time: tel.preferred_call_time, one_piano_only: tel.one_piano_only,
        additional_notes: tel.additional_notes,
      })
      setTelSuccess('Your Telephone Bid has been submitted successfully.')
      setTelErrors({})
      setTelStep(1)
      setTel({ first_name: '', last_name: '', email: '', phone: '', address: '', postcode: '', country: '', lot_number: '', description: '', preferred_call_time: '', one_piano_only: 'yes', additional_notes: '' })
      setTimeout(() => telSuccessRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    } catch (error) {
      setTelErrors({ submit: error.response?.data?.message || error.message || 'Submission failed' })
    }
  }

  const submitAbsentee = async (e) => {
    e.preventDefault()
    const errors = validateStep2Absentee(abs)
    if (Object.keys(errors).length > 0) { setAbsErrors(errors); return }
    try {
      await biddingApi.postAbsentee({
        first_name: abs.first_name, last_name: abs.last_name, email: abs.email,
        phone: abs.phone, address: abs.address, postcode: abs.postcode, country: abs.country,
        lot_number: abs.lot_number, description: abs.description,
        max_bid_per_lot: abs.max_bid_per_lot, currency: abs.currency,
        one_piano_only: abs.one_piano_only, additional_notes: abs.additional_notes,
      })
      setAbsSuccess('Your Absentee Bid has been submitted successfully.')
      setAbsErrors({})
      setAbsStep(1)
      setAbs({ first_name: '', last_name: '', email: '', phone: '', address: '', postcode: '', country: '', lot_number: '', description: '', max_bid_per_lot: '', currency: 'GBP', one_piano_only: 'yes', additional_notes: '' })
      setTimeout(() => absSuccessRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    } catch (error) {
      setAbsErrors({ submit: error.response?.data?.message || error.message || 'Submission failed' })
    }
  }

  const StepIndicator = ({ currentStep, labels }) => (
    <div className="mb-8 flex items-center justify-center gap-4 flex-wrap">
      {labels.map((label, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
            idx + 1 === currentStep ? 'bg-slate-900 text-white'
            : idx + 1 < currentStep ? 'bg-slate-400 text-white'
            : 'bg-slate-200 text-slate-700'
          }`}>
            {idx + 1}
          </div>
          <span className={`text-sm font-medium hidden sm:inline ${idx + 1 <= currentStep ? 'text-slate-900' : 'text-slate-500'}`}>
            {label}
          </span>
          {idx < labels.length - 1 && <div className="hidden sm:block h-0.5 w-8 bg-slate-300 mx-2"></div>}
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-full bg-white">
      {/* Hero */}
      <header className="relative h-72 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80)' }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative mx-auto flex h-72 max-w-7xl items-center justify-center text-center px-4">
          <div className="text-white">
            <p className="text-sm uppercase tracking-widest">BIDDING</p>
            <h1 className="mt-4 text-4xl font-semibold text-white">Ways To Bid At Our Auctions</h1>
            <p className="mt-2 text-sm">Choose your preferred bidding method</p>
          </div>
        </div>
      </header>

      <main className="w-full bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 space-y-12">

          {/* Intro */}
          <section className="text-center">
            <h1 className="text-3xl font-semibold">Our simple ways to bid on a piano at auction</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">Piano Auctions Ltd is a world leading specialist piano auction and is the home of buying and selling upright and grand pianos at auction.</p>
          </section>

          {/* Online Bidding */}
          <section className="w-full bg-white">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <div className="relative h-96 bg-slate-900">
                <img src={pianoImage} alt="piano auction" className="h-full w-full object-cover opacity-70" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-white">
                    <div className="flex items-center gap-2">
                      <FiPhone className="h-5 w-5" />
                      <p className="text-xs uppercase tracking-[0.3em]">Online Bidding</p>
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold">Online Bidding</h3>
                    <p className="mt-2 max-w-md text-sm text-white/90">Bid for your favourite piano or watch the latest auction live with easyliveauction.com</p>
                    <div className="mt-6 flex flex-col gap-3 max-w-xs">
                      <button type="button" className="rounded border border-white/50 bg-transparent px-6 py-2 text-white text-sm font-semibold hover:bg-white/10">UK - Bid Now</button>
                      <button type="button" className="rounded border border-white/50 bg-transparent px-6 py-2 text-white text-sm font-semibold hover:bg-white/10">EU - Bid Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── TELEPHONE BIDDING ── */}
          <section className="w-full bg-white">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <div className="bg-slate-50 px-8 py-8">
                <div className="mb-8 flex items-center gap-3">
                  <FiPhone className="h-6 w-6 text-slate-900" />
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Telephone Bidding</h2>
                    <p className="mt-1 text-sm text-slate-600">Complete the form below and we'll arrange a telephone bidding agreement with you.</p>
                  </div>
                </div>

                <StepIndicator currentStep={telStep} labels={['Personal Details', 'Bid Details']} />

                {telSuccess && (
                  <div ref={telSuccessRef} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 mb-6 text-sm text-emerald-900">
                    {telSuccess}
                  </div>
                )}

                {/* Tel Step 1 */}
                {telStep === 1 && (
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault()
                    const errors = validateStep1(tel)
                    if (Object.keys(errors).length > 0) { setTelErrors(errors); return }
                    setTelErrors({})
                    setTelStep(2)
                  }}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="First Name" value={tel.first_name} onChange={(e) => setTel({ ...tel, first_name: e.target.value })} required />
                        {telErrors.first_name && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.first_name}</p>}
                      </div>
                      <div>
                        <InputField label="Last Name" value={tel.last_name} onChange={(e) => setTel({ ...tel, last_name: e.target.value })} required />
                        {telErrors.last_name && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.last_name}</p>}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="Email" type="email" value={tel.email} onChange={(e) => setTel({ ...tel, email: e.target.value })} required />
                        {telErrors.email && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.email}</p>}
                      </div>
                      <div>
                        <InputField label="Phone" value={tel.phone} onChange={(e) => setTel({ ...tel, phone: e.target.value })} required />
                        {telErrors.phone && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <InputField label="Address" value={tel.address} onChange={(e) => setTel({ ...tel, address: e.target.value })} required />
                      {telErrors.address && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.address}</p>}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="Postcode" value={tel.postcode} onChange={(e) => setTel({ ...tel, postcode: e.target.value })} required />
                        {telErrors.postcode && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.postcode}</p>}
                      </div>
                      <div>
                        <InputField label="Country" value={tel.country} onChange={(e) => setTel({ ...tel, country: e.target.value })} required />
                        {telErrors.country && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.country}</p>}
                      </div>
                    </div>
                    <div className="flex justify-center pt-4">
                      <button type="submit" className="rounded bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800">Next</button>
                    </div>
                  </form>
                )}

                {/* Tel Step 2 */}
                {telStep === 2 && (
                  <form onSubmit={submitTelephone} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Bid Details</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <InputField label="Lot Number" value={tel.lot_number} onChange={(e) => setTel({ ...tel, lot_number: e.target.value })} required />
                          {telErrors.lot_number && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.lot_number}</p>}
                        </div>
                        <div>
                          <InputField label="Description" value={tel.description} onChange={(e) => setTel({ ...tel, description: e.target.value })} required />
                          {telErrors.description && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{telErrors.description}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="Preferred Call Time" value={tel.preferred_call_time} onChange={(e) => setTel({ ...tel, preferred_call_time: e.target.value })} placeholder="e.g., 9am - 12pm" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-3">One Piano Only *</label>
                        <div className="flex flex-wrap items-center gap-6">
                          <label className="flex items-center gap-2">
                            <input type="radio" name="telOnePiano" value="yes" checked={tel.one_piano_only === 'yes'} onChange={() => setTel({ ...tel, one_piano_only: 'yes' })} className="h-4 w-4 text-slate-900" />
                            <span className="text-sm text-slate-900">Yes</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="telOnePiano" value="no" checked={tel.one_piano_only === 'no'} onChange={() => setTel({ ...tel, one_piano_only: 'no' })} className="h-4 w-4 text-slate-900" />
                            <span className="text-sm text-slate-900">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <TextAreaField label="Additional Notes" value={tel.additional_notes} onChange={(e) => setTel({ ...tel, additional_notes: e.target.value })} rows={4} placeholder="Any additional information for us..." />
                    </div>
                    {telErrors.submit && <p className="text-sm text-red-600 mt-2">{telErrors.submit}</p>}
                    <div className="flex justify-center gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => { setTelStep(1); setTelErrors({}) }}
                        className="rounded border border-slate-900 px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button type="submit" className="rounded bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800">Submit</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* ── ABSENTEE BIDDING — 2 steps only, no Review & Submit ── */}
          <section className="w-full bg-white">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-slate-200 shadow-sm">
              <div className="bg-slate-50 px-8 py-8">
                <div className="mb-8 flex items-center gap-3">
                  <FiFileText className="h-6 w-6 text-slate-900" />
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">Absentee Bidding</h2>
                    <p className="mt-1 text-sm text-slate-600">Complete the form below and we will submit your absentee bid for the next auction.</p>
                  </div>
                </div>

                <StepIndicator currentStep={absStep} labels={['Personal Details', 'Bid Details']} />

                {absSuccess && (
                  <div ref={absSuccessRef} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 mb-6 text-sm text-emerald-900">
                    {absSuccess}
                  </div>
                )}

                {/* Abs Step 1 */}
                {absStep === 1 && (
                  <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault()
                    const errors = validateStep1(abs)
                    if (Object.keys(errors).length > 0) { setAbsErrors(errors); return }
                    setAbsErrors({})
                    setAbsStep(2)
                  }}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="First Name" value={abs.first_name} onChange={(e) => setAbs({ ...abs, first_name: e.target.value })} required />
                        {absErrors.first_name && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.first_name}</p>}
                      </div>
                      <div>
                        <InputField label="Last Name" value={abs.last_name} onChange={(e) => setAbs({ ...abs, last_name: e.target.value })} required />
                        {absErrors.last_name && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.last_name}</p>}
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="Email" type="email" value={abs.email} onChange={(e) => setAbs({ ...abs, email: e.target.value })} required />
                        {absErrors.email && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.email}</p>}
                      </div>
                      <div>
                        <InputField label="Phone" value={abs.phone} onChange={(e) => setAbs({ ...abs, phone: e.target.value })} required />
                        {absErrors.phone && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <InputField label="Address" value={abs.address} onChange={(e) => setAbs({ ...abs, address: e.target.value })} required />
                      {absErrors.address && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.address}</p>}
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="Postcode" value={abs.postcode} onChange={(e) => setAbs({ ...abs, postcode: e.target.value })} required />
                        {absErrors.postcode && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.postcode}</p>}
                      </div>
                      <div>
                        <InputField label="Country" value={abs.country} onChange={(e) => setAbs({ ...abs, country: e.target.value })} required />
                        {absErrors.country && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.country}</p>}
                      </div>
                    </div>
                    <div className="flex justify-center pt-4">
                      <button type="submit" className="rounded bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800">Next</button>
                    </div>
                  </form>
                )}

                {/* Abs Step 2 — Bid Details + direct Submit */}
                {absStep === 2 && (
                  <form onSubmit={submitAbsentee} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Bid Details</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <InputField label="Lot Number" value={abs.lot_number} onChange={(e) => setAbs({ ...abs, lot_number: e.target.value })} required />
                          {absErrors.lot_number && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.lot_number}</p>}
                        </div>
                        <div>
                          <InputField label="Description" value={abs.description} onChange={(e) => setAbs({ ...abs, description: e.target.value })} required />
                          {absErrors.description && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.description}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <InputField label="Max Bid" type="number" value={abs.max_bid_per_lot} onChange={(e) => setAbs({ ...abs, max_bid_per_lot: e.target.value })} required />
                        {absErrors.max_bid_per_lot && <p className="text-xs text-red-600 mt-1 flex items-center gap-1"><FiAlertCircle className="h-3 w-3" />{absErrors.max_bid_per_lot}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-900 mb-2">Currency</label>
                        <select
                          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                          value={abs.currency}
                          onChange={(e) => setAbs({ ...abs, currency: e.target.value })}
                        >
                          <option value="GBP">GBP (£)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-3">One Piano Only *</label>
                      <div className="flex flex-wrap items-center gap-6">
                        <label className="flex items-center gap-2">
                          <input type="radio" name="absOnePiano" value="yes" checked={abs.one_piano_only === 'yes'} onChange={() => setAbs({ ...abs, one_piano_only: 'yes' })} className="h-4 w-4 text-slate-900" />
                          <span className="text-sm text-slate-900">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input type="radio" name="absOnePiano" value="no" checked={abs.one_piano_only === 'no'} onChange={() => setAbs({ ...abs, one_piano_only: 'no' })} className="h-4 w-4 text-slate-900" />
                          <span className="text-sm text-slate-900">No</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <TextAreaField label="Additional Notes" value={abs.additional_notes} onChange={(e) => setAbs({ ...abs, additional_notes: e.target.value })} rows={4} placeholder="Any additional information for us..." />
                    </div>
                    {absErrors.submit && <p className="text-sm text-red-600 mt-2">{absErrors.submit}</p>}
                    <div className="flex justify-center gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => { setAbsStep(1); setAbsErrors({}) }}
                        className="rounded border border-slate-900 px-8 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Back
                      </button>
                      <button type="submit" className="rounded bg-slate-900 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800">Submit</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>

          {/* Further Information Section */}
          <section className="w-full bg-slate-950 py-16 -mx-4 px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">USE OUR SERVICES TODAY</p>
                <h2 className="mt-4 text-4xl font-semibold text-white">Further Information</h2>
              </div>
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr]">
                {featuredCards.map((card) => (
                  <button
                    key={card.key}
                    type="button"
                    onClick={() => { setSelectedFeatured(card.key); card.action() }}
                    className={`group flex flex-col items-start gap-4 rounded-lg border px-6 py-6 text-left transition ${
                      selectedFeatured === card.key
                        ? 'border-white bg-white/10'
                        : 'border-white/10 bg-transparent hover:border-white/40'
                    }`}
                  >
                    <div className="h-48 w-full overflow-hidden rounded-lg">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
                      {card.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                    <p className="text-sm leading-6 text-slate-300">{card.description}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-auto">
                      {card.button}
                      <FiChevronRight className="h-4 w-4" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
