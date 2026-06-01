import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { user, loading } = useAuth() || {}

  if (loading) return <div>Loading...</div>
  if (!user) return <Navigate to={redirectTo} replace />

  return children
}
