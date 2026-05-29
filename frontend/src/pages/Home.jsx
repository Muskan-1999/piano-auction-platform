import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedAuctionsSection from '../components/FeaturedAuctionsSection'
import LiveAuctionsSection from '../components/LiveAuctionsSection'
import FeaturedLotsSection from '../components/FeaturedLotsSection'
import WhyChooseUsSection from '../components/WhyChooseUsSection'
import NewsletterSection from '../components/NewsletterSection'

export default function Home() {
  return (
    <div className="bg-white">
      <HeroSection />
      <FeaturedAuctionsSection />
      <LiveAuctionsSection />
      <FeaturedLotsSection />
      <WhyChooseUsSection />
      <NewsletterSection />
    </div>
  )
}
