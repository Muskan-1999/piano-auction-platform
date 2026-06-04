import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const { t } = useLanguage()

  const navLink = (href) =>
    `block px-4 py-2 text-sm transition-colors ${
      pathname === href
        ? 'bg-gray-900 text-white font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`

  const mobileNavLink = (href) =>
    `block px-3 py-2 rounded text-sm transition-colors ${
      pathname === href
        ? 'bg-gray-900 text-white font-semibold'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    }`

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full max-w-none px-0 mx-0">
        <div className="flex items-center justify-between gap-4 py-4 px-4 md:px-6 lg:px-8">
          <Link to="/" className="flex-shrink-0">
            <div className="flex flex-col">
              <div className="text-xl font-serif font-bold text-gray-900">
                🎹 Piano Auctions Ltd
              </div>
              <div className="text-xs text-gray-600 tracking-wide">
                {t('nav.tagline')}
              </div>
            </div>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">
              {t('nav.home')}
            </Link>

            <div className="group relative">
              <Link to="/buying-piano" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">
                {t('nav.buyAPiano')}
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-3 overflow-hidden">
                <Link to="/shop/upright-pianos" className={navLink('/shop/upright-pianos')}>{t('nav.uprightPianos')}</Link>
                <Link to="/shop/grand-pianos"   className={navLink('/shop/grand-pianos')}>{t('nav.grandPianos')}</Link>
                <Link to="/piano-brands"        className={navLink('/piano-brands')}>{t('nav.pianoBrands')}</Link>
              </div>
            </div>

            <Link to="/sell-my-piano"  className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">{t('nav.sellMyPiano')}</Link>
            <Link to="/value-my-piano" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">{t('nav.valueMyPiano')}</Link>

            <div className="group relative">
              <span className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors cursor-default">
                {t('nav.ourAuctions')}
              </span>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-64 rounded-xl border border-gray-200 bg-white shadow-xl py-3 overflow-hidden">
                <Link to="/auction-catalogue"       className={navLink('/auction-catalogue')}>{t('nav.auctionCatalogue')}</Link>
                <Link to="/auction-calendar"        className={navLink('/auction-calendar')}>{t('nav.auctionCalendar')}</Link>
                <Link to="/viewing-appointments"    className={navLink('/viewing-appointments')}>{t('nav.viewingAppointments')}</Link>
                <Link to="/beginners-auction-guide" className={navLink('/beginners-auction-guide')}>{t('nav.beginnersAuctionGuide')}</Link>
                <Link to="/bidding"                 className={navLink('/bidding')}>{t('nav.bidding')}</Link>
                <Link to="/delivery"                className={navLink('/delivery')}>{t('nav.delivery')}</Link>
              </div>
            </div>

            <div className="group relative">
              <Link to="/about" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">
                {t('nav.about')}
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-48 rounded-xl border border-gray-200 bg-white shadow-xl py-3 overflow-hidden">
                <Link to="/news-insight" className={navLink('/news-insight')}>{t('nav.newsInsights')}</Link>
                <Link to="/faq"          className={navLink('/faq')}>{t('nav.faq')}</Link>
              </div>
            </div>

            <Link to="/contact" className="text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors">{t('nav.contact')}</Link>
          </nav>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg className={`h-6 w-6 transition-transform ${mobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileMenuOpen && (
          <nav className="xl:hidden pb-4 border-t border-gray-200">
            <div className="py-2 space-y-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm">
                {t('nav.home')}
              </Link>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">{t('nav.buyAPiano')}</div>
                <Link to="/shop/upright-pianos" onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/shop/upright-pianos')}>{t('nav.uprightPianos')}</Link>
                <Link to="/shop/grand-pianos"   onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/shop/grand-pianos')}>{t('nav.grandPianos')}</Link>
                <Link to="/piano-brands"        onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/piano-brands')}>{t('nav.pianoBrands')}</Link>
              </div>

              <Link to="/sell-my-piano"  onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/sell-my-piano')}>{t('nav.sellMyPiano')}</Link>
              <Link to="/value-my-piano" onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/value-my-piano')}>{t('nav.valueMyPiano')}</Link>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">{t('nav.ourAuctions')}</div>
                <Link to="/auction-catalogue"       onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/auction-catalogue')}>{t('nav.auctionCatalogue')}</Link>
                <Link to="/auction-calendar"        onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/auction-calendar')}>{t('nav.auctionCalendar')}</Link>
                <Link to="/viewing-appointments"    onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/viewing-appointments')}>{t('nav.viewingAppointments')}</Link>
                <Link to="/beginners-auction-guide" onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/beginners-auction-guide')}>{t('nav.beginnersAuctionGuide')}</Link>
                <Link to="/bidding"                 onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/bidding')}>{t('nav.bidding')}</Link>
                <Link to="/delivery"                onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/delivery')}>{t('nav.delivery')}</Link>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`block text-sm font-semibold mb-2 ${pathname === '/about' ? 'text-gray-900' : 'text-gray-800 hover:text-gray-600'}`}>{t('nav.about')}</Link>
                <Link to="/news-insight" onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/news-insight')}>{t('nav.newsInsights')}</Link>
                <Link to="/faq"          onClick={() => setMobileMenuOpen(false)} className={mobileNavLink('/faq')}>{t('nav.faq')}</Link>
              </div>

              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100 font-medium text-sm">{t('nav.contact')}</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
