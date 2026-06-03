import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail, MdPhone } from 'react-icons/md'
import api from '../api/axios'

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
}

export default function ContactPage() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    setErrors({})
    setStatus('')

    try {
      const response = await api.post('/contact', form)
      if (response.data?.status === 'success') {
        setStatus('Your enquiry has been sent successfully.')
        setForm(initialFormState)
      } else {
        setStatus('Your enquiry has been sent successfully.')
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {})
      } else {
        setStatus('There was an error sending your enquiry. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full overflow-hidden bg-white text-slate-900">

      {/* Hero */}
      <section
        className="relative flex min-h-[380px] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80)' }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative text-center text-white px-4">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300 mb-4">PIANO AUCTIONS LTD</p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">Contact Us</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-950 leading-snug">
            Contact Our Piano Sales and Auctions<br />Office
          </h2>
          <p className="mt-5 text-sm leading-8 text-slate-500">
            For any queries you may have about our piano sales and auctions, selling process and valuation
            process, don't hesitate to get in touch. Our specialist piano advisers will respond swiftly and efficiently
            to take care of your needs.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">

          {/* Left — office info */}
          <div className="rounded-sm bg-white p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-950">Piano Auctions Ltd - Office</h3>
            <div className="my-5 h-px bg-slate-200" />
            <div className="space-y-1 text-sm text-slate-700">
              <p>Piano Auctions Ltd</p>
              <p>18 Grove Place</p>
              <p>Bedford MK40 3JJ</p>
              <p>United Kingdom</p>
            </div>

            <div className="my-6 h-px bg-slate-200" />
            <h4 className="text-base font-semibold text-slate-950">Opening Times</h4>
            <p className="mt-2 text-sm text-slate-700">Monday–Friday (09:00 – 17:00)</p>

            <div className="my-6 h-px bg-slate-200" />
            <h4 className="text-base font-semibold text-slate-950">Email &amp; Phone</h4>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <p className="flex items-center gap-2">
                <MdEmail className="h-4 w-4 text-slate-600 shrink-0" />
                info@pianoauctions.co.uk
              </p>
              <p className="flex items-center gap-2">
                <MdPhone className="h-4 w-4 text-slate-600 shrink-0" />
                01234 831 742 - Local
              </p>
              <p className="flex items-center gap-2">
                <MdPhone className="h-4 w-4 text-slate-600 shrink-0" />
                0044 1234 831 742 - International
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-sm bg-white p-8 shadow-sm border border-slate-200">
            {status && (
              <div className="mb-6 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                {status}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-600">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    className={`h-10 w-full border px-3 text-sm text-slate-900 focus:border-slate-800 focus:outline-none ${errors.first_name ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                  />
                  {errors.first_name && <p className="text-xs text-rose-600">{errors.first_name[0]}</p>}
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-slate-600">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    className={`h-10 w-full border px-3 text-sm text-slate-900 focus:border-slate-800 focus:outline-none ${errors.last_name ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                  />
                  {errors.last_name && <p className="text-xs text-rose-600">{errors.last_name[0]}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-600">
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`h-10 w-full border px-3 text-sm text-slate-900 focus:border-slate-800 focus:outline-none ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                />
                {errors.email && <p className="text-xs text-rose-600">{errors.email[0]}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-600">
                  Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={`h-10 w-full border px-3 text-sm text-slate-900 focus:border-slate-800 focus:outline-none ${errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                />
                {errors.phone && <p className="text-xs text-rose-600">{errors.phone[0]}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-slate-600">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full border px-3 py-3 text-sm text-slate-900 focus:border-slate-800 focus:outline-none resize-none ${errors.message ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                />
                {errors.message && <p className="text-xs text-rose-600">{errors.message[0]}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Location Maps */}
      <section className="bg-slate-100 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Piano Auctions Ltd - Office',
                address: '18 Grove Place | Bedford | MK40 3JJ',
                mapSrc: 'https://maps.google.com/maps?q=18+Grove+Place+Bedford+MK40+3JJ&output=embed',
                mapTitle: 'Office location',
              },
              {
                title: 'Piano Auctions Ltd - UK Auction',
                address: '1 Sydney Road | Watford | WD18 7XX',
                mapSrc: 'https://maps.google.com/maps?q=1+Sydney+Road+Watford+WD18+7XX&output=embed',
                mapTitle: 'UK auction location',
              },
              {
                title: 'Piano Auctions Ltd - EU Auction',
                address: 'Schumanweg 1 | 2411 NH Bodegraven | Netherlands',
                mapSrc: 'https://maps.google.com/maps?q=Schumanweg+1+2411+NH+Bodegraven+Netherlands&output=embed',
                mapTitle: 'EU auction location',
              },
            ].map((loc) => (
              <div key={loc.title} className="rounded-sm bg-white p-5 shadow-sm border border-slate-200">
                <h3 className="text-base font-semibold text-slate-950">{loc.title}</h3>
                <div className="my-3 h-px bg-slate-200" />
                <p className="text-xs text-slate-600 mb-4">{loc.address}</p>
                <div className="overflow-hidden border border-slate-200">
                  <iframe
                    title={loc.mapTitle}
                    src={loc.mapSrc}
                    className="h-52 w-full"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Further Information */}
      <section className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-4">USE OUR SERVICES TODAY</p>
            <h2 className="text-4xl font-semibold">Further Information</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Buy a Piano',
                description:
                  'Learn about our online piano auctions and how to purchase the perfect grand or upright piano for your home.',
                image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800&q=80',
                path: '/buying-piano',
              },
              {
                title: 'Sell My Piano',
                description:
                  'Find out how to sell your instrument in one of our world-leading auctions.',
                image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
                path: '/sell-my-piano',
              },
              {
                title: 'Value My Piano',
                description:
                  'Find out how much your piano is worth at auction. Our specialist team can provide you a valuation for your upright piano or grand piano.',
                image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
                path: '/value-my-piano',
              },
            ].map((card) => (
              <div key={card.title} className="overflow-hidden bg-white text-slate-950 shadow-lg">
                <div
                  className="h-52 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="p-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                  <p className="text-sm leading-6 text-slate-600 mb-5">{card.description}</p>
                  <Link
                    to={card.path}
                    className="inline-flex w-full items-center justify-center border border-slate-950 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
