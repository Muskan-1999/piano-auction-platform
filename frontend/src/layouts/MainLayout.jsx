import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <NavBar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  )
}
