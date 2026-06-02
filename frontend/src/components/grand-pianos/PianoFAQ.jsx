import React, { useState } from 'react'

const FAQS = [
  {
    q: 'What Kind of Pianos Can I Buy?',
    a: 'We offer a wide selection of grand pianos, upright pianos, baby grands, and concert grands from world-renowned makers including Steinway & Sons, Bechstein, Bösendorfer, Yamaha, Kawai, Blüthner, and many more. All instruments are available at auction, often at prices well below retail.',
  },
  {
    q: 'Can I View The Pianos In The Auctions?',
    a: 'Yes. We offer scheduled viewing appointments at our premises prior to each auction. Viewing dates are published on the auction listings. We strongly encourage all potential buyers to attend in person or request a detailed condition report.',
  },
  {
    q: 'How Do I Take Part In Your Piano Auctions?',
    a: 'Simply register on our website and then register to bid for your chosen auction. You can bid online, by telephone, or by leaving an absentee bid in advance. Our team is available to assist you throughout the process.',
  },
  {
    q: 'How Will My Piano be Delivered?',
    a: 'Once you have successfully purchased a piano, we will help arrange delivery through our network of specialist piano carriers. Fill out the delivery quote form on this page to receive a personalised transport quote.',
  },
]

export default function PianoFAQ() {
  const [openIdx, setOpenIdx] = useState(null)
  const toggle = (i) => setOpenIdx((prev) => (prev === i ? null : i))

  return (
    <section className="py-16 px-6 lg:px-10 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl text-center text-gray-900 mb-8"
          style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
        >
          Frequently Asked Questions
        </h2>

        <div>
          {FAQS.map((faq, i) => (
            <div key={i} className="border-b border-gray-200">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
                aria-expanded={openIdx === i}
              >
                <span
                  className="text-sm text-gray-800 group-hover:text-gray-600 transition-colors leading-snug"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {faq.q}
                </span>
                <span className="text-gray-500 text-xl leading-none select-none flex-shrink-0 ml-4">
                  {openIdx === i ? '−' : '+'}
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: openIdx === i ? '400px' : '0' }}
              >
                <p className="text-sm text-gray-600 leading-relaxed pb-5 pr-8">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
