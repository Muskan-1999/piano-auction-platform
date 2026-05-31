import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import NewHomePage from '../pages/NewHomePage'
import Home from '../pages/Home'
import Auctions from '../pages/Auctions'
import AuctionDetail from '../pages/AuctionDetail'
import LotDetail from '../pages/LotDetail'
import LiveAuction from '../pages/LiveAuction'
import Login from '../pages/Login'
import Register from '../pages/Register'
import TelephoneBid from '../pages/TelephoneBid'
import AbsenteeBid from '../pages/AbsenteeBid'
import ContactPage from '../pages/ContactPage'
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
      {/* Homepage — pixel-perfect pianoauctions.co.uk recreation */}
      <Route path="/" element={<MainLayout><NewHomePage /></MainLayout>} />

      {/* Buying A Piano — the original page preserved exactly */}
      <Route path="/buying-a-piano" element={<MainLayout><Home /></MainLayout>} />

      {/* Public site routes */}
      <Route path="/auctions" element={<MainLayout><Auctions /></MainLayout>} />
      <Route path="/auctions/:slug" element={<MainLayout><AuctionDetail /></MainLayout>} />
      <Route path="/lots/:slug" element={<MainLayout><LotDetail /></MainLayout>} />
      <Route path="/live-auction/:id" element={<MainLayout><LiveAuction /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/telephone-bid" element={<MainLayout><TelephoneBid /></MainLayout>} />
      <Route path="/absentee-bid" element={<MainLayout><AbsenteeBid /></MainLayout>} />
      <Route path="/bidding" element={<MainLayout><BiddingPage /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />
      <Route path="/contact-us" element={<MainLayout><ContactPage /></MainLayout>} />
      <Route
        path="/profile"
        element={<MainLayout><ProtectedRoute><Profile /></ProtectedRoute></MainLayout>}
      />

      {/* Auction Portal — separate layout, no public header/footer */}
      <Route path="/auction-portal" element={<AuctionPortalLayout />}>
        <Route index element={<PortalHome />} />
        <Route path="live" element={<PortalLive />} />
        <Route path="upcoming" element={<PortalUpcoming />} />
        <Route path="catalogue" element={<PortalCatalogue />} />
        <Route path="auctions/:slug" element={<PortalAuctionDetail />} />
        <Route
          path="register-to-bid/:slug"
          element={<ProtectedRoute redirectTo="/auction-portal/login"><RegisterToBid /></ProtectedRoute>}
        />
        <Route
          path="my-auctions"
          element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalMyAuctions /></ProtectedRoute>}
        />
        <Route
          path="bid-history"
          element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalBidHistory /></ProtectedRoute>}
        />
        <Route
          path="my-bids"
          element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalMyBids /></ProtectedRoute>}
        />
        <Route
          path="watchlist"
          element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalWatchlist /></ProtectedRoute>}
        />
        <Route
          path="account"
          element={<ProtectedRoute redirectTo="/auction-portal/login"><PortalAccount /></ProtectedRoute>}
        />
        <Route path="login" element={<PortalLogin />} />
        <Route path="register" element={<PortalRegister />} />
        <Route path="verify" element={<PortalVerificationPending />} />
      </Route>

      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  )
}
