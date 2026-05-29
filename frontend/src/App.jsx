import React from 'react'
import AppRoutes from './routes'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  )
}
