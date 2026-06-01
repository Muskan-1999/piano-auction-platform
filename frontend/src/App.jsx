import React from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import queryClient from './lib/queryClient'
import './App.css'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full min-h-screen bg-black text-white">
        <AuthProvider>
          <NotificationProvider>
            <AppRoutes />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
                style: {
                  background: '#1e293b',
                  color: '#f1f5f9',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  fontSize: '14px',
                },
              }}
            />
          </NotificationProvider>
        </AuthProvider>
      </div>
    </QueryClientProvider>
  )
}
