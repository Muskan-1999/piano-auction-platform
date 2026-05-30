import React, { useState, useEffect } from 'react'
import AuctionCard from './AuctionCard'

const FEATURED_AUCTIONS = [
  {
    id: 1,
    title: 'Steinway Grand Piano Collection - London',
    slug: 'steinway-grand-collection-london',
    location: 'London, UK',
    status: 'Active',
    image_url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    starts_at: new Date(),
    ends_at: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    lots: Array(12).fill(null),
  },
  {
    id: 2,
    title: 'Bösendorfer Imperial Collection - Vienna',
    slug: 'bosendorfer-imperial-vienna',
    location: 'Vienna, Austria',
    status: 'Upcoming',
    image_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
    starts_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ends_at: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    lots: Array(8).fill(null),
  },
  {
    id: 3,
    title: 'Yamaha Concert Grand Selection',
    slug: 'yamaha-concert-grand-selection',
    location: 'Tokyo, Japan',
    status: 'Active',
    image_url: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=300&fit=crop',
    starts_at: new Date(),
    ends_at: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    lots: Array(15).fill(null),
  },
  {
    id: 4,
    title: 'Fazioli Limited Edition Pianos',
    slug: 'fazioli-limited-edition',
    location: 'Rome, Italy',
    status: 'Upcoming',
    image_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
    starts_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    ends_at: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000),
    lots: Array(6).fill(null),
  },
]

export default function FeaturedAuctionsSection() {
  return (
    <section className="w-full max-w-none px-0 mx-0 py-16 md:py-24 bg-white">
      <div className="w-full px-0 mx-0">
        <div className="text-center mb-12">
          <p className="text-luxury-500 font-semibold tracking-widest uppercase text-sm mb-2">Featured Collections</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Premium Auctions
          </h2>
          <p className="text-lg text-gray-600">
            Explore our curated selection of exceptional pianos and collections from renowned makers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_AUCTIONS.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/auctions"
            className="inline-block bg-luxury-500 hover:bg-luxury-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            View All Auctions →
          </a>
        </div>
      </div>
    </section>
  )
}
