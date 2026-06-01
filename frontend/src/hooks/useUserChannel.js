/**
 * useUserChannel
 *
 * Subscribes to the private `user.{userId}` channel.
 * This channel carries personal notifications:
 *   - registration.approved
 *   - registration.rejected
 *
 * The channel requires the user to be authenticated. Echo will call the
 * `/api/broadcasting/auth` endpoint with the Bearer token to get the
 * signed channel name.
 *
 * Usage:
 *   useUserChannel(userId, {
 *     onRegistrationApproved: (data) => ...,
 *     onRegistrationRejected: (data) => ...,
 *   })
 */

import { useEffect, useRef } from 'react'
import { getEcho } from '../lib/echo'

export default function useUserChannel(userId, {
  onRegistrationApproved,
  onRegistrationRejected,
} = {}) {
  const approvedRef = useRef(onRegistrationApproved)
  const rejectedRef = useRef(onRegistrationRejected)

  useEffect(() => { approvedRef.current = onRegistrationApproved }, [onRegistrationApproved])
  useEffect(() => { rejectedRef.current = onRegistrationRejected }, [onRegistrationRejected])

  useEffect(() => {
    if (!userId) return

    const echo    = getEcho()
    const channel = echo.private(`user.${userId}`)

    channel.listen('.registration.approved', (data) => {
      approvedRef.current?.(data.registration)
    })

    channel.listen('.registration.rejected', (data) => {
      rejectedRef.current?.(data.registration)
    })

    return () => {
      channel.stopListening('.registration.approved')
      channel.stopListening('.registration.rejected')
      echo.leave(`user.${userId}`)
    }
  }, [userId])
}
