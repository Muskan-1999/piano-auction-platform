import React, { useState } from 'react'
import api from '../api/axios'

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  preferred_date: '',
  message: '',
}

export default function Appointment() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('')
    setErrors({})

    try {
      // placeholder endpoint, replace with appointment API when available
      await api.post('/contact', form)
      setStatus('Your appointment request has been sent. We will contact you shortly.')
      setForm(initialState)
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {})
      } else {
        setStatus('There was an issue submitting your request. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <section className="relative min-h-[420px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519681393784-817822f65950?auto=format&fit=crop&w=1600&q=80)' }}>
        <div className="absolute inset-0 bg-slate-950/70"></div>
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Appointment</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">Book an Appointment</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">Schedule a time with our specialists to view pianos and discuss auction plans.</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-950">Appointment Booking</h2>
          <p className="mt-4 text-slate-600">Please provide your details and preferred date. Our team will confirm your appointment shortly.</p>

          {status && (
            <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-900">
              {status}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              {['first_name', 'last_name', 'email', 'phone', 'preferred_date'].map((field, index) => {
                const label = field === 'first_name' ? 'First Name' : field === 'last_name' ? 'Last Name' : field === 'preferred_date' ? 'Preferred Date' : field === 'email' ? 'Email' : 'Phone'
                return (
                  <label key={field} className="space-y-2 text-sm text-slate-700">
                    <span>{label}</span>
                    <input
                      type={field === 'email' ? 'email' : field === 'preferred_date' ? 'date' : 'text'}
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                      className={`h-14 w-full rounded-xl border px-4 text-sm text-slate-900 transition focus:border-slate-900 focus:outline-none ${errors[field] ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
                    />
                    {errors[field] && <p className="text-xs text-rose-600">{errors[field][0]}</p>}
                  </label>
                )
              })}
            </div>

            <label className="space-y-2 text-sm text-slate-700 block">
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
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
              {submitting ? 'Sending...' : 'Request Appointment'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
