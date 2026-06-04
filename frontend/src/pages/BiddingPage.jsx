import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiAlertCircle, FiBookOpen, FiCalendar, FiMail } from 'react-icons/fi'
import biddingApi from '../api/bidding'
import { useLanguage } from '../contexts/LanguageContext'

// ── helpers ────────────────────────────────────────────────────────────────

const initPersonal = () => ({
  first_name: '', last_name: '', email: '', phone: '', address: '', postcode: '',
})

const initLots = () =>
  Array(5).fill(null).map(() => ({ lot_number: '', description: '' }))

const FURTHER_CARD_IMGS = [
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=700&q=80',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=700&q=80',
  'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=700&q=80',
]
const FURTHER_CARD_HREFS = ['/auction-portal/catalogue', '/contact', '/contact']
const FURTHER_CARD_KEYS  = ['catalogue', 'appointment', 'contact']

const STRIP_IMAGES = [
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=70',
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=70',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=70',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70',
  'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=70',
  'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=400&q=70',
]

// ── Module-level validation & sub-components ────────────────────────────────

const validatePersonal = (data) => {
  const errs = {}
  if (!data.first_name.trim()) errs.first_name = 'Required'
  if (!data.last_name.trim())  errs.last_name  = 'Required'
  if (!data.email.trim())      errs.email      = 'Required'
  else if (!/\S+@\S+\.\S+/.test(data.email)) errs.email = 'Enter a valid email'
  if (!data.phone.trim())      errs.phone      = 'Required'
  else if (!/^\+?[\d\s\-().]{6,}$/.test(data.phone)) errs.phone = 'Enter a valid phone number'
  if (!data.address.trim())    errs.address    = 'Required'
  if (!data.postcode.trim())   errs.postcode   = 'Required'
  return errs
}

function StepProgress({ step, step1Label, step2Label }) {
  return (
    <div className="mb-8">
      <div className="relative h-px bg-gray-200">
        <div className="absolute left-0 top-0 h-full bg-green-600 transition-all duration-300"
          style={{ width: step === 1 ? '50%' : '100%' }} />
      </div>
      <div className="flex items-start justify-between mt-1">
        <span className={`text-xs font-medium ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
          {step1Label}
        </span>
        <span className={`text-xs font-medium text-right ${step === 2 ? 'text-green-600' : 'text-gray-400'}`}>
          {step2Label}
        </span>
      </div>
    </div>
  )
}

function FormInput({ label, type = 'text', value, onChange, error, placeholder, required }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={`w-full border px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors ${
          error ? 'border-red-400' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <FiAlertCircle className="h-3 w-3 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function PersonalForm({ data, setData, errors, onNext }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const errs = validatePersonal(data)
        if (Object.keys(errs).length) { onNext(errs); return }
        onNext({})
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="First Name" value={data.first_name} onChange={(e) => setData({ ...data, first_name: e.target.value })} error={errors.first_name} required />
        <FormInput label="Last Name"  value={data.last_name}  onChange={(e) => setData({ ...data, last_name:  e.target.value })} error={errors.last_name}  required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} error={errors.email} required />
        <FormInput label="Phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} error={errors.phone} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormInput label="Address"   value={data.address}  onChange={(e) => setData({ ...data, address:  e.target.value })} error={errors.address}  required />
        <FormInput label="Post Code" value={data.postcode} onChange={(e) => setData({ ...data, postcode: e.target.value })} error={errors.postcode} required />
      </div>
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="bg-black text-white text-sm font-semibold px-10 py-3 hover:bg-gray-900 transition-colors"
        >
          Next
        </button>
      </div>
    </form>
  )
}

function LotTable({ lots, onChange, errors, showMaxBid, maxBids, onMaxBidChange }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-3 text-xs font-medium text-gray-700 w-1/3">
              Lot Number <span className="text-red-500">*</span>
            </th>
            <th className={`text-left py-2 text-xs font-medium text-gray-700 ${showMaxBid ? 'pr-3' : ''}`}>
              Description <span className="text-red-500">*</span>
            </th>
            {showMaxBid && (
              <th className="text-left py-2 text-xs font-medium text-gray-700 w-1/4">
                Max Bid (£) <span className="text-red-500">*</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {lots.map((lot, i) => {
            const isRequired = i === 0
            return (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2 pr-3">
                  <input
                    type="text"
                    value={lot.lot_number}
                    onChange={(e) => onChange(i, 'lot_number', e.target.value)}
                    placeholder={isRequired ? 'Lot Number' : 'Lot Number (optional)'}
                    className={`w-full border px-2 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors?.[`lot_${i}_number`] ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.[`lot_${i}_number`] && (
                    <p className="mt-0.5 text-[10px] text-red-600">{errors[`lot_${i}_number`]}</p>
                  )}
                </td>
                <td className={`py-2 ${showMaxBid ? 'pr-3' : ''}`}>
                  <input
                    type="text"
                    value={lot.description}
                    onChange={(e) => onChange(i, 'description', e.target.value)}
                    placeholder={isRequired ? 'Description' : 'Description (optional)'}
                    className={`w-full border px-2 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                      errors?.[`lot_${i}_description`] ? 'border-red-400' : 'border-gray-300'
                    }`}
                  />
                  {errors?.[`lot_${i}_description`] && (
                    <p className="mt-0.5 text-[10px] text-red-600">{errors[`lot_${i}_description`]}</p>
                  )}
                </td>
                {showMaxBid && (
                  <td className="py-2">
                    <input
                      type="number"
                      min="0"
                      value={maxBids[i] || ''}
                      onChange={(e) => onMaxBidChange(i, e.target.value)}
                      placeholder={isRequired ? '0.00' : 'Optional'}
                      className={`w-full border px-2 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-gray-900 ${
                        errors?.[`lot_${i}_maxbid`] ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {errors?.[`lot_${i}_maxbid`] && (
                      <p className="mt-0.5 text-[10px] text-red-600">{errors[`lot_${i}_maxbid`]}</p>
                    )}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// ── Main page ────────────────────────────────────────────────────────────────

export default function BiddingPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const telSuccessRef = useRef(null)
  const absSuccessRef = useRef(null)

  const FURTHER_CARDS = t('bidding.furtherCards').map((c, i) => ({
    ...c, key: FURTHER_CARD_KEYS[i], img: FURTHER_CARD_IMGS[i], href: FURTHER_CARD_HREFS[i],
  }))

  // ── Telephone form state ─────────────────────────────────────────────────
  const [tel, setTel]                   = useState(initPersonal())
  const [telLots, setTelLots]           = useState(initLots())
  const [telOnePiano, setTelOnePiano]   = useState('yes')
  const [telStep, setTelStep]           = useState(1)
  const [telErrors, setTelErrors]       = useState({})
  const [telSuccess, setTelSuccess]     = useState('')
  const [telSubmitting, setTelSubmitting] = useState(false)

  // ── Absentee form state ──────────────────────────────────────────────────
  const [abs, setAbs]                   = useState(initPersonal())
  const [absLots, setAbsLots]           = useState(initLots())
  const [absMaxBids, setAbsMaxBids]     = useState(Array(5).fill(''))
  const [absOnePiano, setAbsOnePiano]   = useState('yes')
  const [absStep, setAbsStep]           = useState(1)
  const [absErrors, setAbsErrors]       = useState({})
  const [absSuccess, setAbsSuccess]     = useState('')
  const [absSubmitting, setAbsSubmitting] = useState(false)

  // ── Validation ───────────────────────────────────────────────────────────

  const validateLots = (lots, showMaxBid, maxBids) => {
    const errs = {}
    if (!lots[0].lot_number.trim())  errs.lot_0_number      = 'Required'
    if (!lots[0].description.trim()) errs.lot_0_description = 'Required'
    if (showMaxBid) {
      if (!maxBids[0]?.toString().trim()) errs.lot_0_maxbid = 'Required'
      else if (Number(maxBids[0]) <= 0)   errs.lot_0_maxbid = 'Must be greater than 0'
    }
    return errs
  }

  // ── Lot table helpers ────────────────────────────────────────────────────

  const updateTelLot = (idx, field, val) => {
    setTelLots(telLots.map((l, i) => i === idx ? { ...l, [field]: val } : l))
  }

  const updateAbsLot = (idx, field, val) => {
    setAbsLots(absLots.map((l, i) => i === idx ? { ...l, [field]: val } : l))
  }

  const updateAbsMaxBid = (idx, val) => {
    const next = [...absMaxBids]
    next[idx] = val
    setAbsMaxBids(next)
  }

  // ── Build extra-lot notes string ─────────────────────────────────────────

  const buildExtraNotes = (lots) => {
    const extras = lots.slice(1).filter((l) => l.lot_number.trim() || l.description.trim())
    if (!extras.length) return ''
    return 'Additional lots:\n' + extras.map((l, i) => `Lot ${i + 2}: ${l.lot_number} — ${l.description}`).join('\n')
  }

  // ── Submit telephone ─────────────────────────────────────────────────────

  const submitTelephone = async (e) => {
    e.preventDefault()
    const errs = validateLots(telLots, false, [])
    if (Object.keys(errs).length) { setTelErrors(errs); return }
    setTelSubmitting(true)
    try {
      await biddingApi.postTelephone({
        first_name:        tel.first_name,
        last_name:         tel.last_name,
        email:             tel.email,
        phone:             tel.phone,
        address:           tel.address,
        post_code:         tel.postcode,
        lot_1_number:      telLots[0].lot_number,
        lot_1_description: telLots[0].description,
        lot_2_number:      telLots[1].lot_number  || null,
        lot_2_description: telLots[1].description || null,
        lot_3_number:      telLots[2].lot_number  || null,
        lot_3_description: telLots[2].description || null,
        lot_4_number:      telLots[3].lot_number  || null,
        lot_4_description: telLots[3].description || null,
        lot_5_number:      telLots[4].lot_number  || null,
        lot_5_description: telLots[4].description || null,
        one_piano_only:    telOnePiano === 'yes',
      })
      setTelSuccess(t('bidding.successMsg'))
      setTelErrors({})
      setTelStep(1)
      setTel(initPersonal())
      setTelLots(initLots())
      setTelOnePiano('yes')
      setTimeout(() => telSuccessRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    } catch (err) {
      const serverErrors = err.response?.data?.errors
      if (serverErrors) {
        const mapped = {}
        Object.entries(serverErrors).forEach(([k, v]) => { mapped[k] = Array.isArray(v) ? v[0] : v })
        setTelErrors({ ...mapped, submit: err.response?.data?.message })
      } else {
        setTelErrors({ submit: err.response?.data?.message || 'Submission failed. Please try again.' })
      }
    } finally {
      setTelSubmitting(false)
    }
  }

  // ── Submit absentee ──────────────────────────────────────────────────────

  const submitAbsentee = async (e) => {
    e.preventDefault()
    const errs = validateLots(absLots, true, absMaxBids)
    if (Object.keys(errs).length) { setAbsErrors(errs); return }
    setAbsSubmitting(true)
    try {
      await biddingApi.postAbsentee({
        first_name:        abs.first_name,
        last_name:         abs.last_name,
        email:             abs.email,
        phone:             abs.phone,
        address:           abs.address,
        post_code:         abs.postcode,
        lot_1_number:      absLots[0].lot_number,
        lot_1_description: absLots[0].description,
        lot_2_number:      absLots[1].lot_number  || null,
        lot_2_description: absLots[1].description || null,
        lot_3_number:      absLots[2].lot_number  || null,
        lot_3_description: absLots[2].description || null,
        lot_4_number:      absLots[3].lot_number  || null,
        lot_4_description: absLots[3].description || null,
        lot_5_number:      absLots[4].lot_number  || null,
        lot_5_description: absLots[4].description || null,
        max_bid_per_lot:   absMaxBids[0] || null,
        currency:          'GBP',
        one_piano_only:    absOnePiano === 'yes',
      })
      setAbsSuccess(t('bidding.successMsg'))
      setAbsErrors({})
      setAbsStep(1)
      setAbs(initPersonal())
      setAbsLots(initLots())
      setAbsMaxBids(Array(5).fill(''))
      setAbsOnePiano('yes')
      setTimeout(() => absSuccessRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
    } catch (err) {
      const serverErrors = err.response?.data?.errors
      if (serverErrors) {
        const mapped = {}
        Object.entries(serverErrors).forEach(([k, v]) => { mapped[k] = Array.isArray(v) ? v[0] : v })
        setAbsErrors({ ...mapped, submit: err.response?.data?.message })
      } else {
        setAbsErrors({ submit: err.response?.data?.message || 'Submission failed. Please try again.' })
      }
    } finally {
      setAbsSubmitting(false)
    }
  }

  // ────────────────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full bg-white">

      {/* ── HERO ── */}
      <section
        className="relative h-72 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80)' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 mb-3">{t('bidding.pageLabel')}</p>
          <h1
            className="font-heading text-white text-center"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, margin: 0 }}
          >
            {t('bidding.heroTitle')}
          </h1>
          <nav className="mt-3 text-xs text-white/60 text-center">
            <Link to="/" className="hover:text-white transition-colors">{t('bidding.breadcrumbHome')}</Link>
            <span className="mx-2">&rsaquo;</span>
            <span className="text-white/80">{t('bidding.breadcrumbPage')}</span>
          </nav>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="py-16 px-6 bg-white text-center">
        <h2
          className="font-heading text-gray-900 max-w-xl mx-auto mb-3 text-center"
          style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', marginBottom: '12px' }}
        >
          {t('bidding.introTitle')}
        </h2>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto text-center">{t('bidding.introDesc')}</p>
      </section>

      {/* ── THREE BIDDING CARDS ── */}
      <section className="py-12 px-6 lg:px-10" style={{ backgroundColor: '#f5ede6' }}>
        <div className="max-w-3xl mx-auto space-y-8">

          {/* ── CARD 1 — Online Bidding ── */}
          <div className="bg-white border border-gray-200 p-10 text-center">
            <div className="inline-flex flex-col items-center justify-center w-24 h-20 mb-5" style={{ backgroundColor: '#1565C0' }}>
              <span className="text-white text-xs font-bold leading-tight">easylive</span>
              <span className="text-yellow-400 text-sm font-black italic leading-tight">Auction</span>
              <span className="text-white text-[10px] leading-tight">.com</span>
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-gray-500 text-sm">🖥</span>
              <h2
                className="font-heading text-gray-900 text-center"
                style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400, margin: 0 }}
              >
                {t('bidding.onlineBiddingTitle')}
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto text-center">
              {t('bidding.onlineBiddingDesc').replace('easyliveauction.com', '')}{' '}
              <a href="https://www.easyliveauction.com" target="_blank" rel="noopener noreferrer" className="underline text-gray-700 hover:text-black">
                easyliveauction.com
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/auction-portal')}
                className="border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-black hover:text-white transition-colors"
              >
                {t('bidding.ukBidNow')}
              </button>
              <button
                onClick={() => navigate('/auction-portal')}
                className="border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-black hover:text-white transition-colors"
              >
                {t('bidding.euBidNow')}
              </button>
            </div>
          </div>

          {/* ── CARD 2 — Telephone Bidding ── */}
          <div className="bg-white border border-gray-200 p-10">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-gray-700">📞</span>
                <h2
                  className="font-heading text-gray-900 text-center"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400, margin: 0 }}
                >
                  {t('bidding.telephoneTitle')}
                </h2>
              </div>
              <p className="text-sm text-gray-500 text-center">{t('bidding.telephoneDesc')}</p>
            </div>

            <StepProgress step={telStep} step1Label={t('bidding.personalDetails')} step2Label={t('bidding.telephoneBid')} />

            {telSuccess && (
              <div ref={telSuccessRef} className="mb-6 border border-green-200 bg-green-50 p-4 text-sm text-green-800 text-center">
                {telSuccess}
              </div>
            )}

            {/* Step 1 — Personal Details */}
            {telStep === 1 && (
              <PersonalForm
                data={tel}
                setData={setTel}
                errors={telErrors}
                onNext={(errs) => {
                  if (Object.keys(errs).length) { setTelErrors(errs); return }
                  setTelErrors({})
                  setTelStep(2)
                }}
              />
            )}

            {/* Step 2 — Telephone Bid Details */}
            {telStep === 2 && (
              <form onSubmit={submitTelephone} className="space-y-6">
                <LotTable
                  lots={telLots}
                  onChange={updateTelLot}
                  errors={telErrors}
                  showMaxBid={false}
                  maxBids={[]}
                  onMaxBidChange={() => {}}
                />

                {/* One piano only */}
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    {t('bidding.onePianoOnly')} <span className="text-red-500">*</span>
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="telOnePiano" value="yes" checked={telOnePiano === 'yes'} onChange={() => setTelOnePiano('yes')} className="h-4 w-4 accent-gray-900" />
                      <span className="text-sm text-gray-800">{t('bidding.yes')}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="telOnePiano" value="no" checked={telOnePiano === 'no'} onChange={() => setTelOnePiano('no')} className="h-4 w-4 accent-gray-900" />
                      <span className="text-sm text-gray-800">{t('bidding.no')}</span>
                    </label>
                  </div>
                </div>

                {telErrors.submit && (
                  <p className="text-sm text-red-600 flex items-center justify-center gap-1">
                    <FiAlertCircle className="h-4 w-4 flex-shrink-0" />{telErrors.submit}
                  </p>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button type="button" onClick={() => { setTelStep(1); setTelErrors({}) }}
                    className="border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-gray-50 transition-colors">
                    {t('bidding.previous')}
                  </button>
                  <button type="submit" disabled={telSubmitting}
                    className="bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-gray-900 transition-colors disabled:opacity-60"
                  >
                    {telSubmitting ? t('bidding.sending') : t('bidding.send')}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── CARD 3 — Absentee Bidding ── */}
          <div className="bg-white border border-gray-200 p-10">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-gray-700">👤</span>
                <h2
                  className="font-heading text-gray-900 text-center"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400, margin: 0 }}
                >
                  {t('bidding.absenteeTitle')}
                </h2>
              </div>
              <p className="text-sm text-gray-500 text-center">{t('bidding.absenteeDesc')}</p>
            </div>

            <StepProgress step={absStep} step1Label={t('bidding.personalDetails')} step2Label={t('bidding.absenteeBid')} />

            {absSuccess && (
              <div ref={absSuccessRef} className="mb-6 border border-green-200 bg-green-50 p-4 text-sm text-green-800 text-center">
                {absSuccess}
              </div>
            )}

            {/* Step 1 — Personal Details */}
            {absStep === 1 && (
              <PersonalForm
                data={abs}
                setData={setAbs}
                errors={absErrors}
                onNext={(errs) => {
                  if (Object.keys(errs).length) { setAbsErrors(errs); return }
                  setAbsErrors({})
                  setAbsStep(2)
                }}
              />
            )}

            {/* Step 2 — Absentee Bid Details */}
            {absStep === 2 && (
              <form onSubmit={submitAbsentee} className="space-y-6">
                <LotTable
                  lots={absLots}
                  onChange={updateAbsLot}
                  errors={absErrors}
                  showMaxBid={true}
                  maxBids={absMaxBids}
                  onMaxBidChange={updateAbsMaxBid}
                />

                {/* One piano only */}
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    {t('bidding.onePianoOnly')} <span className="text-red-500">*</span>
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="absOnePiano" value="yes" checked={absOnePiano === 'yes'} onChange={() => setAbsOnePiano('yes')} className="h-4 w-4 accent-gray-900" />
                      <span className="text-sm text-gray-800">{t('bidding.yes')}</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="absOnePiano" value="no" checked={absOnePiano === 'no'} onChange={() => setAbsOnePiano('no')} className="h-4 w-4 accent-gray-900" />
                      <span className="text-sm text-gray-800">{t('bidding.no')}</span>
                    </label>
                  </div>
                </div>

                {absErrors.submit && (
                  <p className="text-sm text-red-600 flex items-center justify-center gap-1">
                    <FiAlertCircle className="h-4 w-4 flex-shrink-0" />{absErrors.submit}
                  </p>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button type="button" onClick={() => { setAbsStep(1); setAbsErrors({}) }}
                    className="border border-black text-black text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-gray-50 transition-colors">
                    {t('bidding.previous')}
                  </button>
                  <button type="submit" disabled={absSubmitting}
                    className="bg-black text-white text-xs font-semibold tracking-wider uppercase py-3 px-8 hover:bg-gray-900 transition-colors disabled:opacity-60">
                    {absSubmitting ? t('bidding.sending') : t('bidding.send')}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── FURTHER INFORMATION ── */}
      <section className="py-20 px-6 lg:px-10 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 mb-3 text-center">{t('bidding.furtherLabel')}</p>
            <h2 className="font-heading text-white text-center"
              style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', margin: 0 }}>
              {t('bidding.furtherTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FURTHER_CARDS.map((card) => (
              <div key={card.key} className="relative overflow-hidden group cursor-pointer" onClick={() => navigate(card.href)}>
                <div className="h-52 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 h-52 bg-black/40" />
                </div>
                <div className="bg-gray-900 p-6 text-center flex flex-col items-center">
                  <h3
                    className="font-heading text-white mb-2 text-center"
                    style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 8px' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed text-center">{card.desc}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(card.href) }}
                    className="border border-white text-white text-[11px] font-semibold tracking-wider uppercase py-2 px-5 hover:bg-white hover:text-black transition-colors inline-flex items-center gap-2"
                  >
                    {card.key === 'catalogue'   && <FiBookOpen className="h-4 w-4" />}
                    {card.key === 'appointment' && <FiCalendar className="h-4 w-4" />}
                    {card.key === 'contact'     && <FiMail    className="h-4 w-4" />}
                    {card.btn}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE STRIP ── */}
      <div className="grid grid-cols-3 sm:grid-cols-6">
        {STRIP_IMAGES.map((src, i) => (
          <div key={i} className="h-28 overflow-hidden">
            <img src={src} alt={`Piano ${i + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

    </div>
  )
}
