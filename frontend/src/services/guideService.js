const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function triggerDownload(type) {
  const url = `${BASE_URL}/guides/download/${type}`
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', '')
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function downloadUkGuide() {
  triggerDownload('uk')
}

export function downloadEuGuide() {
  triggerDownload('eu')
}
