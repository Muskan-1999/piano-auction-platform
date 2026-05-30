import { useState } from 'react'
import api from '../api/axios'

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
}

const TextInput = ({ label, name, value, onChange, placeholder, error, type = 'text' }) => (
  <label className="space-y-2">
    <span className="text-sm font-semibold text-slate-900">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full rounded-[28px] border px-5 py-4 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none ${error ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
    />
    {error && <p className="text-sm text-rose-600">{error}</p>}
  </label>
)

const TextareaInput = ({ label, name, value, onChange, placeholder, error }) => (
  <label className="space-y-2">
    <span className="text-sm font-semibold text-slate-900">{label}</span>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={6}
      className={`w-full rounded-[28px] border px-5 py-5 text-sm text-slate-900 shadow-sm transition focus:border-slate-900 focus:outline-none ${error ? 'border-rose-500 bg-rose-50' : 'border-slate-300 bg-white'}`}
    />
    {error && <p className="text-sm text-rose-600">{error}</p>}
  </label>
)

export default function ContactUs() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setErrors({})
    setMessage('')

    try {
      const response = await api.post('/contact', form)
      if (response.data?.status === 'success') {
        setMessage('Your enquiry is submitted we will contact you')
        setForm(initialFormState)
      } else {
        setMessage('Your enquiry has been submitted successfully.')
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {})
      } else {
        setMessage('There was an error submitting your enquiry. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-[#f6efe3] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-stretch">
        <div className="flex-1 rounded-[40px] border border-slate-200 bg-white p-10 shadow-[0_40px_80px_rgba(15,23,42,0.08)] lg:max-w-[480px]">
          <div className="mb-8 inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            Contact Us
          </div>
          <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">Get in touch with our team</h1>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Use the form to contact us about your UK bid enquiry. We’ll get back to you quickly with the next steps.
          </p>

          <div className="mt-10 flex flex-col gap-4 rounded-[32px] bg-[#f8f0e5] p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">Need help?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">Our specialists are ready to answer your enquiry and support your bidding needs.</p>
            </div>
            <div className="space-y-3 text-sm text-slate-500">
              <p><span className="font-semibold text-slate-900">Email:</span> support@pianoauctions.co.uk</p>
              <p><span className="font-semibold text-slate-900">Phone:</span> +44 20 7946 0958</p>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-[40px] bg-slate-950 p-10 text-white shadow-[0_40px_80px_rgba(15,23,42,0.12)]">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">UK Bid Now</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white">Contact Us</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              Fill in your details below and our team will contact you shortly to complete your bid registration.
            </p>
          </div>

          {message && (
            <div className="mb-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-900">
              {message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                label="First Name"
                name="first_name"
                type="text"
                value={form.first_name}
                placeholder="John"
                onChange={handleChange}
                error={errors.first_name?.[0]}
              />
              <TextInput
                label="Last Name"
                name="last_name"
                type="text"
                value={form.last_name}
                placeholder="Doe"
                onChange={handleChange}
                error={errors.last_name?.[0]}
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                placeholder="you@example.com"
                onChange={handleChange}
                error={errors.email?.[0]}
              />
              <TextInput
                label="Phone"
                name="phone"
                type="tel"
                value={form.phone}
                placeholder="Optional"
                onChange={handleChange}
                error={errors.phone?.[0]}
              />
            </div>

            <TextareaInput
              label="Message"
              name="message"
              value={form.message}
              placeholder="Write your message..."
              onChange={handleChange}
              error={errors.message?.[0]}
            />

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-[28px] bg-slate-50 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Submit enquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
