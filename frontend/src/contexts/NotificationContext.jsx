import React, { createContext, useCallback, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [bellNotifications, setBellNotifications] = useState([])

  const addNotification = useCallback((notification) => {
    const entry = {
      ...notification,
      id: Date.now() + Math.random(),
      read: false,
      time: new Date(),
    }

    setBellNotifications((prev) => [entry, ...prev.slice(0, 19)])

    if (notification.type === 'outbid') {
      toast.error(notification.message, {
        duration: 6000,
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #dc2626' },
        icon: '⚠️',
      })
    } else if (notification.type === 'winning') {
      toast.success(notification.message, {
        duration: 6000,
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #16a34a' },
        icon: '🏆',
      })
    } else if (notification.type === 'sold') {
      toast(notification.message, {
        duration: 5000,
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #b45309' },
        icon: '🔨',
      })
    } else if (notification.type === 'live') {
      toast(notification.message, {
        duration: 8000,
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #f59e0b' },
        icon: '🔴',
      })
    } else {
      toast(notification.message, {
        duration: 4000,
        style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #475569' },
      })
    }
  }, [])

  const markAllRead = useCallback(() => {
    setBellNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const clearAll = useCallback(() => {
    setBellNotifications([])
  }, [])

  const unreadCount = bellNotifications.filter((n) => !n.read).length

  return (
    <NotificationContext.Provider
      value={{ bellNotifications, addNotification, markAllRead, clearAll, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  return useContext(NotificationContext)
}
