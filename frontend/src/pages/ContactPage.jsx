import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdEmail, MdPhone } from 'react-icons/md'
import api from '../api/axios'
import { useLanguage } from '../contexts/LanguageContext'

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
}

export default function ContactPage() {
  const { t } = useLanguage()
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
        setStatus(t('contact.successMsg'))
        setForm(initialFormState)
      } else {
        setStatus(t('contact.successMsg'))
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors || {})
      } else {
        setStatus(t('contact.errorMsg'))
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
          <p className="text-xs uppercase tracking-[0.35em] text-slate-300 mb-4">{t('contact.heroLabel')}</p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">{t('contact.heroTitle')}</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-slate-950 leading-snug">{t('contact.introTitle')}</h2>
          <p className="mt-5 text-sm leading-8 text-slate-500">{t('contact.introBody')}</p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[360px_1fr]">

          {/* Left — office info */}
          <div className="rounded-sm bg-white p-8 shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-950">{t('contact.officeTitle')}</h3>
            <div className="my-5 h-px bg-slate-200" />
            <div className="space-y-1 text-sm text-slate-700">
              <p>Piano Auctions Ltd</p>
              <p>18 Grove Place</p>
              <p>Bedford MK40 3JJ</p>
              <p>United Kingdom</p>
            </div>

            <div className="my-6 h-px bg-slate-200" />
            <h4 className="text-base font-semibold text-slate-950">{t('contact.openingTitle')}</h4>
            <p className="mt-2 text-sm text-slate-700">{t('contact.openingHours')}</p>

            <div className="my-6 h-px bg-slate-200" />
            <h4 className="text-base font-semibold text-slate-950">{t('contact.contactTitle')}</h4>
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
                  <label className="text-xs text-slate-600">{t('contact.formFirstName')}</label>
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
                  <label className="text-xs text-slate-600">{t('contact.formLastName')}</label>
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
                  {t('contact.formEmail')} <span className="text-rose-500">*</span>
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
                  {t('contact.formPhone')} <span className="text-rose-500">*</span>
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
                  {t('contact.formMessage')} <span className="text-rose-500">*</span>
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
                {submitting ? t('contact.sendingBtn') : t('contact.sendBtn')}
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
              { title: t('contact.officeLocation'), address: '18 Grove Place | Bedford | MK40 3JJ', mapSrc: 'https://maps.google.com/maps?q=18+Grove+Place+Bedford+MK40+3JJ&output=embed', mapTitle: 'Office location' },
              { title: t('contact.ukAuction'), address: '1 Sydney Road | Watford | WD18 7XX', mapSrc: 'https://maps.google.com/maps?q=1+Sydney+Road+Watford+WD18+7XX&output=embed', mapTitle: 'UK auction location' },
              { title: t('contact.euAuction'), address: 'Schumanweg 1 | 2411 NH Bodegraven | Netherlands', mapSrc: 'https://maps.google.com/maps?q=Schumanweg+1+2411+NH+Bodegraven+Netherlands&output=embed', mapTitle: 'EU auction location' },
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
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-4">{t('contact.locationsLabel')}</p>
            <h2 className="text-4xl font-semibold">{t('contact.locationsTitle')}</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {t('contact.furtherCards').map((card, i) => {
              const paths = ['/buying-piano', '/sell-my-piano', '/value-my-piano']
              const images = ['https://images.unsplash.com/photo-1511376777868-611b54f68947?w=800&q=80','https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80']
              const item = { ...card, image: images[i], path: paths[i] }
              return item
            }).map((card) => (
              <div key={card.title} className="overflow-hidden bg-white text-slate-950 shadow-lg">
                <div
                  className="h-52 bg-cover bg-center"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="p-6 border-t border-slate-200">
                  <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                  <p className="text-sm leading-6 text-slate-600 mb-5">{card.description}</p>
                  <Link to={card.path} className="inline-flex w-full items-center justify-center border border-slate-950 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100">
                    {card.link}
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
