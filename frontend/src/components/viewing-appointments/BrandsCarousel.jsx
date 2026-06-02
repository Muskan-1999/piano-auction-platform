import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const BRANDS = [
  { name: 'Fazioli',      style: { letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 300 } },
  { name: 'Essex',        style: { fontStyle: 'italic', fontWeight: 400 } },
  { name: 'Boston',       style: { fontStyle: 'italic', fontWeight: 400 } },
  { name: 'Bösendorfer',  style: { fontWeight: 400, letterSpacing: '0.02em' } },
  { name: 'Blüthner',     style: { fontStyle: 'italic', fontWeight: 400 } },
  { name: 'Steinway',     style: { fontWeight: 400, letterSpacing: '0.03em' } },
  { name: 'Yamaha',       style: { fontWeight: 300, letterSpacing: '0.08em', textTransform: 'uppercase' } },
  { name: 'C. Bechstein', style: { fontWeight: 400, letterSpacing: '0.01em' } },
]

export default function BrandsCarousel() {
  return (
    <section className="py-16 px-6 lg:px-8 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-[0.3em] text-amber-600 mb-3">
            Brands at Auction
          </p>
          <h2
            className="text-gray-900"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
              fontWeight: 400,
            }}
          >
            Pianos We Sell
          </h2>
        </div>

        <div className="brands-viewing-swiper relative px-10">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={32}
            slidesPerView={2}
            navigation
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              640:  { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="!pb-10"
          >
            {BRANDS.map(brand => (
              <SwiperSlide key={brand.name} className="flex items-center justify-center">
                <div className="flex items-center justify-center h-16 px-4">
                  <span
                    className="text-gray-700 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default select-none whitespace-nowrap"
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                      ...brand.style,
                    }}
                  >
                    {brand.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style>{`
            .brands-viewing-swiper .swiper-button-prev,
            .brands-viewing-swiper .swiper-button-next {
              color: #111827;
              width: 28px;
              height: 28px;
            }
            .brands-viewing-swiper .swiper-button-prev::after,
            .brands-viewing-swiper .swiper-button-next::after {
              font-size: 14px;
              font-weight: 700;
            }
            .brands-viewing-swiper .swiper-button-prev { left: 0; }
            .brands-viewing-swiper .swiper-button-next { right: 0; }
            .brands-viewing-swiper .swiper-pagination-bullet {
              background: #9ca3af; opacity: 1; width: 6px; height: 6px;
            }
            .brands-viewing-swiper .swiper-pagination-bullet-active {
              background: #111827;
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
