import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import FeaturedCategories from '../components/news/FeaturedCategories'
import BlogGrid from '../components/news/BlogGrid'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80'

const QUICK_LINKS = [
  { label: 'Auction Tips', key: 'auction-tips' },
  { label: 'Piano Guides', key: 'piano-guides' },
  { label: 'Piano Brands', key: 'piano-brands' },
]

export default function NewsInsightPage() {
  const [blogs, setBlogs]               = useState([])
  const [loading, setLoading]           = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    setLoading(true)
    const params = activeCategory ? { category: activeCategory } : {}
    api
      .get('blogs', { params })
      .then((r) => setBlogs(r.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false))
  }, [activeCategory])

  const handleCategoryClick = (key) => {
    setActiveCategory((prev) => (prev === key ? null : key))
  }

  return (
    <div className="w-full bg-white">
      {/* ── HERO ── */}
      <section
        className="relative flex items-end bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})`, minHeight: '380px' }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-10 py-14">
          <nav className="mb-3 text-xs text-white/60 flex items-center gap-1">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-1">&rsaquo;</span>
            <span className="text-white/80">Piano News &amp; Insights</span>
          </nav>
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400 mb-2">
            BLOG &amp; NEWS
          </p>
          <h1
            className="text-white leading-tight mb-4"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 400,
            }}
          >
            Piano News &amp; Insights
          </h1>
          <p className="text-white/75 text-sm leading-relaxed max-w-lg mb-5">
            Buy your piano at auction with our trusted experts. We have a full range of piano brands
            to buy, view our latest piano auction catalogue.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {QUICK_LINKS.map((ql) => (
              <button
                key={ql.key}
                onClick={() => handleCategoryClick(ql.key)}
                className="text-xs text-white/80 hover:text-white underline underline-offset-2 transition-colors"
              >
                {ql.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <FeaturedCategories onCategoryClick={handleCategoryClick} />

      {/* ── BLOG GRID ── */}
      <BlogGrid
        blogs={blogs}
        loading={loading}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
    </div>
  )
}
