import React from 'react'
import LotCard from './LotCard'

const FEATURED_LOTS = [
  {
    id: 1,
    title: 'Steinway & Sons Model D Concert Grand',
    slug: 'steinway-model-d-concert',
    type: 'Grand Piano',
    description: '9-foot concert grand piano, recently restored, excellent condition',
    status: 'LIVE',
    image_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop',
    starting_price: 45000,
    current_bid: 52500,
    lot_end_date: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
  {
    id: 2,
    title: 'Bösendorfer Imperial Model 290',
    slug: 'bosendorfer-imperial-290',
    type: 'Grand Piano',
    description: 'Premium Austrian-made grand piano with exceptional tone',
    status: 'LIVE',
    image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop',
    starting_price: 55000,
    current_bid: 61000,
    lot_end_date: new Date(Date.now() + 1 * 60 * 60 * 1000),
  },
  {
    id: 3,
    title: 'Yamaha CFX Concert Grand',
    slug: 'yamaha-cfx-concert',
    type: 'Grand Piano',
    description: 'World-renowned concert grand with powerful resonance',
    status: 'LIVE',
    image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop',
    starting_price: 50000,
    current_bid: 55750,
    lot_end_date: new Date(Date.now() + 3 * 60 * 60 * 1000),
  },
  {
    id: 4,
    title: 'Fazioli F308 Grand Piano',
    slug: 'fazioli-f308-grand',
    type: 'Grand Piano',
    description: 'Exceptional Italian craftsmanship, museum quality',
    status: 'LIVE',
    image_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
    starting_price: 60000,
    current_bid: 68900,
    lot_end_date: new Date(Date.now() + 4 * 60 * 60 * 1000),
  },
  {
    id: 5,
    title: 'Kawai SK-EX Concert Grand',
    slug: 'kawai-sk-ex-concert',
    type: 'Grand Piano',
    description: 'Japanese precision with world-class tone',
    status: 'LIVE',
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
    starting_price: 42000,
    current_bid: 48300,
    lot_end_date: new Date(Date.now() + 5 * 60 * 60 * 1000),
  },
  {
    id: 6,
    title: 'Steinway Model M Professional',
    slug: 'steinway-model-m-professional',
    type: 'Grand Piano',
    description: 'Classic Steinway model, perfect for professionals',
    status: 'LIVE',
    image_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop',
    starting_price: 35000,
    current_bid: 41200,
    lot_end_date: new Date(Date.now() + 2.5 * 60 * 60 * 1000),
  },
]

export default function FeaturedLotsSection() {
  return (
    <section className="w-full max-w-none px-0 mx-0 py-16 md:py-24 bg-white">
      <div className="w-full px-0 mx-0">
        <div className="text-center mb-12">
          <p className="text-luxury-500 font-semibold tracking-widest uppercase text-sm mb-2">Available Now</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Piano Lots
          </h2>
          <p className="text-lg text-gray-600">
            Bid on our most sought-after pianos from the world's finest makers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_LOTS.map((lot) => (
            <LotCard key={lot.id} lot={lot} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/lots"
            className="inline-block bg-luxury-500 hover:bg-luxury-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Browse All Lots →
          </a>
        </div>
      </div>
    </section>
  )
}
