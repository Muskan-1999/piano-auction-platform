import React from 'react'

const TIMELINE_ITEMS = [
  {
    year: '2003',
    title: 'The Beginning',
    description:
      'Piano Auctions Ltd was established when Sean McVoy and Richard Reason with Bonhams (formerly Phillips) to start their own services. Their inaugural auction took place at Conway Hall, Holborn, in September 2003.',
  },
  {
    year: '2010',
    title: 'Shanghai Music Fair',
    description:
      'Piano Auctions Ltd exhibited at the Shanghai Music Fair, or Music China, in Asia\'s largest annual trade fair for musical instruments and accessories, held at the Shanghai New International Expo Centre. It features a diverse range of products from traditional Chinese to Western instruments, and includes educational seminars and workshops, performances by renowned musicians, and is a key platform for networking and discovering industry trends.',
  },
  {
    year: '2016',
    title: 'Edinburgh Piano Company',
    description:
      'The February 2016 auction by Piano Auctions Ltd, featuring pianos from the closing down Edinburgh Piano Company, was a staggering success, generating around £400,000 in sales with only three piano unsold. The event drew international interest from bidders in China, America and Europe.',
  },
  {
    year: '2018',
    title: 'The Colt Collection',
    description:
      'The 2018 auction of the Colt Clavier Collection, conducted by Piano Auctions Ltd, was an extraordinary Auction. Gathered within the 718 historic keyboard instruments. Notably, at 1901 Tonkinson grand piano sold for £18,000 and a 1738 Kinkorn spinet harpsichord fetched £42,000. The total proceeds from this auction reached £679,205, contributing to an overall total of £848,265 raised from the sale of the collection. The decision to auction these items followed the passing of maintaining the collection after the deaths of its founders, Charles and Barbara Colt.',
  },
  {
    year: '2019',
    title: 'The Last Auction',
    description:
      'Piano Auctions Ltd held its final auction in Central London at Conway Hall, concluding a 16-year run at this iconic venue. This marked the end of an era for the company\'s auctions in this historic location.',
  },
  {
    year: '2020',
    title: 'The Global Pandemic',
    description:
      'In March 2020, Piano Auctions Ltd was confronted with the reality of the UK\'s first national lockdown due to the global COVID-19 pandemic. This period of enforced closure, which began on March 23 and saw a gradual easing of restrictions starting in May, compelled the company to undergo a comprehensive modernisation and restructuring. In response, Piano Auctions Ltd transitioned to conducting its auctions exclusively online, adapting to the new limitations imposed by the pandemic.',
  },
  {
    year: '2020–2023',
    title: 'The Piano Boom',
    description:
      'The lockdowns triggered a significant increase in piano demand across the UK and Europe, allowing Piano Auctions Ltd sales to as the highest it has ever been. People discovered or rediscovered piano, seeking musical hobbies while confined at home, leading to a heightened interest in acquiring and playing pianos during the extended periods of isolation.',
  },
  {
    year: '2022',
    title: 'Retirement',
    description:
      'After a career spanning nearly five decades, Richard Reason retired from his role at Piano Auctions Ltd. He was succeeded by George McVoy, who took over as director. This leadership transition marked the transformation of Piano Auctions Ltd into a family-run business, ushering in a new era for the company.',
  },
  {
    year: '2023',
    title: 'Freddie Mercury',
    description:
      'Sean McVoy played a significant role as an advisor to Sotheby\'s for the auction of Freddie Mercury\'s Yamaha G2 piano. This iconic instrument fetched £1.74 million at the sale, highlighting its considerable value and the enduring legacy of Freddie Mercury in the music world.',
  },
  {
    year: '2024',
    title: 'Europe',
    description:
      'Piano Auctions Ltd expanded its operations into Europe by conducting its first auction in the Netherlands. This move marked a significant step in broadening the company\'s reach within the European market, enhancing its international presence in the world of piano auctions.',
  },
]

function TimelineItem({ item, index }) {
  const isLeft = index % 2 === 0

  return (
    <div className="relative flex items-start w-full">
      {/* Desktop alternating layout */}
      <div className="hidden md:grid w-full" style={{ gridTemplateColumns: '1fr 80px 1fr' }}>
        {/* Left card slot */}
        <div className={`py-6 pr-8 ${isLeft ? 'flex justify-end' : ''}`}>
          {isLeft && (
            <div className="max-w-sm w-full bg-white border border-gray-100 shadow-sm p-6 text-right">
              <h3
                className="text-gray-900 mb-2"
                style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', fontWeight: 500 }}
              >
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
            </div>
          )}
        </div>

        {/* Center: vertical line + year */}
        <div className="flex flex-col items-center">
          <div className="flex-1 w-px bg-gray-300" style={{ minHeight: '24px' }} />
          <div
            className="flex-shrink-0 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-2 py-1 z-10 text-center"
            style={{ fontFamily: 'Georgia, serif', minWidth: '64px' }}
          >
            {item.year}
          </div>
          <div className="flex-1 w-px bg-gray-300" style={{ minHeight: '24px' }} />
        </div>

        {/* Right card slot */}
        <div className={`py-6 pl-8 ${!isLeft ? 'flex justify-start' : ''}`}>
          {!isLeft && (
            <div className="max-w-sm w-full bg-white border border-gray-100 shadow-sm p-6">
              <h3
                className="text-gray-900 mb-2"
                style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', fontWeight: 500 }}
              >
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile single column layout */}
      <div className="md:hidden w-full flex gap-4 py-4">
        <div className="flex flex-col items-center">
          <div className="flex-shrink-0 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-2 py-1 whitespace-nowrap"
            style={{ fontFamily: 'Georgia, serif' }}>
            {item.year}
          </div>
          <div className="flex-1 w-px bg-gray-300 mt-2" />
        </div>
        <div className="flex-1 pb-4">
          <h3
            className="text-gray-900 mb-1"
            style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 500 }}
          >
            {item.title}
          </h3>
          <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default function TimelineSection() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Continuous vertical line (desktop only) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2"
            aria-hidden="true"
          />
          {TIMELINE_ITEMS.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
