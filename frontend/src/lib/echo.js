/**
 * Echo singleton factory.
 *
 * Why a factory instead of a module-level instance?
 * The Sanctum Bearer token is only available after login. If we create Echo
 * once at import time the private-channel auth header will be empty for every
 * session that doesn't have a pre-existing token.  Calling `resetEcho()` after
 * login/logout tears down the old instance and the next `getEcho()` call builds
 * a fresh one with the current token.
 */

import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

window.Pusher = Pusher

let echoInstance = null

function buildEcho() {
  const token   = localStorage.getItem('authToken')
  const apiBase = import.meta.env.VITE_API_URL  || 'http://localhost:8000/api'
  const wsHost  = import.meta.env.VITE_REVERB_HOST   || 'localhost'
  const wsPort  = Number(import.meta.env.VITE_REVERB_PORT  || 8080)
  const scheme  = import.meta.env.VITE_REVERB_SCHEME || 'http'
  const forceTLS = scheme === 'https'

  return new Echo({
    broadcaster:       'reverb',
    key:               import.meta.env.VITE_REVERB_APP_KEY || '',
    wsHost,
    wsPort,
    wssPort:           wsPort,
    forceTLS,
    enabledTransports: ['ws', 'wss'],
    // Private-channel authentication endpoint — secured by Sanctum
    authEndpoint:      `${apiBase}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        Accept:        'application/json',
      },
    },
  })
}

/** Returns the shared Echo instance, creating it if needed. */
export function getEcho() {
  if (!echoInstance) {
    echoInstance = buildEcho()
  }
  return echoInstance
}

/**
 * Disconnect the current instance and clear it so the next `getEcho()` call
 * creates a new one with the latest token.  Call this immediately after
 * login and after logout.
 */
export function resetEcho() {
  if (echoInstance) {
    try { echoInstance.disconnect() } catch (_) { /* ignore */ }
    echoInstance = null
  }
}

export default getEcho
