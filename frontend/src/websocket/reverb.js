// Lightweight wrapper for Laravel Reverb / Echo if present

export function initReverb(options = {}) {
  if (typeof window !== 'undefined' && window.Echo) {
    return window.Echo
  }

  // no-op fallback
  return null
}

export function subscribe(channel, event, handler) {
  const echo = initReverb()
  if (!echo) return () => {}

  const subscriber = echo.channel(channel).listen(event, handler)
  return () => echo.leaveChannel(channel)
}
