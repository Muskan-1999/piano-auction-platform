import React from 'react'
import HeroBanner from '../components/about/HeroBanner'
import CompanyHistory from '../components/about/CompanyHistory'
import TimelineSection from '../components/about/TimelineSection'
import FurtherInformation from '../components/about/FurtherInformation'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'About' },
]

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <HeroBanner
        image={HERO_IMAGE}
        breadcrumb={BREADCRUMB}
        label="PIANO AUCTIONS LTD"
        title="About Our Auctions"
      />
      <CompanyHistory />
      <TimelineSection />
      <FurtherInformation />
    </div>
  )
}
