import React, { useEffect } from 'react'
import GuideHero from '../components/guides/GuideHero'
import GuideFeatures from '../components/guides/GuideFeatures'
import GuideDownloads from '../components/guides/GuideDownloads'
import FurtherInformation from '../components/about/FurtherInformation'

export default function BeginnersAuctionGuidePage() {
  useEffect(() => {
    document.title = 'Beginner Auction Guide | Piano Auctions Ltd'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Download our beginner piano auction guide and learn how to buy a piano safely and confidently at auction.'
      )
    }
  }, [])

  return (
    <div className="w-full">
      <GuideHero />
      <GuideFeatures />
      <GuideDownloads />
      <FurtherInformation />
    </div>
  )
}
