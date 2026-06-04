import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'

const FOOTER_IMAGES = [
  'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80',
  'https://images.unsplash.com/photo-1552422535-c45813c61732?w=400&q=80',
  'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=400&q=80',
  'https://images.unsplash.com/photo-1543443258-92b04ad5ec6b?w=400&q=80',
  'https://images.unsplash.com/photo-1444084316824-dc26d6657664?w=400&q=80',
  'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&q=80',
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const footerLinks = [
    {
      title: t('footer.auctions'),
      links: [
        { label: t('footer.buyingAPiano'),   href: '/auctions' },
        { label: t('footer.sellingAPiano'),  href: '/absentee-bid' },
        { label: t('footer.pianoCatalogues'),href: '/lots' },
        { label: t('footer.beginnersGuide'), href: '#' },
        { label: t('footer.bidding'),        href: '#' },
      ],
    },
    {
      title: t('footer.about'),
      links: [
        { label: t('footer.aboutUs'),       href: '/about' },
        { label: t('footer.newsInsights'),  href: '/news-insight' },
        { label: t('footer.deliveries'),    href: '#' },
        { label: t('footer.appointments'),  href: '/viewing-appointments' },
        { label: t('footer.faqs'),          href: '/faq' },
      ],
    },
    {
      title: t('footer.featuredBrands'),
      links: [
        { label: 'Yamaha',           href: '#' },
        { label: 'Steingraeber',     href: '#' },
        { label: 'Schimmel',         href: '#' },
        { label: 'Kawai',            href: '#' },
        { label: 'Petrof',           href: '#' },
        { label: 'Steinway and Sons',href: '#' },
        { label: 'Sauter',           href: '#' },
      ],
    },
  ]

  return (
    <footer className="w-full max-w-none px-0 mx-0 bg-gray-950 text-gray-300">
      <div className="w-full overflow-hidden border-b border-gray-900">
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-8">
          {FOOTER_IMAGES.map((src, index) => (
            <div key={src} className="h-[120px] w-full overflow-hidden bg-gray-900">
              <img
                src={src}
                alt={`Piano ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-none px-0 mx-0 py-12">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-5">
              <div className="text-2xl font-semibold text-white">Piano Auctions Ltd</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <FaFacebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <FaInstagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <FaLinkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="text-white text-base font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="text-gray-400 hover:text-white transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-gray-900 pt-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-gray-500 text-sm">
                © {currentYear} Piano Auctions Ltd. All rights reserved.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <a href="#" className="text-sm hover:text-white transition-colors">{t('footer.terms')}</a>
                <a href="#" className="text-sm hover:text-white transition-colors">{t('footer.cookie')}</a>
                <a href="#" className="text-sm hover:text-white transition-colors">{t('footer.privacy')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
