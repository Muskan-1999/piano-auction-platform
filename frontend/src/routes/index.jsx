import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Auctions from '../pages/Auctions'
import AuctionDetail from '../pages/AuctionDetail'
import LotDetail from '../pages/LotDetail'
import LiveAuction from '../pages/LiveAuction'
import Login from '../pages/Login'
import Register from '../pages/Register'
import TelephoneBid from '../pages/TelephoneBid'
import AbsenteeBid from '../pages/AbsenteeBid'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/auctions" element={<MainLayout><Auctions /></MainLayout>} />
      <Route path="/auctions/:slug" element={<MainLayout><AuctionDetail /></MainLayout>} />
      <Route path="/lots/:slug" element={<MainLayout><LotDetail /></MainLayout>} />
      <Route path="/live-auction/:id" element={<MainLayout><LiveAuction /></MainLayout>} />
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
      <Route path="/telephone-bid" element={<MainLayout><TelephoneBid /></MainLayout>} />
      <Route path="/absentee-bid" element={<MainLayout><AbsenteeBid /></MainLayout>} />
      <Route path="/profile" element={<MainLayout><ProtectedRoute><Profile /></ProtectedRoute></MainLayout>} />
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  )
}
