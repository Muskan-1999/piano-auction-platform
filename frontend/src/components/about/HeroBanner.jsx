import React from 'react'
import { Link } from 'react-router-dom'

export default function HeroBanner({ image, breadcrumb, label, title }) {
  return (
    <section
      className="relative flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${image})`,
        minHeight: '500px',
      }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 py-16"
        style={{ minHeight: '500px' }}>
        {label && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/60 mb-3">
            {label}
          </p>
        )}
        <h1
          className="text-white leading-tight mb-4"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 400,
          }}
        >
          {title}
        </h1>
        {breadcrumb && (
          <nav className="text-xs text-white/60 flex items-center justify-center gap-1 mt-2">
            {breadcrumb.map((crumb, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="mx-1">&rsaquo;</span>}
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}
