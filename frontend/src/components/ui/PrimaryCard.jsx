import { Link } from 'react-router-dom'
import React from 'react'

export default function PrimaryCard({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 text-left transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-950 transition group-hover:text-slate-900">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  )
}
