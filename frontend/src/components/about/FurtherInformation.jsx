import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../contexts/LanguageContext'

const CARD_HREFS = ['/buying-piano', '/sell-my-piano', '/value-my-piano']
const CARD_IMAGES = [
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=600&q=80',
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80',
  'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80',
]

export default function FurtherInformation() {
  const { t } = useLanguage()
  const cards = t('about.furtherCards')

  return (
    <section className="py-20 px-6 lg:px-10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40 mb-3">
            {t('about.furtherServicesLabel')}
          </p>
          <h2 className="text-white"
            style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 400 }}>
            {t('about.furtherServicesTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {cards.map((card, i) => (
            <div key={card.title}
              className="group flex flex-col bg-black border border-white/10 hover:border-white/30 transition-colors">
              <div className="overflow-hidden">
                <img src={CARD_IMAGES[i]} alt={card.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-white mb-3"
                  style={{ fontFamily: 'Georgia, serif', fontSize: '1.15rem', fontWeight: 400 }}>
                  {card.title}
                </h3>
                <p className="text-white/60 text-xs leading-relaxed mb-6 flex-1">{card.description}</p>
                <Link to={CARD_HREFS[i]}
                  className="inline-block border border-white/50 text-white text-xs font-semibold tracking-wider uppercase py-2.5 px-5 text-center hover:bg-white hover:text-black transition-colors">
                  {card.link}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
