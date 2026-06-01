/**
 * WatchlistButton
 *
 * Reusable heart button for any lot card or detail page.
 * Handles its own state via React Query — no props drilling needed.
 *
 * Usage:
 *   <WatchlistButton lotId={lot.id} />
 *   <WatchlistButton lotId={lot.id} size="lg" />
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import { useWatchlistIds, useToggleWatchlist } from '../../hooks/queries/useWatchlist'

export default function WatchlistButton({ lotId, size = 'md', className = '' }) {
  const { user }   = useAuth() || {}
  const navigate   = useNavigate()

  const { data: watchlistIds = new Set() } = useWatchlistIds(user?.id)
  const { mutate, isPending }              = useToggleWatchlist(user?.id)

  const inWatchlist = watchlistIds.has(lotId)

  const sizeClasses = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  }

  const iconClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }

  function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      navigate('/auction-portal/login')
      return
    }

    mutate(
      { lotId, inWatchlist },
      {
        onSuccess: () => {
          toast(inWatchlist ? 'Removed from watchlist' : 'Added to watchlist', {
            icon: inWatchlist ? '🗑️' : '♥',
            style: { background: '#1e293b', color: '#f1f5f9', border: '1px solid #334155' },
            duration: 2500,
          })
        },
        onError: () => {
          toast.error('Could not update watchlist')
        },
      }
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      title={inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      className={`flex items-center justify-center rounded-full transition-all ${sizeClasses[size]} ${
        inWatchlist
          ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
          : 'bg-slate-800/70 text-slate-300 backdrop-blur-sm hover:bg-red-500/20 hover:text-red-400'
      } disabled:opacity-50 ${className}`}
    >
      <FiHeart
        className={`${iconClasses[size]} ${inWatchlist ? 'fill-current' : ''}`}
      />
    </button>
  )
}
