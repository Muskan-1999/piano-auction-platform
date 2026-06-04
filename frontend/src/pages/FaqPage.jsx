import React from 'react'
import FaqSection from '../components/faq/FaqSection'
import FaqFurtherInformation from '../components/faq/FurtherInformation'
import { useLanguage } from '../contexts/LanguageContext'

export default function FaqPage() {
  const { t } = useLanguage()

  return (
    <div className="w-full">
      <FaqSection title={t('faq.generalTitle')} items={t('faq.generalFaqs')} background="white" />
      <FaqSection title={t('faq.buyingTitle')} items={t('faq.buyingFaqs')} background="cream" />
      <FaqSection title={t('faq.sellingTitle')} items={t('faq.sellingFaqs')} background="white" />
      <FaqFurtherInformation />
    </div>
  )
}
