import React, { useEffect, useRef, useState } from 'react'
import { FiAlertCircle, FiCheck, FiMinus, FiPlus, FiZap } from 'react-icons/fi'
import { MdGavel } from 'react-icons/md'
import api from '../../api/axios'
import useAuth from '../../hooks/useAuth'
import { getEcho } from '../../lib/echo'
import { useNotifications } from '../../contexts/NotificationContext'

function fmt(amount) {
  return '£' + Number(amount || 0).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export default function LiveBidPanel({ lot: initialLot, onClose }) {
  const { user } = useAuth() || {}
  const { addNotification } = useNotifications() || {}
  const [lot, setLot] = useState(initialLot)
  const [bidAmount, setBidAmount] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [bidFeed, setBidFeed] = useState([])
  const [bidderCount, setBidderCount] = useState(1)
  const feedRef = useRef(null)

  const nextBid = (lot.current_bid || lot.starting_bid || 0) + (lot.bid_increment || 50)

  useEffect(() => {
    setBidAmount(nextBid)
  }, [lot.current_bid, lot.bid_increment, lot.starting_bid])

  useEffect(() => {
    const echo = getEcho()
    const channel = echo.channel(`lots.${lot.id}`)

    channel.listen('.bid.placed', (data) => {
      const bid = data.bid
      setLot((prev) => ({ ...prev, current_bid: bid.amount }))
      setBidFeed((prev) => [
        {
          id: bid.id,
          amount: bid.amount,
          time: new Date().toLocaleTimeString(),
          isOwn: bid.user_id === user?.id,
        },
        ...prev.slice(0, 19),
      ])

      if (bid.user_id === user?.id) {
        setSuccess('You are the highest bidder!')
        setError('')
        addNotification?.({
          type: 'winning',
          message: `You are the highest bidder on Lot ${lot.lot_number} — ${fmt(bid.amount)}`,
        })
      }
    })

    channel.listen('.bid.outbid', (data) => {
      const bid = data.bid
      if (bid.user_id === user?.id) {
        setSuccess('')
        setError(`You have been outbid on Lot ${lot.lot_number}!`)
        addNotification?.({
          type: 'outbid',
          message: `You have been outbid on Lot ${lot.lot_number}. Bid higher to stay in the lead.`,
        })
      }
    })

    return () => {
      channel.stopListening('.bid.placed')
      channel.stopListening('.bid.outbid')
    }
  }, [lot.id, lot.lot_number, user?.id])

  function increment() {
    setBidAmount((prev) => prev + (lot.bid_increment || 50))
  }

  function decrement() {
    setBidAmount((prev) => Math.max(nextBid, prev - (lot.bid_increment || 50)))
  }

  async function handleBid() {
    setError('')
    setSuccess('')
    setSubmitting(true)

    try {
      await api.post(`/lots/${lot.id}/bid`, {
        amount: bidAmount,
        bid_type: 'online',
      })
      setSuccess(`Bid of ${fmt(bidAmount)} placed successfully!`)
      setBidAmount((prev) => prev + (lot.bid_increment || 50))
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to place bid. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const reserveMet = !lot.reserve_price || (lot.current_bid || 0) >= lot.reserve_price

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-amber-400/20 bg-slate-900 shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400">
            Lot {lot.lot_number}
          </p>
          <h3 className="mt-0.5 text-base font-bold text-white">{lot.title}</h3>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5 p-5">
        {/* Current bid display */}
        <div className="rounded-xl bg-slate-950 px-5 py-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-slate-500">Current Bid</p>
              <p className="mt-1 font-mono text-3xl font-bold text-amber-400">
                {fmt(lot.current_bid || lot.starting_bid)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-slate-500">Increment</p>
              <p className="mt-1 font-mono text-lg font-semibold text-slate-300">
                {fmt(lot.bid_increment)}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {reserveMet ? (
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                <FiCheck className="h-3 w-3" /> Reserve Met
              </span>
            ) : (
              <span className="text-[10px] uppercase tracking-widest text-slate-500">
                Reserve Not Met
              </span>
            )}
          </div>
        </div>

        {/* Bid amount selector */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
            Your Bid Amount
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={decrement}
              disabled={bidAmount <= nextBid}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FiMinus className="h-4 w-4" />
            </button>
            <div className="flex-1 rounded-xl border border-amber-400/30 bg-slate-950 px-4 py-2.5 text-center font-mono text-xl font-bold text-amber-400">
              {fmt(bidAmount)}
            </div>
            <button
              onClick={increment}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-500">
            Minimum next bid: {fmt(nextBid)}
          </p>
        </div>

        {/* Status messages */}
        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-800/50 bg-red-950/50 px-4 py-3 text-sm text-red-300">
            <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-start gap-2 rounded-xl border border-emerald-800/50 bg-emerald-950/50 px-4 py-3 text-sm text-emerald-300">
            <FiCheck className="mt-0.5 h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        {/* Place bid button */}
        <button
          onClick={handleBid}
          disabled={submitting || !lot.canAcceptBids}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
              Placing Bid...
            </>
          ) : (
            <>
              <MdGavel className="h-5 w-5" />
              Bid {fmt(bidAmount)}
            </>
          )}
        </button>

        {/* Live bid feed */}
        {bidFeed.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-500">
              Recent Bids
            </p>
            <div ref={feedRef} className="max-h-40 space-y-1.5 overflow-y-auto">
              {bidFeed.map((b, i) => (
                <div
                  key={b.id || i}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                    b.isOwn
                      ? 'bg-amber-400/10 text-amber-300'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  <span>{b.isOwn ? 'You' : 'Bidder'}</span>
                  <span className="font-mono font-semibold">{fmt(b.amount)}</span>
                  <span className="text-slate-500">{b.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
