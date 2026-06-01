import React from 'react'
import { Link } from 'react-router-dom'

export default function Catalogue() {
  return (
    <div className="w-full bg-slate-50 text-slate-900">
      <section className="relative min-h-[420px] bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=1600&q=80)' }}>
        <div className="absolute inset-0 bg-slate-950/70"></div>
        <div className="relative mx-auto flex min-h-[420px] max-w-6xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-300">Catalogue</p>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl">Auction Catalogue</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">Browse our current piano auction listings and find your perfect upright or grand piano.</p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-white p-10 shadow-sm">
          <h2 className="text-3xl font-semibold text-slate-950">Live Auction Lots</h2>
          <p className="mt-4 text-slate-600">This page shows a placeholder catalogue. Replace it with your live auction items and search filters.</p>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {['Grand Piano', 'Upright Piano', 'Digital Piano', 'Vintage Piano', 'Workshop Piano', 'Collector Piano'].map((item) => (
              <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <div className="h-48 overflow-hidden rounded-3xl bg-slate-200"></div>
                <h3 className="mt-5 text-xl font-semibold text-slate-950">{item}</h3>
                <p className="mt-3 text-sm text-slate-600">Sample auction description for {item}. Bidding starts at competitive prices.</p>
                <Link to="/bidding" className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-black">
                  Bid Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
