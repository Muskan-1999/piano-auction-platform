import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <NavBar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  )
}
