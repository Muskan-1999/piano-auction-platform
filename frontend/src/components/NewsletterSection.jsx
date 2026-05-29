import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    setLoading(true)
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Successfully subscribed to our newsletter!')
      setEmail('')
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-16 md:py-24 bg-luxury-900 w-full">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-luxury-100 mb-8">
            Subscribe to receive updates on upcoming auctions, special collections, and exclusive bidding opportunities
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-400 text-gray-900"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-luxury-500 hover:bg-luxury-600 disabled:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 whitespace-nowrap"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <p className="text-sm text-luxury-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Social links */}
        <div className="mt-16 pt-8 border-t border-white/20 text-center">
          <p className="text-luxury-200 mb-4">Follow us on social media</p>
          <div className="flex gap-6 justify-center">
            <a href="#" className="text-white hover:text-luxury-300 transition-colors">
              <span className="text-2xl">f</span>
            </a>
            <a href="#" className="text-white hover:text-luxury-300 transition-colors">
              <span className="text-2xl">𝕏</span>
            </a>
            <a href="#" className="text-white hover:text-luxury-300 transition-colors">
              <span className="text-2xl">📷</span>
            </a>
            <a href="#" className="text-white hover:text-luxury-300 transition-colors">
              <span className="text-2xl">▶</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
