import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import AuctionCard from './AuctionCard'
import AuctionSkeleton from './AuctionSkeleton'

export default function AuctionCarousel({ auctions, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <AuctionSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!auctions || auctions.length === 0) {
    return (
      <div className="text-center py-20">
        <p
          className="text-gray-500 text-base"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          No upcoming auctions currently available.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Please check back soon for new auction dates.
        </p>
      </div>
    )
  }

  const canLoop = auctions.length > 3

  return (
    <div className="auction-calendar-swiper relative px-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={canLoop}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="!pb-12"
      >
        {auctions.map((auction) => (
          <SwiperSlide key={auction.id} className="h-auto">
            <AuctionCard auction={auction} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .auction-calendar-swiper .swiper-button-prev,
        .auction-calendar-swiper .swiper-button-next {
          color: #111827;
          width: 36px;
          height: 36px;
        }
        .auction-calendar-swiper .swiper-button-prev::after,
        .auction-calendar-swiper .swiper-button-next::after {
          font-size: 18px;
          font-weight: 700;
        }
        .auction-calendar-swiper .swiper-button-prev {
          left: 0;
        }
        .auction-calendar-swiper .swiper-button-next {
          right: 0;
        }
        .auction-calendar-swiper .swiper-pagination-bullet {
          background: #9ca3af;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .auction-calendar-swiper .swiper-pagination-bullet-active {
          background: #111827;
        }
        .auction-calendar-swiper .swiper-button-disabled {
          opacity: 0.3;
        }
      `}</style>
    </div>
  )
}
