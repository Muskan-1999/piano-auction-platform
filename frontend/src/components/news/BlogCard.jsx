import React from 'react'
import { Link } from 'react-router-dom'

const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80'

export default function BlogCard({ blog }) {
  return (
    <article className="bg-white border border-gray-200 flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/news-insight/${blog.slug}`} className="block overflow-hidden">
        <img
          src={blog.featured_image || PLACEHOLDER_IMAGE}
          alt={blog.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="flex flex-col flex-1 p-5">
        <Link to={`/news-insight/${blog.slug}`}>
          <h3
            className="text-gray-900 mb-2 hover:text-gray-600 transition-colors line-clamp-2"
            style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 500 }}
          >
            {blog.title}
          </h3>
        </Link>
        {blog.excerpt && (
          <p className="text-gray-500 text-xs leading-relaxed mb-4 flex-1 line-clamp-3">
            {blog.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <Link
            to={`/news-insight/${blog.slug}`}
            className="text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors underline underline-offset-2"
          >
            Read More
          </Link>
          {blog.published_at && (
            <span className="text-xs text-gray-400">{blog.published_at}</span>
          )}
        </div>
      </div>
    </article>
  )
}
