import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalNavBar from '../components/PortalNavBar'

export default function AuctionPortalLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <PortalNavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
