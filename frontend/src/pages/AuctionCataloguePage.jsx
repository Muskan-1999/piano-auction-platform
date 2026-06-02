import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import CatalogueHero from '../components/auction-catalogue/CatalogueHero'
import CatalogueCtaStrip from '../components/auction-catalogue/CatalogueCtaStrip'
import CatalogueLotGrid from '../components/auction-catalogue/CatalogueLotGrid'
import CatalogueAvailableSoon from '../components/auction-catalogue/CatalogueAvailableSoon'
import BrandsStrip from '../components/auction-catalogue/BrandsStrip'

export default function AuctionCataloguePage() {
  const [auction, setAuction] = useState(undefined) // undefined = not yet fetched
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    document.title = 'Auction Catalogue | Piano Auctions Ltd'

    api
      .get('auctions/upcoming')
      .then((res) => {
        // API returns { auction: null, message } when none found,
        // or the full auction object directly
        if (res.data && res.data.auction === null) {
          setAuction(null)
        } else {
          setAuction(res.data)
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const noAuction = !loading && !error && auction === null

  return (
    <div className="w-full bg-white">
      {/* Hero is always visible — pass catalogue_pdf for the download button */}
      <CatalogueHero cataloguePdfUrl={auction?.catalogue_pdf ?? null} />

      {/* CTA strip */}
      <CatalogueCtaStrip />

      {/* Error state */}
      {error && (
        <section className="py-24 px-6 text-center">
          <p className="text-gray-500 text-sm">
            Unable to load catalogue. Please try again later.
          </p>
        </section>
      )}

      {/* Catalogue available soon */}
      {noAuction && <CatalogueAvailableSoon />}

      {/* Lot grid (also renders skeleton while loading) */}
      {!error && !noAuction && (
        <CatalogueLotGrid auction={auction} loading={loading} />
      )}

      {/* Brand strip */}
      <BrandsStrip />
    </div>
  )
}
