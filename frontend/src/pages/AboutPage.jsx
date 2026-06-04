import React from 'react'
import HeroBanner from '../components/about/HeroBanner'
import CompanyHistory from '../components/about/CompanyHistory'
import TimelineSection from '../components/about/TimelineSection'
import FurtherInformation from '../components/about/FurtherInformation'
import { useLanguage } from '../contexts/LanguageContext'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1600&q=80'

export default function AboutPage() {
  const { t } = useLanguage()

  const breadcrumb = [
    { label: t('about.breadcrumbHome'), href: '/' },
    { label: t('about.breadcrumbAbout') },
  ]

  return (
    <div className="w-full bg-white">
      <HeroBanner
        image={HERO_IMAGE}
        breadcrumb={breadcrumb}
        label={t('about.label')}
        title={t('about.title')}
      />
      <CompanyHistory />
      <TimelineSection />
      <FurtherInformation />
    </div>
  )
}
