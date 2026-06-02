import React, { useState } from 'react'
import { FiZoomIn, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

function GalleryPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-3 select-none">
      <div className="text-center px-6">
        <div className="text-4xl mb-2">🎹</div>
        <div className="text-sm font-bold text-gray-500 leading-tight tracking-wide">
          Piano Auctions Ltd
        </div>
        <div className="text-xs text-gray-400 leading-tight mt-0.5">
          Specialist Piano &amp; Keyboard Auctioneers
        </div>
      </div>
      <p className="text-xs text-gray-400 italic">Awaiting Images...</p>
    </div>
  )
}

export default function PianoImageGallery({ image, images = [], name }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [lbIdx, setLbIdx] = useState(0)

  const hasImage = Boolean(image)
  const galleryImages = images.length > 0 ? images : image ? [image] : []
  const showThumbs = galleryImages.length > 1
  const currentImg = galleryImages[activeIdx] ?? image

  const openLightbox = (i) => { setLbIdx(i); setLightbox(true) }
  const closeLightbox = () => setLightbox(false)
  const prevLb = () => setLbIdx((p) => (p - 1 + galleryImages.length) % galleryImages.length)
  const nextLb = () => setLbIdx((p) => (p + 1) % galleryImages.length)

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* ── Main image / placeholder ── */}
        <div className="relative overflow-hidden bg-gray-100 aspect-[4/3] w-full">
          {hasImage ? (
            <>
              <img
                src={currentImg}
                alt={name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => openLightbox(activeIdx)}
                aria-label="Zoom image"
                className="absolute top-3 right-3 bg-white/85 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              >
                <FiZoomIn size={16} className="text-gray-700" />
              </button>
            </>
          ) : (
            <GalleryPlaceholder />
          )}
        </div>

        {/* ── Thumbnail strip (hidden when 0 or 1 images) ── */}
        {showThumbs && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`flex-shrink-0 w-20 h-16 overflow-hidden border-2 transition-all duration-150 ${
                  i === activeIdx
                    ? 'border-gray-900'
                    : 'border-gray-200 hover:border-gray-500'
                }`}
              >
                <img
                  src={img}
                  alt={`${name} view ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && hasImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <FiX size={28} />
          </button>

          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevLb() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                aria-label="Previous image"
              >
                <FiChevronLeft size={40} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextLb() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                aria-label="Next image"
              >
                <FiChevronRight size={40} />
              </button>
            </>
          )}

          <img
            src={galleryImages[lbIdx]}
            alt={name}
            className="max-h-[88vh] max-w-[88vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-5 text-white/50 text-sm">
            {lbIdx + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </>
  )
}
