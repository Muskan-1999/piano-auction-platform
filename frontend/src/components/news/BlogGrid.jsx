import React from 'react'
import BlogCard from './BlogCard'

export default function BlogGrid({ blogs, loading, activeCategory, onCategoryClick }) {
  const CATEGORY_LABELS = {
    'auction-tips': 'Auction Tips',
    'piano-guides': 'Piano Guides',
    'piano-brands': 'Piano Brands',
  }

  return (
    <section className="py-16 px-6 lg:px-10" style={{ backgroundColor: '#f5ede4' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h2
            className="text-gray-900"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 400,
            }}
          >
            Latest Insights
          </h2>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onCategoryClick(null)}
              className={`text-xs px-4 py-1.5 border transition-colors ${
                !activeCategory
                  ? 'bg-black text-white border-black'
                  : 'border-gray-400 text-gray-700 hover:border-black hover:text-black'
              }`}
            >
              All
            </button>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onCategoryClick(key)}
                className={`text-xs px-4 py-1.5 border transition-colors ${
                  activeCategory === key
                    ? 'bg-black text-white border-black'
                    : 'border-gray-400 text-gray-700 hover:border-black hover:text-black'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-sm">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
