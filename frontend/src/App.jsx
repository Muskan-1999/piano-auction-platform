import React from 'react'
import AppRoutes from './routes'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

export default function App() {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  )
}
