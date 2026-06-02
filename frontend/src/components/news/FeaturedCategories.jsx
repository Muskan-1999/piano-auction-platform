import React from 'react'

const CATEGORIES = [
  {
    key: 'auction-tips',
    label: 'Auction Tips',
    description:
      'Expert guidance on how to participate in piano auctions, from registration to placing your first bid.',
    image: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&q=80',
    link: 'View Auction Tips',
  },
  {
    key: 'piano-guides',
    label: 'Piano Guides',
    description:
      'In-depth guides covering piano types, brands, maintenance, and what to look for when buying at auction.',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
    link: 'View Piano Guides',
  },
  {
    key: 'piano-brands',
    label: 'Piano Brands',
    description:
      'Discover the world\'s finest piano makers — from Steinway & Sons and Bösendorfer to Yamaha and Kawai.',
    image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&q=80',
    link: 'View Piano Brands',
  },
]

export default function FeaturedCategories({ onCategoryClick }) {
  return (
    <section className="py-16 px-6 lg:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-center text-gray-900 mb-10"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            fontWeight: 400,
          }}
        >
          Featured Categories
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => onCategoryClick && onCategoryClick(cat.key)}
              className="group relative overflow-hidden text-left focus:outline-none"
              style={{ minHeight: '280px' }}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-colors" />
              <div className="relative z-10 p-7 flex flex-col h-full" style={{ minHeight: '280px' }}>
                <h3
                  className="text-white mb-3"
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '1.4rem',
                    fontWeight: 400,
                  }}
                >
                  {cat.label}
                </h3>
                <p className="text-white/75 text-xs leading-relaxed mb-6 flex-1">
                  {cat.description}
                </p>
                <span className="text-white text-xs font-semibold underline underline-offset-4 hover:text-white/80 transition-colors">
                  {cat.link}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
