import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiBookOpen, FiCalendar, FiChevronRight } from 'react-icons/fi'
import BiddingFormLayout from '../components/bidding/BiddingFormLayout'
import InputField from '../components/bidding/InputField'
import TextAreaField from '../components/bidding/TextAreaField'
import pianoImage from '../assets/hero.png'
import biddingApi from '../api/bidding'

export default function BiddingPage() {
  // Telephone (step 1 = personal, step 2 = lots)
  const [tel, setTel] = useState({ first_name: '', last_name: '', email: '', phone: '', alternate_phone: '', address: '', postcode: '', country: '', descriptions: '', preferred_call_time: '', notes: '', one_piano_only: 'yes' })
  const [telStep, setTelStep] = useState(1)
  const [telLots, setTelLots] = useState(Array.from({ length: 5 }, () => ({ lot_number: '', description: '', item_type: 'Piano' })))
  // Absentee
  const [abs, setAbs] = useState({ first_name: '', last_name: '', email: '', phone: '', address: '', postcode: '', country: '', currency: 'GBP', notes: '', one_piano_only: 'yes' })
  const [absStep, setAbsStep] = useState(1)
  const [absLots, setAbsLots] = useState(Array.from({ length: 5 }, () => ({ lot_number: '', description: '', item_type: 'Piano' })))
  const [selectedFeatured, setSelectedFeatured] = useState('catalogue')
  const featuredCards = [
    {
      key: 'catalogue',
      title: 'View Catalogue',
      description: 'Take a look at our latest piano on offer in our auction catalogue.',
      icon: <FiBookOpen className="h-5 w-5" />,
      button: 'View Catalogue',
    },
    {
      key: 'appointment',
      title: 'Book Appointment',
      description: 'Book your appointment to come and see our pianos.',
      icon: <FiCalendar className="h-5 w-5" />,
      button: 'Book an Appointment',
    },
    {
      key: 'contact',
      title: 'Contact us',
      description: 'If you need to speak to us, please don’t hesitate to get in touch.',
      icon: <FiMail className="h-5 w-5" />,
      button: 'Contact Us',
    },
  ]

  const submitTelephone = async (e) => {
    e.preventDefault()
    // attach lots
    await biddingApi.postTelephone({ ...tel, lot_numbers: telLots })
    alert('Telephone bid submitted')
  }

  const submitAbsentee = async (e) => {
    e.preventDefault()
    await biddingApi.postAbsentee({ ...abs, lot_numbers: absLots })
    alert('Absentee bid submitted')
  }

  const submitOnline = async (e) => {
    e.preventDefault()
    await biddingApi.postOnline(online)
    alert('Online registration submitted')
  }

  // We'll render three stacked sections (Online, Telephone, Absentee)

  const renderLotsEditor = (lots, setLots) => (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 text-sm text-slate-500 font-semibold">
        <div className="col-span-5">Lot Number</div>
        <div className="col-span-5">Description</div>
        <div className="col-span-2 text-right">Item</div>
      </div>
      {lots.map((l, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-5">
            <label className="block text-sm text-slate-600">Lot Number</label>
            <input className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm" value={l.lot_number} onChange={(e) => {
              const next = [...lots]; next[idx].lot_number = e.target.value; setLots(next);
            }} placeholder="Lot Number" />
          </div>
          <div className="col-span-5">
            <label className="block text-sm text-slate-600">Description</label>
            <input className="w-full rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm" value={l.description} onChange={(e) => {
              const next = [...lots]; next[idx].description = e.target.value; setLots(next);
            }} placeholder="Description" />
          </div>
          <div className="col-span-2 flex items-center gap-3 text-sm">
            <input type="radio" checked readOnly className="h-4 w-4 text-slate-900" />
            <span>Piano</span>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="w-full bg-white">
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

      <main className="mx-auto max-w-6xl px-4 py-12 space-y-12">
        <section className="text-center">
          <h1 className="text-3xl font-semibold">Our simple ways to bid on a piano at auction</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">Piano Auctions Ltd is a world leading specialist piano auction and is the home of buying and selling upright and grand pianos at auction.</p>
        </section>

        {/* Online card */}
        <section className="bg-amber-50 p-8 border">
          <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="relative">
              <img src={pianoImage} alt="piano auction" className="h-72 w-full object-cover" />
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.3em]">Online Bidding</p>
                <p className="mt-3 max-w-xl text-sm text-white/80">Bid for your favourite piano or watch the latest auction live with our online bidding service.</p>
                <div className="mt-6 flex flex-col gap-3 max-w-xs">
                  <button type="button" className="rounded border border-white/90 bg-white/10 px-6 py-3 text-white text-sm font-semibold">UK-BID NOW</button>
                  <button type="button" className="rounded border border-white/90 bg-white/10 px-6 py-3 text-white text-sm font-semibold">EU-BID NOW</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Telephone card with form steps */}
        <section className="bg-amber-50 p-8 border">
          <div className="max-w-4xl mx-auto bg-white p-8 border shadow-sm rounded-3xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold">Telephone Bidding</h2>
              <p className="mt-2 text-sm text-slate-600">Complete the form below and we'll arrange a telephone bidding agreement with you.</p>
            </div>

            <BiddingFormLayout title={telStep === 1 ? 'Personal details' : 'Telephone bid'}>
              {telStep === 1 ? (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setTelStep(2); }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="First Name" value={tel.first_name} onChange={(e) => setTel({ ...tel, first_name: e.target.value })} required />
                    <InputField label="Last Name" value={tel.last_name} onChange={(e) => setTel({ ...tel, last_name: e.target.value })} required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="Email" type="email" value={tel.email} onChange={(e) => setTel({ ...tel, email: e.target.value })} required />
                    <InputField label="Phone" value={tel.phone} onChange={(e) => setTel({ ...tel, phone: e.target.value })} required />
                  </div>
                  <InputField label="Address" value={tel.address} onChange={(e) => setTel({ ...tel, address: e.target.value })} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="Postcode" value={tel.postcode} onChange={(e) => setTel({ ...tel, postcode: e.target.value })} />
                    <InputField label="Country" value={tel.country} onChange={(e) => setTel({ ...tel, country: e.target.value })} />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="rounded bg-black px-8 py-3 text-sm font-semibold text-white">Next</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={submitTelephone} className="space-y-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>Personal details</span>
                    <span>Telephone Bid</span>
                  </div>
                  {renderLotsEditor(telLots, setTelLots)}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">One piano only *</span>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="telOnePiano" value="yes" checked={tel.one_piano_only === 'yes'} onChange={() => setTel({ ...tel, one_piano_only: 'yes' })} />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="telOnePiano" value="no" checked={tel.one_piano_only === 'no'} onChange={() => setTel({ ...tel, one_piano_only: 'no' })} />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <button type="button" onClick={() => setTelStep(1)} className="rounded border border-slate-900 px-8 py-3 text-sm font-semibold">Previous</button>
                    <button type="submit" className="rounded bg-black px-8 py-3 text-sm font-semibold text-white">Send</button>
                  </div>
                </form>
              )}
            </BiddingFormLayout>
          </div>
        </section>

        {/* Absentee card with form steps */}
        <section className="bg-amber-50 p-8 border">
          <div className="max-w-4xl mx-auto bg-white p-8 border shadow-sm rounded-3xl">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold">Absentee Bidding</h2>
              <p className="mt-2 text-sm text-slate-600">Complete the form below and we will submit your absentee bid for the next auction.</p>
            </div>

            <BiddingFormLayout title={absStep === 1 ? 'Personal details' : 'Absentee bid'}>
              {absStep === 1 ? (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setAbsStep(2); }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="First Name" value={abs.first_name} onChange={(e) => setAbs({ ...abs, first_name: e.target.value })} required />
                    <InputField label="Last Name" value={abs.last_name} onChange={(e) => setAbs({ ...abs, last_name: e.target.value })} required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <InputField label="Email" type="email" value={abs.email} onChange={(e) => setAbs({ ...abs, email: e.target.value })} required />
                    <InputField label="Phone" value={abs.phone} onChange={(e) => setAbs({ ...abs, phone: e.target.value })} required />
                  </div>
                  <InputField label="Address" value={abs.address} onChange={(e) => setAbs({ ...abs, address: e.target.value })} />
                  <div className="text-center">
                    <button type="submit" className="rounded bg-black px-8 py-3 text-sm font-semibold text-white">Next</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={submitAbsentee} className="space-y-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
                    <span>Personal details</span>
                    <span>Absentee Bid</span>
                  </div>
                  {renderLotsEditor(absLots, setAbsLots)}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">One piano only *</span>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="absOnePiano" value="yes" checked={abs.one_piano_only === 'yes'} onChange={() => setAbs({ ...abs, one_piano_only: 'yes' })} />
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="absOnePiano" value="no" checked={abs.one_piano_only === 'no'} onChange={() => setAbs({ ...abs, one_piano_only: 'no' })} />
                        No
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <button type="button" onClick={() => setAbsStep(1)} className="rounded border border-slate-900 px-8 py-3 text-sm font-semibold">Previous</button>
                    <button type="submit" className="rounded bg-black px-8 py-3 text-sm font-semibold text-white">Send</button>
                  </div>
                </form>
              )}
            </BiddingFormLayout>
          </div>
        </section>

        {/* Featured services section */}
        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Use our services today</p>
              <h2 className="mt-4 text-4xl font-semibold">Further Information</h2>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div className="rounded-3xl bg-slate-900 p-6 ring-1 ring-white/10">
                <img src={pianoImage} alt="Featured piano" className="h-96 w-full rounded-3xl object-cover" />
              </div>
              <div className="space-y-4">
                {featuredCards.map((card) => (
                  <button key={card.key} type="button" onClick={() => setSelectedFeatured(card.key)} className={`group flex items-start gap-4 rounded-3xl border px-6 py-5 text-left transition ${selectedFeatured === card.key ? 'border-white bg-white/10' : 'border-white/10 bg-white/5 hover:border-white/40'}`}>
                    <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        {card.button}
                        <FiChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded border border-white px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">Contact Us</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
