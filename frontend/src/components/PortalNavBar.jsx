import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FiBell, FiChevronDown, FiLogOut, FiMenu, FiUser, FiX } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import useAuth from '../hooks/useAuth'
import { logout as logoutService } from '../services/authService'
import { useNotifications } from '../contexts/NotificationContext'

const NAV_LINKS = [
  { label: 'Home', to: '/auction-portal' },
  { label: 'Live Auctions', to: '/auction-portal/live' },
]

const AUTH_NAV_LINKS = [
  { label: 'My Bids', to: '/auction-portal/my-bids' },
  { label: 'Bid History', to: '/auction-portal/bid-history' },
]

function NavItem({ label, to, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === '/auction-portal'}
      onClick={onClick}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors duration-150 ${
          isActive ? 'text-amber-400' : 'text-slate-300 hover:text-white'
        }`
      }
    >
      {label}
    </NavLink>
  )
}

export default function PortalNavBar() {
  const { user, logout } = useAuth() || {}
  const navigate = useNavigate()
  const { unreadCount, bellNotifications, markAllRead } = useNotifications() || {}
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const userMenuRef = useRef(null)
  const bellRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
      if (bellRef.current && !bellRef.current.contains(e.target)) setBellOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  async function handleLogout() {
    await logoutService()
    logout()
    setUserMenuOpen(false)
    setMobileOpen(false)
    navigate('/auction-portal/login')
  }

  function handleBellOpen() {
    setBellOpen((o) => !o)
    if (!bellOpen) markAllRead?.()
  }

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/98 backdrop-blur-md">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/auction-portal" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400">
              <MdGavel className="h-4 w-4 text-slate-950" />
            </span>
            <span className="hidden text-base font-bold tracking-tight text-white sm:block">
              Piano<span className="text-amber-400">Auctions</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => <NavItem key={l.to} {...l} />)}
            {user && AUTH_NAV_LINKS.map((l) => <NavItem key={l.to} {...l} />)}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Bell */}
                <div ref={bellRef} className="relative">
                  <button
                    onClick={handleBellOpen}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    aria-label="Notifications"
                  >
                    <FiBell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] font-bold text-slate-950">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {bellOpen && (
                    <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                        <span className="text-sm font-semibold text-white">Notifications</span>
                        <span className="text-xs text-slate-500">{bellNotifications?.length || 0}</span>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {!bellNotifications?.length ? (
                          <p className="px-4 py-8 text-center text-sm text-slate-500">No notifications yet</p>
                        ) : (
                          bellNotifications.map((n) => (
                            <div
                              key={n.id}
                              className={`border-b border-slate-800/60 px-4 py-3 last:border-0 ${!n.read ? 'bg-slate-800/40' : ''}`}
                            >
                              <p className="text-sm leading-snug text-slate-200">{n.message}</p>
                              <p className="mt-1 text-[10px] text-slate-500">
                                {new Date(n.time).toLocaleTimeString()}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User dropdown */}
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 py-1.5 pl-3 pr-2 text-sm font-medium text-slate-200 transition hover:border-amber-400/40 hover:text-white"
                  >
                    <span className="hidden max-w-[90px] truncate sm:block">
                      {user.name?.split(' ')[0]}
                    </span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-300">
                      <FiUser className="h-3.5 w-3.5" />
                    </span>
                    <FiChevronDown className={`h-3.5 w-3.5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
                      <div className="border-b border-slate-800 px-4 py-3">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="truncate text-xs text-slate-400">{user.email}</p>
                      </div>
                      <nav className="py-1">
                        {[
                          { label: 'My Bids', to: '/auction-portal/my-bids' },
                          { label: 'Bid History', to: '/auction-portal/bid-history' },
                          { label: 'Watchlist', to: '/auction-portal/watchlist' },
                          { label: 'My Registrations', to: '/auction-portal/my-auctions' },
                          { label: 'Account', to: '/auction-portal/account' },
                        ].map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            onClick={() => setUserMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </nav>
                      <div className="border-t border-slate-800 py-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-400 transition hover:bg-slate-800"
                        >
                          <FiLogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/auction-portal/login"
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/auction-portal/register"
                  className="rounded-full bg-amber-400 px-4 py-1.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition hover:bg-slate-800 hover:text-white lg:hidden"
            >
              {mobileOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="border-t border-slate-800 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => <NavItem key={l.to} {...l} onClick={closeMobile} />)}
              {user && AUTH_NAV_LINKS.map((l) => <NavItem key={l.to} {...l} onClick={closeMobile} />)}
              {user ? (
                <>
                  <Link to="/auction-portal/watchlist" onClick={closeMobile} className="text-sm text-slate-300 hover:text-white">Watchlist</Link>
                  <Link to="/auction-portal/account" onClick={closeMobile} className="text-sm text-slate-300 hover:text-white">Account</Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-left text-sm text-rose-400">
                    <FiLogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <div className="mt-2 flex gap-3 pt-2">
                  <Link to="/auction-portal/login" onClick={closeMobile} className="flex-1 rounded-full border border-slate-700 py-2 text-center text-sm text-slate-300">Login</Link>
                  <Link to="/auction-portal/register" onClick={closeMobile} className="flex-1 rounded-full bg-amber-400 py-2 text-center text-sm font-bold text-slate-950">Register</Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
