import React from 'react'
import { downloadUkGuide, downloadEuGuide } from '../../services/guideService'

function DownloadIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.5v8M5 7l3 3.5L11 7M2.5 13h11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DownloadButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 border border-black bg-white text-black text-sm tracking-wide px-8 py-3 hover:bg-black hover:text-white transition-colors duration-200 w-full sm:w-auto"
    >
      <DownloadIcon />
      {label}
    </button>
  )
}

export default function GuideDownloads() {
  return (
    <section className="bg-white py-12 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <hr className="border-gray-200 mb-12" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <DownloadButton
            label="Download Beginners Guide (UK)"
            onClick={downloadUkGuide}
          />
          <DownloadButton
            label="Download Beginners Guide (EU)"
            onClick={downloadEuGuide}
          />
        </div>
      </div>
    </section>
  )
}
