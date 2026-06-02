import React, { useRef, useEffect } from 'react'
import DeliveryHero from '../components/delivery/DeliveryHero'
import DeliveryIntro from '../components/delivery/DeliveryIntro'
import DeliveryPartners from '../components/delivery/DeliveryPartners'
import DeliveryQuoteSection from '../components/delivery/DeliveryQuoteSection'
import FaqFurtherInformation from '../components/faq/FurtherInformation'

export default function DeliveryPage() {
  const quoteRef = useRef(null)

  useEffect(() => {
    document.title = 'Delivery | Piano Auctions Ltd'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Arrange piano collection and delivery through our trusted piano transport partners and request a delivery quote online.'
      )
    }
  }, [])

  const scrollToQuote = () => {
    quoteRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="w-full">
      <DeliveryHero />
      <DeliveryIntro onQuoteClick={scrollToQuote} />
      <DeliveryPartners />
      <DeliveryQuoteSection sectionRef={quoteRef} />
      <FaqFurtherInformation />
    </div>
  )
}
