import React from 'react'

export default function InputField({ label, name, type = 'text', value, onChange, required, placeholder, className = '' }) {
  return (
    <label className={`block text-sm text-slate-700 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <span>{label}</span>
        {required && <span className="text-rose-500">*</span>}
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 px-3 py-2 bg-white text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
      />
    </label>
  )
}
