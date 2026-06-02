import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import NewHomePage from '../pages/NewHomePage'
import BuyingPianoPage from '../pages/BuyingPianoPage'
import SellMyPianoPage from '../pages/SellMyPianoPage'
import ValueMyPianoPage from '../pages/ValueMyPianoPage'
import AboutPage from '../pages/AboutPage'
import NewsInsightPage from '../pages/NewsInsightPage'
import FaqPage from '../pages/FaqPage'
import GrandPianosPage from '../pages/GrandPianosPage'
import UprightPianosPage from '../pages/UprightPianosPage'
import PianoDetailPage from '../pages/PianoDetailPage'
import AuctionCataloguePage from '../pages/AuctionCataloguePage'
import AuctionCalendarPage from '../pages/AuctionCalendarPage'
import BeginnersAuctionGuidePage from '../pages/BeginnersAuctionGuidePage'
import PastAuctionsPage from '../pages/PastAuctionsPage'
import PastAuctionDetailPage from '../pages/PastAuctionDetailPage'
import { grandPianos } from '../data/grandPianos'
import { uprightPianos } from '../data/uprightPianos'
import Auctions from '../pages/Auctions'
import AuctionDetail from '../pages/AuctionDetail'
import LotDetail from '../pages/LotDetail'
import LiveAuction from '../pages/LiveAuction'
import Login from '../pages/Login'
import Register from '../pages/Register'
import TelephoneBid from '../pages/TelephoneBid'
import AbsenteeBid from '../pages/AbsenteeBid'
import ContactPage from '../pages/ContactPage'
import DeliveryPage from '../pages/DeliveryPage'
import ViewingAppointmentsPage from '../pages/ViewingAppointmentsPage'
import BiddingPage from '../pages/BiddingPage'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'
import AuctionPortalLayout from '../layouts/AuctionPortalLayout'

// Portal pages
import PortalHome from '../pages/auction-portal/PortalHome'
import PortalLive from '../pages/auction-portal/PortalLive'
import PortalUpcoming from '../pages/auction-portal/PortalUpcoming'
import PortalCatalogue from '../pages/auction-portal/PortalCatalogue'
import PortalMyAuctions from '../pages/auction-portal/PortalMyAuctions'
import PortalAuctionDetail from '../pages/auction-portal/PortalAuctionDetail'
import RegisterToBid from '../pages/auction-portal/RegisterToBid'
import PortalBidHistory from '../pages/auction-portal/PortalBidHistory'
import PortalMyBids from '../pages/auction-portal/PortalMyBids'
import PortalWatchlist from '../pages/auction-portal/PortalWatchlist'
import PortalAccount from '../pages/auction-portal/PortalAccount'
import PortalLogin from '../pages/auction-portal/PortalLogin'
import PortalRegister from '../pages/auction-portal/PortalRegister'
import PortalVerificationPending from '../pages/auction-portal/PortalVerificationPending'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<MainLayout><NewHomePage /></MainLayout>} />

      {/* Buy A Piano */}
      <Route path="/buying-piano" element={<MainLayout><BuyingPianoPage /></MainLayout>} />

      {/* Sell / Value */}
      <Route path="/sell-my-piano" element={<MainLayout><SellMyPianoPage /></MainLayout>} />
      <Route path="/value-my-piano" element={<MainLayout><ValueMyPianoPage /></MainLayout>} />

      {/* ── Shop — Grand Pianos ── */}
      <Route path="/shop/grand-pianos" element={<MainLayout><GrandPianosPage /></MainLayout>} />
      <Route
        path="/shop/grand-pianos/:slug"
        element={
          <MainLayout>
            <PianoDetailPage
              pianos={grandPianos}
              type="Grand Piano"
              backLink="/shop/grand-pianos"
            />
          </MainLayout>
        }
      />

      {/* ── Shop — Upright Pianos ── */}
      <Route path="/shop/upright-pianos" element={<MainLayout><UprightPianosPage /></MainLayout>} />
      <Route
        path="/shop/upright-pianos/:slug"
        element={
          <MainLayout>
            <PianoDetailPage
              pianos={uprightPianos}
              type="Upright Piano"
              backLink="/shop/upright-pianos"
            />
          </MainLayout>
        }
      />

      {/* Auction Catalogue */}
      <Route path="/auction-catalogue" element={<MainLayout><AuctionCataloguePage /></MainLayout>} />

      {/* Auction Calendar */}
      <Route path="/auction-calendar" element={<MainLayout><AuctionCalendarPage /></MainLayout>} />

      {/* Past Auctions */}
      <Route path="/past-auctions" element={<MainLayout><PastAuctionsPage /></MainLayout>} />
      <Route path="/past-auctions/:slug" element={<MainLayout><PastAuctionDetailPage /></MainLayout>} />

      {/* Beginners Auction Guide */}
      <Route path="/beginners-auction-guide" element={<MainLayout><BeginnersAuctionGuidePage /></MainLayout>} />

      {/* About / News / FAQ */}
      <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
      <Route path="/news-insight" element={<MainLayout><NewsInsightPage /></MainLayout>} />
      <Route path="/faq" element={<MainLayout><FaqPage /></MainLayout>} />

      {/* Public auction routes */}
      <Route path="/auctions" element={<MainLayout><Auctions /></MainLayout>} />
      <Route path="/auctions/:slug" element={<MainLayout><AuctionDetail /></MainLayout>} />
      <Route path="/lots/:slug" element={<MainLayout><LotDetail /></MainLayout>} />
      <Route path="/live-auction/:id" element={<MainLayout><LiveAuction /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/telephone-bid" element={<MainLayout><TelephoneBid /></MainLayout>} />
      <Route path="/absentee-bid" element={<MainLayout><AbsenteeBid /></MainLayout>} />
      <Route path="/bidding" element={<MainLayout><BiddingPage /></MainLayout>} />
      <Route path="/delivery" element={<MainLayout><DeliveryPage /></MainLayout>} />
      <Route path="/viewing-appointments" element={<MainLayout><ViewingAppointmentsPage /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
      <Route path="/contact-us" element={<MainLayout><ContactPage /></MainLayout>} />
      <Route
        path="/profile"
        element={<MainLayout><ProtectedRoute><Profile /></ProtectedRoute></MainLayout>}
      />

      {/* Auction Portal */}
      <Route path="/auction-portal" element={<AuctionPortalLayout />}>
        <Route index element={<PortalHome />} />
        <Route path="live" element={<PortalLive />} />
        <Route path="upcoming" element={<PortalUpcoming />} />
        <Route path="catalogue" element={<PortalCatalogue />} />
        <Route path="auctions/:slug" element={<PortalAuctionDetail />} />
        <Route path="register-to-bid/:slug" element={<ProtectedRoute redirectTo="/auction-portal/login"><RegisterToBid /></ProtectedRoute>} />
        <Route path="my-auctions" element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalMyAuctions /></ProtectedRoute>} />
        <Route path="bid-history" element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalBidHistory /></ProtectedRoute>} />
        <Route path="my-bids" element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalMyBids /></ProtectedRoute>} />
        <Route path="watchlist" element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalWatchlist /></ProtectedRoute>} />
        <Route path="account" element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalAccount /></ProtectedRoute>} />
        <Route path="login" element={<PortalLogin />} />
        <Route path="register" element={<PortalRegister />} />
        <Route path="verify" element={<PortalVerificationPending />} />
      </Route>

      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  )
}
