import React from 'react'

const FEATURES = [
  {
    icon: '🎯',
    title: 'Expert Authentication',
    description: 'Every piano is verified by certified experts with decades of experience',
  },
  {
    icon: '🌍',
    title: 'Global Access',
    description: 'Bid from anywhere in the world with secure online bidding platform',
  },
  {
    icon: '💎',
    title: 'Premium Selection',
    description: 'Only the finest pianos from distinguished collections and estates',
  },
  {
    icon: '📱',
    title: 'Live Bidding',
    description: 'Real-time auction experience with professional video streaming',
  },
  {
    icon: '🚚',
    title: 'Shipping Services',
    description: 'Professional delivery and installation worldwide available',
  },
  {
    icon: '🏆',
    title: '25+ Years',
    description: 'Trusted by collectors, musicians, and institutions globally',
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-luxury-50 to-luxury-100 w-full">
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-luxury-500 font-semibold tracking-widest uppercase text-sm mb-2">Why Choose Us</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Premier Piano Auction Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Trusted by musicians, collectors, and institutions for uncompromising quality and integrity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-white rounded-lg p-8 md:p-12 shadow-luxury text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4 text-luxury-500">"</div>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              I've been bidding at premier piano auctions for 15 years, and this platform offers the finest
              selection and most transparent process I've encountered. Highly recommended.
            </p>
            <p className="font-bold text-gray-900">- James Richardson</p>
            <p className="text-gray-600 text-sm">Concert Pianist & Collector</p>
          </div>
        </div>
      </div>
    </section>
  )
}
