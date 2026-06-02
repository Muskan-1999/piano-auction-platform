import React, { useEffect } from 'react'
import ViewingHero from '../components/viewing-appointments/ViewingHero'
import BookingWidget from '../components/viewing-appointments/BookingWidget'
import AuctionCalendarSection from '../components/viewing-appointments/AuctionCalendarSection'
import AuctionLocationSection from '../components/viewing-appointments/AuctionLocationSection'
import BrandsCarousel from '../components/viewing-appointments/BrandsCarousel'

export default function ViewingAppointmentsPage() {
  useEffect(() => {
    document.title = 'Viewing Appointments | Piano Auctions Ltd'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Book your piano viewing appointment with Piano Auctions Ltd before our upcoming auction.'
      )
    }
  }, [])

  return (
    <div className="w-full">
      <ViewingHero />
      <BookingWidget />
      <AuctionCalendarSection />
      <AuctionLocationSection />
      <BrandsCarousel />
    </div>
  )
}
