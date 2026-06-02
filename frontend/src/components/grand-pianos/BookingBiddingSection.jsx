import React from 'react'
import { Link } from 'react-router-dom'

export default function BookingBiddingSection() {
  return (
    <section id="booking-bidding" className="py-16 px-6 lg:px-10 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* ── Card 1: Book Your Appointment ── */}
          <div className="flex flex-col">
            {/* Badge above card */}
            <div className="flex justify-center mb-5">
              <span className="inline-block bg-purple-600 text-white text-[11px] font-semibold px-4 py-1.5 uppercase tracking-widest">
                PIANO VIEWING APPOINTMENTS
              </span>
            </div>

            {/* Card — fills remaining height */}
            <div className="flex-1 border-2 border-gray-200 p-7 flex flex-col">
              <h3
                className="text-2xl text-gray-900 mb-3"
                style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
              >
                Book Your Appointment
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Book your viewing appointment, play our pianos for sale to find your perfect one
                before buying a piano at auction.
              </p>

              {/* Options — pushed to bottom on tall cards */}
              <div className="mt-auto space-y-3">
                <div className="flex items-start gap-3 p-4 border border-gray-100 hover:border-purple-200 hover:bg-purple-50/40 transition-colors cursor-pointer group">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 flex items-center gap-1">
                      🇪🇺 EU Auction View <span className="text-gray-400 font-normal">›</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Our Auction Views June TBC – EU / (TBC) Auction. PLEASE MAKE SURE YOU HAVE
                      READ THE INFORMATION REGARDING VIEWING DAYS ABOVE. Booking Fees...
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors cursor-pointer group">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 flex items-center gap-1">
                      🇬🇧 UK Auction View <span className="text-gray-400 font-normal">›</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      Our Auction Views June 19th – UK / (22nd June 2026) – UK (22nd June).
                      Auction. PLEASE MAKE SURE YOU HAVE READ THE INFORMATION REGARDING VIEWING
                      DAYS ABOVE. Booking Fees...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 2: Register To Bid ── */}
          <div className="flex flex-col">
            {/* Badge above card */}
            <div className="flex justify-center mb-5">
              <span className="inline-block bg-blue-600 text-white text-[11px] font-semibold px-4 py-1.5 uppercase tracking-widest">
                ONLINE BIDDING
              </span>
            </div>

            {/* Card — fills remaining height */}
            <div className="flex-1 border-2 border-gray-200 p-7 flex flex-col">
              <h3
                className="text-2xl text-gray-900 mb-3"
                style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
              >
                Register To Bid
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Bid for your favourite piano or watch the latest auction live with
                easyliveauction.com
              </p>

              {/* Buttons — pushed to bottom */}
              <div className="mt-auto space-y-3">
                <Link
                  to="/auction-portal"
                  className="flex items-center justify-center gap-2 w-full border-2 border-gray-300 text-gray-800 text-sm py-3.5 px-4 hover:bg-gray-50 hover:border-gray-500 transition-colors font-semibold tracking-wide"
                >
                  🇬🇧 UK – BID NOW
                </Link>
                <Link
                  to="/bidding"
                  className="flex items-center justify-center w-full border-2 border-gray-300 text-gray-800 text-sm py-3.5 px-4 hover:bg-gray-50 hover:border-gray-500 transition-colors font-semibold tracking-wide"
                >
                  OTHER WAYS TO BID
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
