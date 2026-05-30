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
      <section className="relative min-h-[520px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80)' }}>
        <div className="absolute inset-0 bg-slate-950/80"></div>
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="w-full text-center text-white">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-200">PIANO AUCTIONS LTD</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">Contact Us</h1>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-semibold text-slate-950">Contact Our Piano Sales and Auctions Office</h2>
          <p className="mt-6 text-base leading-8 text-slate-600">
            For any queries you may have about our piano sales and auctions, selling process and valuation process, don't hesitate to get in touch. Our specialist piano advisers will respond swiftly and efficiently to take care of your needs.
          </p>
        </div>
      </section>

      <section className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[30px] bg-white p-10 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">Piano Auctions Ltd - Office</h3>
            <div className="my-6 h-px bg-slate-200"></div>
            <div className="space-y-1 text-sm text-slate-700">
              <p>Piano Auctions Ltd</p>
              <p>18 Grove Place</p>
              <p>Bedford MK40 3JJ</p>
              <p>United Kingdom</p>
            </div>

            <div className="my-8 h-px bg-slate-200"></div>
            <h4 className="text-xl font-semibold text-slate-950">Opening Times</h4>
            <p className="mt-3 text-sm leading-7 text-slate-700">Monday�Friday (09:00 � 17:00)</p>

            <div className="my-8 h-px bg-slate-200"></div>
            <h4 className="text-xl font-semibold text-slate-950">Email &amp; Phone</h4>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <p className="flex items-center gap-2"><MdEmail className="h-5 w-5 text-slate-800" /> info@pianoauctions.co.uk</p>
              <p className="flex items-center gap-2"><MdPhone className="h-5 w-5 text-slate-800" /> 01234 831 742 - Local</p>
              <p className="flex items-center gap-2"><MdPhone className="h-5 w-5 text-slate-800" /> 0044 1234 831 742 - International</p>
            </div>
          </div>

          <div className="rounded-[30px] bg-white p-10 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">Send Your Enquiry</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Please provide your details and message below so our team can get back to you as soon as possible.
            </p>

            {status && (
              <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
                {status}
              </div>
            )}

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-slate-700">
                  <span>First Name</span>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className={`h-14 w-full rounded-xl border px-4 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none ${errors.first_name ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                  />
                  {errors.first_name && <p className="text-xs text-rose-600">{errors.first_name[0]}</p>}
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className={`h-14 w-full rounded-xl border px-4 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none ${errors.last_name ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                  />
                  {errors.last_name && <p className="text-xs text-rose-600">{errors.last_name[0]}</p>}
                </label>
              </div>

              <label className="space-y-2 text-sm text-slate-700 block">
                <span>
                  Email <span className="text-rose-500">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className={`h-14 w-full rounded-xl border px-4 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                />
                {errors.email && <p className="text-xs text-rose-600">{errors.email[0]}</p>}
              </label>

              <label className="space-y-2 text-sm text-slate-700 block">
                <span>
                  Phone <span className="text-rose-500">*</span>
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  className={`h-14 w-full rounded-xl border px-4 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none ${errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                />
                {errors.phone && <p className="text-xs text-rose-600">{errors.phone[0]}</p>}
              </label>

              <label className="space-y-2 text-sm text-slate-700 block">
                <span>
                  Message <span className="text-rose-500">*</span>
                </span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your message"
                  rows={6}
                  className={`w-full rounded-xl border px-4 py-4 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none ${errors.message ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                />
                {errors.message && <p className="text-xs text-rose-600">{errors.message[0]}</p>}
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-slate-950 px-6 py-4 text-base font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Sending�' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Piano Auctions Ltd - Office</h3>
              <div className="my-4 h-px bg-slate-200"></div>
              <p className="text-sm text-slate-600">18 Grove Place | Bedford | MK40 3JJ</p>
              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
                <iframe
                  title="Office location"
                  src="https://maps.google.com/maps?q=18+Grove+Place+Bedford+MK40+3JJ&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Piano Auctions Ltd - UK Auction</h3>
              <div className="my-4 h-px bg-slate-200"></div>
              <p className="text-sm text-slate-600">1 Sydney Road | Watford | WD18 7XX</p>
              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
                <iframe
                  title="UK auction location"
                  src="https://maps.google.com/maps?q=1+Sydney+Road+Watford+WD18+7XX&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">Piano Auctions Ltd - EU Auction</h3>
              <div className="my-4 h-px bg-slate-200"></div>
              <p className="text-sm text-slate-600">Schumanweg 1 | 2411 NH Bodegraven | Netherlands</p>
              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200">
                <iframe
                  title="EU auction location"
                  src="https://maps.google.com/maps?q=Schumanweg+1+2411+NH+Bodegraven+Netherlands&output=embed"
                  className="h-64 w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">USE OUR SERVICES TODAY</p>
          <h2 className="mt-5 text-4xl font-semibold">Further Information</h2>
        </div>

        <div className="mx-auto mt-12 grid gap-8 lg:grid-cols-3">
          {[
            {
              title: 'Buy a Piano',
              description:
                'Learn about our online piano auctions and how to purchase the perfect grand or upright piano for your home.',
              image: 'https://images.unsplash.com/photo-1511376777868-611b54f68947?w=1200&q=80',
              path: '/auctions',
            },
            {
              title: 'Sell My Piano',
              description:
                'Find out how to sell your instrument in one of our world-leading auctions.',
              image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
              path: '/absentee-bid',
            },
            {
              title: 'Value My Piano',
              description:
                'Find out how much your piano is worth at auction. Our specialist team can provide you a valuation for your upright piano or grand piano.',
              image: 'https://images.unsplash.com/photo-1496180727794-817822f65950?w=1200&q=80',
              path: '/contact',
            },
          ].map((card) => (
            <div key={card.title} className="overflow-hidden rounded-[32px] bg-white text-slate-950 shadow-lg">
              <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }}></div>
              <div className="space-y-4 border-t border-slate-200 p-6">
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-sm leading-7 text-slate-600">{card.description}</p>
                <Link
                  to={card.path}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-950 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
