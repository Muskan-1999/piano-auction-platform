import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const ICONS = ['🎯', '🌍', '💎', '📱', '🚚', '🏆']

export default function WhyChooseUsSection() {
  const { t } = useLanguage()
  const features = t('whyChooseUs.features')

  return (
    <section className="w-full max-w-none px-0 mx-0 py-16 md:py-24 bg-gradient-to-r from-luxury-50 to-luxury-100">
      <div className="w-full px-0 mx-0">
        <div className="text-center mb-16">
          <p className="text-luxury-500 font-semibold tracking-widest uppercase text-sm mb-2">
            {t('whyChooseUs.sectionLabel')}
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('whyChooseUs.heading')}
          </h2>
          <p className="text-lg text-gray-600">{t('whyChooseUs.subheading')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{ICONS[index]}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg p-8 md:p-12 shadow-luxury text-center">
          <div className="w-full">
            <div className="text-5xl mb-4 text-luxury-500">"</div>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              {t('whyChooseUs.testimonialQuote')}
            </p>
            <p className="font-bold text-gray-900">{t('whyChooseUs.testimonialName')}</p>
            <p className="text-gray-600 text-sm">{t('whyChooseUs.testimonialRole')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
